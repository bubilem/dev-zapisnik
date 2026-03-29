# Porovnání OOP v JavaScriptu, Pythonu a PHP

Tento dokument blízce popisuje a porovnává přístupy k objektově orientovanému programování (OOP) ve třech populárních jazycích: JavaScript, Python a PHP. Vychází u toho ze zdrojových kódů pro simulaci ethernetového rámce (`EthFrame`) a jeho abstraktní rodičovské třídy (`PDU`), na kterých si můžeme ukázat konkrétní designové odlišnosti.

---

## 1. Abstraktní třídy (Abstract Classes)
Abstraktní třída slouží jako "vynucená" rodičovská šablona pro ostatní třídy a nelze z ní přímo vytvářet spustitelné instance.

**JavaScript** (`frame.js`)
JavaScript nativně klíčové slovo `abstract` nemá. Abstrakci proto programátoři většinou simulují vyhozením výjimky přímo uvnitř konstruktoru rodiče, pokud se někdo pokusí vytvořit instanci pomocí inicializace dané třídy (`new.target`).
```javascript
class PDU {
  constructor(payload) {
    if (new.target === PDU) {
      throw new Error("Abstraktní třídu PDU nelze přímo instanciovat.");
    }
    this.#payload = payload;
  }
}
```

**Python** (`frame.py`)
V Pythonu používáme modul `abc` (Abstract Base Classes) a abstraktní třída musí z takového abstraktního kořene (`ABC`) explicitně dědit.
```python
from abc import ABC, abstractmethod

class PDU(ABC):
    def __init__(self, payload):
        self._payload = payload
```

**PHP** (`frame.php`)
PHP má pro abstraktní třídy plnou nativní podporu na jazykové úrovni pomocí klíčového slova `abstract` na začátku řádku. Z takové třídy již automaticky nelze udělat instanci.
```php
abstract class PDU {
    protected string $payload;
    // ...
}
```
**Shrnutí:** Zatímco PHP i Python mají pro abstrakci specializované vestavěné mechanismy (v Pythonu přes knihovnu/modul `abc`), JavaScript toto v základu úplně neumí a nevytvořitelnost třídy musíme hlídat uměle kontrolou konstruktoru.

---

## 2. Abstraktní metody
Abstraktní metody vynucují, aby je každá dceřiná (rozšiřující) třída plně implementovala.

**JavaScript:**
Definujeme běžnou metodu, která při spuštění rodiče vyhodí umělou softwarovou chybu.
```javascript
  isValid() {
    throw new Error("Abstraktní metodu isValid() je nutné implementovat v potomkovi.");
  }
```

**Python:**
Používá se dekorátor `@abstractmethod`. Třída pak (díky zděděnému ABC) nedovolí vytvořit žádného potomka, pokud metoda chybí. Zabije to běh ihned v počátku.
```python
    @abstractmethod
    def is_valid(self):
        pass
```

**PHP:**
Používá klíčové slovo `abstract` na úrovni samotné podpisové metody. Tělo metody je úplně zahozeno a rovnou nahrazeno středníkem.
```php
    abstract public function isValid(): bool;
```
**Shrnutí:** PHP i Python absenci implementace abstraktních metod zkontrolují velmi brzy a nedovolí vývojáři pokračovat, což je výborné na prevenci. V JavaScriptu se chybějící metoda potvrdí naplno leda až pádem aplikace za jejího běhu (tzv. exception time).

---

## 3. Dědičnost (Inheritance)
Tvorba nové pokročilé třídy na základě základů existující třídy.

**JavaScript:**
Dědí se přes klíčové slovo `extends` a rodič se volá funkčně konstruktorem přes `super()`.
```javascript
class EthFrame extends PDU {
  constructor(dmac, smac, type, payload, fcs = null) {
    super(payload); // Volání konstruktoru rodiče
    // ...
  }
}
```

**Python:**
Rodičovská třída se vkládá jako argument do otevírací závorky přímo za pojmenování třídy. Konstruktor předka se volaluje konstrukcí `super().__init__()`.
```python
class EthFrame(PDU):
    def __init__(self, dmac, smac, type, payload, fcs=None):
        super().__init__(payload)
        # ...
```

