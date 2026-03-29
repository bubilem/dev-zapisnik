# Základy objektového programování (OOP)

Objektově orientované programování (OOP) je způsob psaní kódu, kde místo klasické sekvence příkazů pracujeme s **objekty** — samostatnými "součástkami", které v sobě spojují data a chování. Každý objekt je zodpovědný sám za sebe a s ostatními komunikuje prostřednictvím jasně definovaného rozhraní.

---

## Třída — šablona pro objekty

**Třída** (*class*) je plán nebo šablona, ze které se pak tvoří konkrétní objekty. Třída sama o sobě nic nevytváří — jen definuje strukturu: jaká data bude objekt uchovávat a jaké operace nad nimi umí provádět.

Třída obsahuje:
- **Atributy** — data, která objekt uchovává (MAC adresy, payload, FCS…)
- **Metody** — funkce, které objekt umí vykonávat (`isValid()`, `calculateFcs()`)
- **Konstruktor** — speciální metoda, která se automaticky spustí při vytvoření nového objektu

```php
class EthFrame extends PDU
{
    private string $dmac;   // atribut — cílová MAC adresa
    private string $smac;   // atribut — zdrojová MAC adresa
    private int    $type;
    private ?int   $fcs;

    // Konstruktor — spustí se automaticky při new EthFrame(...)
    public function __construct(string $dmac, string $smac, int $type, string $payload)
    {
        parent::__construct($payload);  // zavolá konstruktor rodiče (PDU)
        $this->dmac = $dmac;
        $this->smac = $smac;
        $this->type = $type;
        $this->fcs  = $this->calculateFcs();
    }
}
```

---

## Objekt — instance třídy

**Objekt** (neboli *instance*) je konkrétní výtisk třídy, který vznikne zápisem `new NázevTřídy(...)`. Každý objekt má vlastní sadu dat — dvě instance stejné třídy tak mohou mít různé hodnoty atributů.

```javascript
// Vytvoření dvou různých objektů ze stejné třídy EthFrame
const frame1 = new EthFrame("fa:31:45:65:c6:a9", "00:1a:2b:3c:4d:5e", 0x0800, "Hello World!");
const frame2 = new EthFrame("aa:bb:cc:dd:ee:ff", "11:22:33:44:55:66", 0x0806, "ARP request");

console.log(frame1.toString());  // data frame1
console.log(frame2.toString());  // odlišná data frame2
```

---

## Viditelnost — public, private, protected

Každý atribut nebo metoda má **modifikátor viditelnosti**, který určuje, odkud je přístupný. Jde o klíčový nástroj pro ochranu vnitřního stavu objektu.

| Modifikátor   | Dostupný                                                  |
|---------------|-----------------------------------------------------------|
| `public`      | Odkudkoliv — zvenčí, z potomka i ze samotné třídy         |
| `private`     | Pouze uvnitř třídy; potomci k němu **nemají** přístup     |
| `protected`   | Uvnitř třídy **a u jejích potomků**, ale ne zvenčí        |

V naší třídě `EthFrame` jsou MAC adresy a FCS privátní — nikdo zvenčí je nemůže změnit přímo:

```php
private string $dmac;   // přístup jen zevnitř EthFrame
private ?int   $fcs;    // nikdo zvenku nemůže "rozbít" kontrolní součet!
protected string $payload;  // přístup i z dědících tříd (EthFrame může číst payload z PDU)
```

> **Proč na tom záleží?** Kdybychom nechali `$fcs` veřejné, mohl by kdokoliv napsat `$frame->fcs = 0` a rozbít validaci, aniž by třída o změně věděla. Privátní atributy chrání vnitřní konzistenci objektu.

---

## Gettery a Settery

Protože privátní atributy nejsou přístupné zvenčí, používáme **gettery** (čtení) a **settery** (zápis). Setter může data validovat nebo spustit vedlejší akce — třeba automaticky přepočítat FCS po každé změně dat.

```php
// Getter — pouze vrátí hodnotu
public function getDmac(): string
{
    return $this->dmac;
}

// Setter — validuje vstup a po změně přepočítá kontrolní součet
public function setDmac(string $dmac): void
{
    if (!self::isValidMac($dmac)) {
        throw new InvalidArgumentException("Neplatná MAC adresa: $dmac");
    }
    $this->dmac = $dmac;
    $this->recalculateFcs();   // vedlejší akce — nikdo zvenku o ní nemusí vědět
}
```

V JavaScriptu a Pythonu se gettery/settery zapisují syntakticky jako atributy — přímý přístup `frame.payload = "data"` na pozadí zavolá setter:

