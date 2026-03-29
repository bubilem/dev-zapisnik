class PDU {
  #payload;

  constructor(payload) {
    if (new.target === PDU) {
      throw new Error("Abstraktní třídu PDU nelze přímo instanciovat.");
    }
    this.#payload = payload;
  }

  get payload() {
    return this.#payload;
  }

  set payload(val) {
    this.#payload = val;
  }

  isValid() {
    throw new Error("Abstraktní metodu isValid() je nutné implementovat v potomkovi.");
  }
}

class EthFrame extends PDU {
  #dmac;
  #smac;
  #type;
  #fcs;

  constructor(dmac, smac, type, payload, fcs = null) {
    super(payload);
    if (!EthFrame.isValidMac(dmac))
      throw new Error(`Neplatný formát cílové MAC adresy: ${dmac}`);
    if (!EthFrame.isValidMac(smac))
      throw new Error(`Neplatný formát zdrojové MAC adresy: ${smac}`);

    this.#dmac = dmac;
    this.#smac = smac;
    this.#type = type;

    if (fcs !== null) {
      // Umožňuje simulovat poškozený rámec (ručním vložením vlastního FCS)
      this.#fcs = fcs;
    } else {
      this.#fcs = this.calculateFcs();
    }
  }

  // --- Gettery ---
  get dmac() {
    return this.#dmac;
  }
  get smac() {
    return this.#smac;
  }
  get type() {
    return this.#type;
  }
  get payload() {
    return super.payload;
  }
  get fcs() {
    return this.#fcs;
  }

  // --- Settery (automaticky přepočítávají FCS po změně obsahu) ---
  set dmac(val) {
    if (!EthFrame.isValidMac(val))
      throw new Error(`Neplatný formát MAC adresy: ${val}`);
    this.#dmac = val;
    this.#recalculateFcs();
  }
  set smac(val) {
    if (!EthFrame.isValidMac(val))
      throw new Error(`Neplatný formát MAC adresy: ${val}`);
    this.#smac = val;
    this.#recalculateFcs();
  }
  set type(val) {
    this.#type = val;
    this.#recalculateFcs();
  }
  set payload(val) {
    super.payload = val;
    this.#recalculateFcs();
  }

  /**
   * Ověří, zda má MAC adresa správný formát (např. fa:31:45:65:c6:a9).
   */
  static isValidMac(mac) {
    const macRegex = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/;
    return macRegex.test(mac);
  }

  /**
   * Spočítá kontrolní součet. Pro účely ukázky: jednoduchý hash ze spojeného stringu prvků.
   */
  calculateFcs() {
    const dataStr = `${this.#dmac}${this.#smac}${this.#type}${this.payload}`;
    let hash = 0;
    for (let i = 0; i < dataStr.length; i++) {
      hash = (hash << 5) - hash + dataStr.charCodeAt(i);
      hash |= 0; // Převedení na 32bit integer
    }
    return hash;
  }

  /**
   * Privátní pomocná metoda na uložení přesně platného FCS po změně hodnot zvenku.
   */
  #recalculateFcs() {
    this.#fcs = this.calculateFcs();
  }

  /**
   * Vrátí true, pokud vypočítaný hash odpovídá uloženému #fcs
   */
  isValid() {
    return this.calculateFcs() === this.#fcs;
  }

  /**
   * Textová reprezentace rámce.
   */
  toString() {
    return `[EthFrame] SRC: ${this.#smac} -> DST: ${this.#dmac} | TYPE: 0x${this.#type.toString(16).padStart(4, '0').toUpperCase()} | FCS: ${this.#fcs} | DATA: "${this.payload}"`;
  }

  /**
   * Pomocná metoda pro simulaci poškození dat během přenosu pro otestování validace.
   */
  corruptData() {
    super.payload = "CORRUPTED_DATA";
    // Změníme data napřímo bez volání setteru (nebo nezavoláme přepočet), abychom rozbili shodu s fcs.
    this.#fcs = 123456789;
  }
}

// === Ukázka použití ===
try {
  console.log("--- Vytváření platného rámce ---");
  const frame1 = new EthFrame("fa:31:45:65:c6:a9", "00:1a:2b:3c:4d:5e", 0x0800, "Hello World!");
  console.log(frame1.toString());
  console.log(`Původní FCS: ${frame1.fcs}`);
  console.log(`Je rámec validní? ${frame1.isValid()}`);

  console.log("\n--- Změna payloadu přes setter ---");
  frame1.payload = "New secure data";
  console.log(frame1.toString());
  console.log(`Nové FCS po změně payloadu: ${frame1.fcs}`);
  console.log(`Je rámec validní po legitimní změně? ${frame1.isValid()}`);

  console.log("\n--- Simulace poškození přenosu ---");
  frame1.corruptData();
  console.log(frame1.toString());
  console.log(`Je poškozený rámec validní? ${frame1.isValid()}`);

  console.log("\n--- Pokus o vytvoření rámce s chybou ---");
  const badFrame = new EthFrame("invalid-mac-address", "00:1a:2b:3c:4d:5e", 0x0800, "Test data");

} catch (error) {
  console.error(`\nZachycena chyba: ${error.message}`);
}