**PHP:**
Slovo `extends` funguje pro syntax stejně jako v JS. Nadřazený konstruktor voláme striktně adresově přes `parent::__construct()`.
```php
class EthFrame extends PDU {
    public function __construct(string $dmac, string $smac, string $type, string $payload, ?int $fcs = null) {
        parent::__construct($payload);
        // ...
    }
}
```
**Shrnutí:** Vnitřní logika funguje u všech tří programovacích jazyků naprosto stejně. Liší se v podstatě jen syntax (`extends` naproti závorkám) a označující klíčové slovo pro přistoupení o strukturu výše (`super` ve srovnání s operátorem `parent`).

---

## 4. Modifikátory přístupu a viditelnosti (Zapouzdření)
Modifikátory zajišťují bezpečí a limitují zranitelnost prvku zabráněním jeho přemazání zvenčí třídy. Obecně to dělíme na `public` (venku), `protected` (já a potomci), `private` (jen já).

**JavaScript:**
Ačkoliv v minulosti na to JS prdělo, ECMA standardy zavedly naprosto striktní privátní atributy a metody, které se označují prefixovým symbolem mřížky `#`.
```javascript
class EthFrame extends PDU {
  #dmac; // striktně privátní atribut
  #recalculateFcs() { ... } // privátní metoda
}
```

**Python:**
Python jako moderní volnomyšlenkářský model skutečné hardwarové zajištění privátnosti nemá. Skrytý kód se jen eticky označuje podtržítky (`_` pro protected, `__` pro private). Python následně udělá vtipný interní krok ("name mangling"), který jméno proměnné za běhu zakóduje/zkreslí, aby se k němu tak náhodou omylem zvenku nedalo přistoupit.
```python
class EthFrame(PDU):
    def __init__(...):
        self._payload = payload  # jen "protected" dle vizuální konvence
        self.__dmac = dmac       # silnější "private" mangling
```

**PHP:**
Klasický plnokrevný model přístupů. Každá proměnná a funkce je explicitně označována svými slovy `public`, `protected` a `private` + typováním dané datové cesty.
```php
class EthFrame extends PDU {
    private string $dmac;
    protected string $payload;
    
    public function getDmac(): string { ... }
}
```
**Shrnutí:** PHP a JavaScript dnes vyžadují a uplatňují extrémně striktní zapouzdření (v JS nově přes mřížky, v PHP slovně). Python funguje mnohem mírněji, zakládá se typicky jen na dohodách vývojářů a spoléhá na to, že nebudete do skrytých atributů sahat vědomě (nepoužijete název třídy do volání manglingu).

---

## 5. Gettery a Settery (Properties/Vlastnosti)
Oddělená funkční kontrola ukládání či poskytování atributů napříč vrstvami. Umožňuje přídavnou práci (validaci, logiku) na cestě. Chtěli jsme například dosáhnout toho, že každá úprava rámce automaticky dožene přepočítání Hash FCS součtu, abychom nezůstali v rozbitém stavu.

**JavaScript:**
Oplývá speciálními klíčovými slovy `get` a `set`. Zvenčí pak kód působí krásně esteticky; tváří se, že přepisujete přímočarou proměnnou a ono se to zatím přechytí na logickou metodu.
```javascript
  get payload() { return super.payload; }
  set payload(val) { super.payload = val; this.#recalculateFcs(); }

  // Využití v praxi: frame.payload = "Test" (jakoby to byla proměnná)
```

**Python:**
Využívá mocné deklarace (tzv. "dekorátory") `@property` a `@nazev.setter`. Dojem z užití pak je naprosto totožný se stavem v JS, a sice že měníte klasický atribut.
```python
    @property
    def payload(self):
        return super().payload

    @payload.setter
    def payload(self, new_payload):
        PDU.payload.fset(self, new_payload) # specifikace z ABC
        self.recalculate_fcs()

    # Využití v praxi: frame.payload = "Test"
```

