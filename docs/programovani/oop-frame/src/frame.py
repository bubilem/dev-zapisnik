import re
import datetime

from abc import ABC, abstractmethod

class PDU(ABC):
    def __init__(self, payload):
        self._payload = payload

    @property
    def payload(self):
        return self._payload

    @payload.setter
    def payload(self, new_payload):
        self._payload = new_payload

    @abstractmethod
    def is_valid(self):
        pass

class EthFrame(PDU):
    def __init__(self, dmac, smac, type, payload, fcs=None):
        super().__init__(payload)
        """
        Základní konstruktor (metoda, která se volá při vytvoření objektu).
        """
        # Validace MAC adres hned při vytvoření, abychom nevytvořili nesmysl
        if not self.is_valid_mac(dmac):
            raise ValueError(f"Neplatná cílová MAC adresa: {dmac}")
        if not self.is_valid_mac(smac):
            raise ValueError(f"Neplatná zdrojová MAC adresa: {smac}")

        # Atributy začínající dvěma podtržítky jsou v Pythonu chápány jako "privátní" (skryté).
        self.__dmac = dmac
        self.__smac = smac
        self.__type = type
        
        # FCS = Frame Check Sequence (Kontrolní součet)
        # Pokud fcs nezadáme ručně, vypočítá se samo.
        if fcs is not None:
            self.__fcs = fcs
        else:
            self.__fcs = self.calculate_fcs()

    @staticmethod
    def is_valid_mac(mac):
        """Ověří, že MAC adresa vypadá např. jako aa:bb:cc:dd:ee:ff"""
        # Pro začátečníky: regulární výraz (vzor) pro kontrolu formátu
        vzor = r"^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$"
        return re.match(vzor, mac) is not None

    def calculate_fcs(self):
        """Jednoduchý kontrolní součet (Hash) - sečte číselné hodnoty znaků např. z ASCII tabulky."""
        text = self.__dmac + self.__smac + str(self.type) + self.payload
        hash_hodnota = 0
        for znak in text:
            hash_hodnota += ord(znak) # ord('A') převede písmeno na jeho číselný kód z tabulky
        return hash_hodnota
        
    def recalculate_fcs(self):
        """Pomocná metoda pro přepočet FCS při změně dat."""
        self.__fcs = self.calculate_fcs()

    # --- Vlastnosti (Properties) ---
    # @property nám umožňuje číst atributy zvenčí, aniž bychom porušili jejich "skrytí"
    # Dále umožňuje napojit tzv. "setter", který provede kus kódu PŘI KAZDÉ změně této proměnné!

    @property
    def payload(self):
        return super().payload

    @payload.setter
    def payload(self, new_payload):
        # Kdykoliv někdo zvenčí přepíše data objektu (frame.payload = "Nová data"), zavolá se tento kód.
        PDU.payload.fset(self, new_payload)
        self.recalculate_fcs()  # Vždy automaticky přepočítáme FCS při změně

    @property
    def dmac(self):
        return self.__dmac

    @dmac.setter
    def dmac(self, new_dmac):
        if not self.is_valid_mac(new_dmac):
            raise ValueError("Neplatná MAC adresa")
        self.__dmac = new_dmac
        self.recalculate_fcs()

    @property
    def smac(self):
        return self.__smac

    @smac.setter
    def smac(self, new_smac):
        if not self.is_valid_mac(new_smac):
            raise ValueError("Neplatná MAC adresa")
        self.__smac = new_smac
        self.recalculate_fcs()

    @property
    def type(self):
        return self.__type
        
    @type.setter
    def type(self, new_type):
        self.__type = new_type
        self.recalculate_fcs()

    @property
    def fcs(self):
        return self.__fcs

    # --- Metody ---

    def is_valid(self):
        """Vrátí True (Pravda), pokud sedí aktuálně spočítaný kontrolní součet s tím, který si rámec nese s sebou."""
        return self.calculate_fcs() == self.__fcs

    def __str__(self):
        """Tato speciální (magická) metoda se zavolá, když napíšeme např. print(ramec)"""
        return f"[Rámec] ZDROJ: {self.__smac} -> CÍL: {self.__dmac} | TYP: 0x{self.__type:04X} | FCS: {self.__fcs} | DATA: '{self.payload}'"

    def corrupt_data(self):
        """Speciální výuková metoda: Schválně zničíme data pro demonstraci chyby při přečtení na cílové stanici."""
        # Nastavíme nesmyslná data, aniž bychom automaticky přepočítali FCS = validace by měla selhat.
        PDU.payload.fset(self, "Rozbite_data_behem_prenosu")
        self.__fcs = 999999

# === Ukázka použití ===
if __name__ == "__main__":
    try:
        print("--- Vytváření platného rámce ---")
        frame1 = EthFrame("fa:31:45:65:c6:a9", "00:1a:2b:3c:4d:5e", 0x0800, "Hello World!")
        print(frame1)
        print(f"Původní FCS: {frame1.fcs}")
        print(f"Je rámec validní? {frame1.is_valid()}")

        print("\n--- Změna payloadu přes setter ---")
        frame1.payload = "New secure data"
        print(frame1)
        print(f"Nové FCS po změně payloadu: {frame1.fcs}")
        print(f"Je rámec validní po legitimní změně? {frame1.is_valid()}")

        print("\n--- Simulace poškození přenosu ---")
        frame1.corrupt_data()
        print(frame1)
        print(f"Je poškozený rámec validní? {frame1.is_valid()}")

        print("\n--- Pokus o vytvoření rámce s chybou ---")
        bad_frame = EthFrame("invalid-mac-address", "00:1a:2b:3c:4d:5e", 0x0800, "Test data")

    except ValueError as e:
        print(f"\nZachycena chyba: {e}")
