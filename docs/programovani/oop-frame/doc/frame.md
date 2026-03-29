# Dokumentace tříd: PDU a EthFrame

Tento dokument detailně popisuje architekturu a rozhraní dvou klíčových objektů naší síťové simulace. Objektový návrh se zaměřuje na striktní zapouzdření dat, bezpečné nastavování atributů a ukázku základů dědičnosti včetně polymorfismu.

---

## 1. Abstraktní třída `PDU` (Protocol Data Unit)

Třída představuje zcela obecnou předlohu pro jakoukoliv datovou jednotku protokolu. Definuje jen naprostý základ – tedy samotný datový náklad (payload) a povinnost umět se sama zvalidovat. Z této třídy nelze vytvářet přímé instance (je abstraktní).

### Atributy
*   `payload` (String): Samotný datový náklad, který se přenáší uvnitř jednotky. Atribut je zvenčí nepřístupný (private/protected) a pracuje se s ním výhradně přes přístupové metody.

### Konstruktor
*   `PDU(payload)`: Inicializuje datovou jednotku PDU tím, že bezpečně uloží doručená data. Implementace v sobě obsahuje bezpečnostní pojistku, která zamezí vytvoření "holého" PDU bez konkrétního síťového obalu (jako je např. Ethernetový rámec).

### Metody (Přístupové)
*   `get payload()` / `getPayload()`: Návratová metoda (Getter), která ven vrátí aktuálně nesený datový náklad.
*   `set payload(val)` / `setPayload(val)`: Metoda (Setter), pomocí které je možné bezpečně zapsat do PDU nová data.

### Metody (Abstraktní)
Následující metody slouží jako kontrakt (prázdná definice). Každý specifický potomek, který z `PDU` dědí, musí k metodám sám nutně implementovat vlastní blok kódu.

*   `isValid()`: Jakákoliv vrstva, která PDU rozšiřuje, musí mít logiku, jíž dokáže stoprocentně ověřit vlastní nerozbitost a vrátit datový typ boolean (`true`/`false`) o validitě objektu.

---

## 2. Třída `EthFrame` (Ethernetový rámec)

Třída reprezentuje konkrétní model Ethernetového rámce L2 síťové vrstvy. Třída rozšiřuje základní datovou jednotku `PDU` (dědí z ní přes klíčové slovo `extends` / v Pythonu s vnořením `(PDU)`) tak, že data obalí vlastní hlavičkou s MAC adresami a navíc doplní patičku Frame Check Sequence (FCS) pro odhalení poškození. 

### Vlastní atributy 
* Všechny atributy jsou striktně chráněné proti přímému vypsání/přepsání (zapouzdřené).
*   `dmac` (String): Cílová (Destination) MAC adresa ve standardním hexadecimálním tvaru. Značí, na jakou síťovou kartu rámec putuje.
*   `smac` (String): Zdrojová (Source) MAC adresa odesílatele rámce. 
*   `type` (Integer): EtherType identifikátor protokolu umístěného uvnitř payloadu (např. typicky `0x0800` pro IPv4 nebo `0x0806` pro ARP).
*   `fcs` (Integer): Frame Check Sequence; kontrolní součet rámce vygenerovaný složitějším hashováním na základě spojení obsahu hlavičky a samotných dat z parent `PDU`. Pokud se po cestě cokoliv změní a hash neodpovídá, rámec je neplatný.

### Konstruktor
*   `EthFrame(dmac, smac, type, payload, fcs=null)`: 
    * Okamžitě volá chráněný konstruktor svého rodiče `PDU` a naloží do něj payload.
    * Pomocí statických metod detailně zvaliduje strukturu vstupních řetězců MAC adres (aby neskončil s nesmyslnými znaky a nesestavil nesmyslný síťový balík).
    * Pokud není specifikován záměrně ruční `fcs` k nasimulování chyb, automaticky se při zrození rámce vypočítá první správný kontrolní součet pomocí lokální metody a uloží se do pole.

### Statické metody
*   `static isValidMac(mac)`: Pomocná utilita nezávislá na vzniku objektu. Obdrží do parametru slovo, které proti regulárnímu výrazu `^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$` vyhodnotí do podoby `true/false`, čímž rozhoduje o validitě vzhledu MAC adres. 

### Instanční gettery a settery
Každý atribut rámce má explicitní Getter a Setter, který chrání logiku proměnných.
*   `get / set dmac(val)`: Při volání setteru nejenže přepíše privátní lokální MAC hodnotu, ale rovnou zavolá bezpečnostní ověření a vygenerování nového validního kontrolního součtu (FCS).
*   `get / set smac(val)`: Stejně jako úprava dmac zaručuje ihned re-hash rámce a kontrolu MAC formátu.
*   `get / set type(val)`: Zapíše nový typ vloženého vyššího protokolu a vyvolá re-hash rámce pres FCS.
*   `set payload(val)`: Třída modifikuje (override) tuto vlastnost z rodiče tak, že po uložení nových dat dceřiný objekt sám chytře okamžitě přepíše FCS!
*   `get fcs()`: Vrací aktuálně uložený kontrolní součet v patičce pro možnost ověření kódem. Není k němu volný Setter! 

### Instanční metody
*   `calculateFcs()`: Algoritmus, který zřetězí k sobě textové obsahy veškerých aktuálních vnitřních metadat a poslaného parent.payload do ohromného textu a z něj následně spočítá po jednotlivých ASCII znacích číselnou Hashovou obálku daného řetězce a vrátí ji z funkce ven v Integer formátu.
*   `recalculateFcs()` (Privátní/Protected metoda): Zkrácená obálka na příkaz `this.fcs = this.calculateFcs()`, aby se nemuselo v settrerech plýtvat dlouze znaky s dosazováním.
*   `isValid()` (overriding abstraktní z rodiče): Porovná, zda aktuálně vypočítaný kontrolní součet fyzicky sedí s tím, co si daný rámec teď konkrétně opravdu nese v paměti za hodnotu ve svém atributu (např. v JS jako `fcs`). Pokud ano, rámec je korektní a přežil let bez úhony. Vrací formát boolean (`true`/`false`).
*   `toString()` / `__str__()`: Magická převádějící metoda. Pokud programátor potřebuje rámec ihned vypsat do formy debug textu v konzoli jako string, objekt se vyrenderuje v úhledném čitelném grafickém a seřazeném stringu `[EthFrame] SRC: ... DST: ... DATA: ...`.

### Výukové a pomocné metody
*   `corruptData()`: Demoliční zbraň stavěná čistě pro demonstrační použití. Zničí uvnitř rodičovské platformy data v Payload poli za string obsahující chybu přenosu a úmyslně zakáže v dceři jakékoliv re-hashování a kontrolní součet natvrdo přepálí vlastním číslem, který s novými daty obálky naprosto nekomunikuje. Metoda `isValid()` po tomto činu odhalí zničený paket.