**PHP:**
V PHP se naopak nejčastěji setkáte s tradičním, explicitním definováním `getX` a `setX` metod. Zapouzdření je tak plně přiznané a jasně patrné:
```php
    public function getPayload(): string { return $this->payload; }
    
    public function setPayload(string $payload): void { 
        parent::setPayload($payload);
        $this->recalculateFcs(); 
    }

    // Využití v praxi: $frame->setPayload("Test"); (Jako normální funkce)
```

Je pravdou, že **i v PHP lze nasimulovat chování JS a Pythonu** (krásně vypadající přímý přístup k property) pomocí takzvaných magických metod `__get` a `__set`. Tyto metody automaticky zachycují volání na neexistujících nebo privátních atributech:
```php
    public function __get(string $name) {
        if ($name === 'payload') return $this->payload;
        throw new Exception("Property $name neexistuje.");
    }
    
    public function __set(string $name, $value): void {
        if ($name === 'payload') {
            $this->payload = $value;
            $this->recalculateFcs();
        }
    }

    // Využití v praxi pak vypadá nádherně jednoduše: 
    // $frame->payload = "Test";
```

**Zásadní poznámka k PHP a magickým metodám:**
Zatímco v JS a Pythonu je tento syntaktický cukr tvořený properties doporučovaným a standardním proudem, v PHP je používání magických metod `__get` a `__set` pro běžné atributy obvykle považováno za **bad practice (špatný návrhový vzor)** z řady důvodů:
1. **Ztráta podpory IDE:** Vývojová prostředí (např. PhpStorm nebo VSCode) přesně neví, jaké vlastnosti magická třída reálně akceptuje. Přestanou tak napovídat, nedokážou správně doplňovat kód a zhorší se schopnosti refaktoringu. (Částečně to lze obejít komentářovou anotací `@property` v PHPDocu hlavičky třídy, ale není to zaručeno pro analýzu).
2. **Narušení typové kontroly (Type Safety):** Metoda `__set` ze své definice přijímá novou hodnotu s libovolným typem (typicky `mixed`). To znamená ignoraci striktní kontroly typu, o kterou byste se museli starat uvnitř této metody ručně `if(!is_string($value))`. Předchozí pevná metoda `setPayload(string $payload)` odhalí chybu už před spuštěním.
3. **Výkonnostní propad:** Těžba a volání magie `__get/__set` s sebou nese jistou (byť dnes už u PHP 8+ velice malou) režii a ztěžuje možnosti jazykového kompilátoru v provádění hluboké mikrooptimalizace.
4. **Neprůhledná logika (Hidden Flow):** Když čtete cizí PHP cizí kód `$frame->payload = "Test"`, předpokládáte prosté dosazení do public atributu. Aniž byste prohmatali celou třídu dovnitř, vůbec vás nenapadne, že se na pozadí podvodně pustila metoda, která těžce přepočítává nějaký Hash FCS, nebo dokonce sahá do databáze. Šokuje to.

**Shrnutí:** JS a Python si zamilovaly property modely a syntaktický cukr; vývojář se zde netrápí manuální deklarací mnoha set/get funkcí a kód celkově dýchá. V PHP se sice dá krása přímého přístupu nasimulovat emulováním skrz `__get/__set`, avšak profíci (i dokumentace k největším frameworkům) preferují sice trochu "nudnou", ale zato extrémně striktní, udržitelnou a snadno čitelnou cestu explicitních metod typu `setAtribut(x)`.

---

## 6. Konstruktory
Automaticky odpálená metoda na počátku vzniku úplně nového čerstvého objektu, je pověřená tím se o vše první doručené postarat.

**JavaScript:** Vše běží přes jedinečné statické slovo metody `constructor(parametry)`.

**Python:** Opakuje magickou metodu ohraničenou podtržítky a nese název inicializace, čili `__init__(self, parametry)`.

**PHP:** Jak vidno, i v PHP se využívá starší standard předem domluvených "magických názvů", takže se píše plný název `__construct(parametry)`.

**Shrnutí:** Z hlediska OOP je funkce konstruktoru fixně dána všude stejně. Rozdíl spočívá v tom, zdali jazyk preferuje "dunder podtržítkové" metody, aby zabránili překryvu standardních názvů, anebo si rovnou zablokují slovo ve slovníku.

---