```javascript
// JavaScript — klíčová slova get / set
set payload(val) {
    super.payload = val;
    this.#recalculateFcs();  // automaticky po každé změně
}
```

---

## Dědičnost

**Dědičnost** umožňuje vytvořit novou třídu, která přebírá vše od existující třídy a přidává nebo upravuje jen to, co ji odlišuje. Díky tomu nemusíme psát stejný kód opakovaně.

```
PDU          ← rodič / bázová třída (obecná síťová jednotka s payloadem)
 └── EthFrame  ← potomek (přidává MAC adresy, typ rámce a FCS)
```

Rodičovská třída `PDU` se stará o obecné uložení dat (`payload`). `EthFrame` z ní dědí a přidává vše specifické pro Ethernet. Konstruktor potomka musí zavolat konstruktor rodiče (`super()` / `parent::__construct()`):

```javascript
class EthFrame extends PDU {       // "extends" = dědí od PDU
  constructor(dmac, smac, type, payload) {
    super(payload);                // předá payload rodičovskému konstruktoru
    this.#dmac = dmac;
    // ...
  }
}
```

---

## Abstraktní třída a metody

**Abstraktní třída** slouží pouze jako šablona pro potomky — **nelze z ní přímo vytvořit objekt**. Může obsahovat **abstraktní metody** — metody bez implementace, které musí každý potomek napsat sám.

V reálném světě neexistuje "obecná síťová datová jednotka" — existují konkrétní věci jako Ethernetový rámec nebo IP paket. Proto je `PDU` abstraktní.

```php
abstract class PDU
{
    protected string $payload;

    public function __construct(string $payload)
    {
        $this->payload = $payload;
    }

    // Abstraktní metoda — každý potomek si ji MUSÍ implementovat sám
    abstract public function isValid(): bool;
}
```

Pokus o přímé vytvoření abstraktní třídy selže:

```php
$pdu = new PDU("data");
// Fatal error: Cannot instantiate abstract class PDU

$frame = new EthFrame(...);
// OK — EthFrame je konkrétní potomek, který isValid() implementoval
```

---

## Statické metody a atributy

**Statický** obsah patří celé **třídě**, ne konkrétnímu objektu. Volá se přímo na třídě bez vytváření instance. Typické použití: pomocné (utility) metody, sdílené konstanty, validátory.

```javascript
// Statická metoda — ověří formát MAC adresy
static isValidMac(mac) {
  const macRegex = /^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/;
  return macRegex.test(mac);
}

// Volání přímo na třídě (bez new):
EthFrame.isValidMac("fa:31:45:65:c6:a9");  // true
EthFrame.isValidMac("invalid-mac");         // false
```

> **Kdy použít statiku?** Pokud metoda nepotřebuje přistupovat k datům konkrétního objektu, ale pracuje jen s argumenty nebo sdílenou logikou, je vhodné ji označit jako `static`. V kódu si pak všimněte, že `isValidMac` nepoužívá `this` — proto je statická.

---

## Přehled pojmů

| Pojem             | Stručně                                                              | Příklad                               |
|-------------------|----------------------------------------------------------------------|---------------------------------------|
| **Třída**         | Šablona / plán pro objekty                                           | `class EthFrame { ... }`             |
| **Objekt**        | Konkrétní instance třídy                                             | `new EthFrame(...)`                   |
| **Atribut**       | Data uložená v objektu                                               | `$dmac`, `#fcs`, `self.__type`        |
| **Metoda**        | Funkce patřící objektu                                               | `isValid()`, `calculateFcs()`         |
| **Konstruktor**   | Metoda spuštěná při vytvoření objektu                                | `constructor()`, `__init__`, `__construct()` |
| **public**        | Přístupný odkudkoliv                                                 | `public function getDmac()`           |
| **private**       | Přístupný jen uvnitř třídy                                           | `#fcs`, `private $dmac`              |
| **protected**     | Přístupný v třídě a jejích potomcích                                 | `protected $payload`                  |
| **Getter/Setter** | Kontrolovaný přístup k privátním datům (čtení / zápis)              | `getDmac()`, `setDmac()`, `get dmac` |
| **Dědičnost**     | Potomek přebírá funkčnost rodiče                                     | `class EthFrame extends PDU`          |
| **Abstraktní**    | Šablona, která se nedá přímo instanciovat; potomci musí doplnit metody | `abstract class PDU`, `@abstractmethod` |
| **Statický**      | Patří třídě jako celku, ne instanci; volá se bez `new`              | `static isValidMac(mac)`             |