## 7. Statické metody
Metody vázané stabilně a přímo u samotné modré střelky na architektuře třídy. K provolání nikdy nesmí dojít přes založený objekt a naopak. Nepotřebují kontext ("this/self").

**JavaScript:**
Zase přibyde jen čisté slovo `static`. Metoda se odřízne od `this`.
```javascript
  static isValidMac(mac) { return macRegex.test(mac); }
```

**Python:**
Musíme ho o dekorátorování poprosit tagem `@staticmethod`. Do parametrů funkce už se automaticky ani nevejde poslaný argument definice objektu tzn. klasický `self`.
```python
    @staticmethod
    def is_valid_mac(mac): ...
```

**PHP:**
Označováno definicí `static`. V PHP to má specifikum uvnitř kódu v tom, že ačkoli normální funkce uvnitř oslovujete instančním `this`, u té statické nemáte v ten moment šanci a proto ji musíte na silu zavolat přes instrukce sebe sama, čili `self::metoda()`. Z venku přes jméno `Třída::metoda()`.
```php
    public static function isValidMac(string $mac): bool { ... }
    
    // Využití vnitřního konstruktoru: self::isValidMac($dmac)
```

---

## 8. Práce s objekty a Založení (Ošetření bloky Try/Catch)
A na závěr, jak vůbec vznikne reálnej vzorek testovaného provozu, jak z dané třídy založit objekt a manipulovat jím, zatímco neustále sbíráme vyhozené chyby za pomoci bezpečné ohrádky (catch/except boxu).

**JavaScript:** Nahození plní logické `new`, a čtení se potýká s propojovací tečkou `.`.
```javascript
try {
  const frame1 = new EthFrame("fa:31...", "00:1a...", 0x0800, "Hello");
  frame1.payload = "Nová data"; // vlastně takto rovnou odpálí onen inteligentní setter zvrchu
  frame1.corruptData();
} catch (error) {
  console.error(error.message);
}
```

**Python:** Klíčové a zavazující slovo `new` neexistuje. Objekty a reference se generují pouhým provoláním jména třídy.
```python
try:
    frame1 = EthFrame("fa:31...", "00:1a...", 0x0800, "Hello")
    frame1.payload = "Nová data"
    frame1.corrupt_data()
except Exception as e:
    print(e)
```

**PHP:** Objekty se sice tvoří tradičním velkým slovem `new`, ale absolutně obrovský rozdíl nastává u přístupu. Tradiční tečka uvnitř PHP syntaxe slouží místo + ke zřetězení kusů textu a stringů do sebe. Na mapování datových propojek se místo ní tu proto vyžívá tzv. syntax strukturových ukazatelů s hroty ve formě šipky `->`.
```php
try {
    $frame1 = new EthFrame("fa:31...", "00:1a...", 0x0800, "Hello");
    $frame1->setPayload("Nová data"); // Pevné funkční zavedené oslovení 
    $frame1->corruptData();
} catch (Exception $e) {
    echo $e->getMessage();
}
```

---
**Shrnutí & Závěr**
Všechny dané jazyky pracují s jádrovou logikou a vizí programových struktur identicky. Jejich architekturní chování směřuje ke skrytí interních dat (zapouzdření), definování kořenů (abstrakce) a sdílení funkcionality (dědičnost).
Rozdílnosti nastávají přímo a jen v lexikálních zápisech:
- **PHP** je suverénně nejkomplexnější formální klasikou. Nativně nutí psát striktní strukturovaná slova typu `private`, `protected`, či moduly oddělené logicky a šipkami. Většinou na sebe strhne i psaní spousty textu při definicích.
- **JavaScript** představuje velmi svižnou asynchronní verzi a snaží se spoustu mechanismů tlumit a usnadnit skrz nové vlastnosti. Poskytuje vizuální cukr setterů a getterů a je celkově mírnější (samotná abstrakce tříd se musí realizovat falešnými chybami a ne slovem enginu z jádra).
- **Python** je králem nejrychlejší a nejpřirozenější syntaxe (`try/except`, magické podtržítkování, definování property skrz dekoranty). Klade zodpovědnost a čistý návrh až na bedra a slušnost programátorů, než na to že by vynucenou neprostupnost zařídil samotný engine.
