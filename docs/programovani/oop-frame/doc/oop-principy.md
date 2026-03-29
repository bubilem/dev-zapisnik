# Základní pilíře a principy OOP

Objektově orientované programování (OOP) je moderní a silný způsob, jak psát aplikace. Místo abychom psali kód jako pouhý jeden obrovský seznam po sobě jdoucích funkcí a proměnných, uvažujeme o softwaru jako o sbírce samostatných součástek (objektů), které spolu komunikují. 

Každý objekt slučuje data (tzv. **atributy** nebo **vlastnosti**) a chování (tzv. **metody**). 

Naše postavené modely ethernetové síťové vrstvy (`PDU` a `EthFrame`) reprezentují naprosto dokonalý příklad toho, jak lze do jednoduchého programu promítnout všechny 4 hlavní pilíře OOP.

---

## 1. Zapouzdření (Encapsulation)

### Princip
Zapouzdření znamená skrytí vnitřních dat (stavu) objektu před okolním světem a vynucení komunikace výhradně skrz jasně definované rozhraní (veřejné metody neboli gettery a settery). Myšlenkou je "Pusť k sobě uživatele jen přes dveře a nenech nikomu klíče od trezoru, jinak si zaručeně něco zničíš."

### Jak jsme to využili v našem kódu
V ethernetovém rámci máme jako kritický atribut `FCS` (kontrolní součet v patičce), který hlídá, jestli nedošlo k poškození rámce.
Kdybychom nechali atributy čistě veřejné (public), zlý nebo líný programátor by mohl udělat toto:
```php
$frame->payload = "Nová tajná data";  // Vývojář jen mění data...
// Zapomněl ale zcela přepočítat heslo FCS, takže rámec ihned v síti spadne jako porušený!
```

Díky modifikátorům u `payload` a privátnímu `fcs` (`#fcs` v JS, `__fcs` v Pythonu, `private int $fcs` v PHP) má programátor zvenčí k proměnné zakázaný přímý přístup a musí použít předepsaný přesný setter `setPayload()`. 
Náš objekt v tomto setteru převzal kontrolu a postaral se o práci.
```php
// Uvnitř třídy
public function setPayload(string $payload): void {
    parent::setPayload($payload);
    $this->recalculateFcs(); // Objekt ví ze všech nejlíp, co musí udělat! Nikdo mimo třídu o tom teď ani nemusí tušit.
}
```

---

## 2. Dědičnost (Inheritance)

### Princip
Dědičnost umožňuje vytvářet nové ("dceřiné") třídy postavené rovnou na základech existujících ("rodičovských") tříd. Dědící třída rovnou vlastní veškerou funkčnost a proměnné od rodiče a může je jak používat, tak i rozšiřovat o svoje exkluzivní prvky. Šetří se tak obrovské množství psaní kódu (tzv. DRY přístup - Don't Repeat Yourself).

### Jak jsme to využili v našem kódu
Založili jsme rodičovskou abstraktní třídu struktury `PDU` (Protocol Data Unit), která má v sobě uložení proměnné `$payload` a přístupy na získání a uložení dat. Má univerzální využití pro ethernet, wifi, ipv4 i ipv6.
```php
class EthFrame extends PDU { ... }
```
Díky dědičnosti náš ethernetový rámec `EthFrame` už NEMUSEL vynalézat proces, jak skladovat `payload` a jak si zakládat settery pro zjištění textu. Dostal to zadarmo od rodiče včetně bezpečné struktury. K dědictví si naopak dodal exkluzivně jen struktury, které dělají ethernet ethernetem: `MAC adresy` z hlavičky paketů a Hash funkce `FCS()`.

---

## 3. Polymorfismus (Polymorphismus / Mnohotvárnost)

### Princip
Polymorfismus umožňuje pracovat s objekty různých detailních tříd naprosto stejnokrojně (jednotně), přičemž každá z nich si logiku v příkazu rozebere exkluzivně úplně po svém – sama totiž nejlépe ví, co se od ní chce. Toho se nejčastěji docílí "překrytím" (override) shodně pojmenované metody u potomků.

### Jak jsme to využili v našem kódu
Rodič `PDU` vytvořil požadavek – definoval všem, aby u sebe zařídili a zprovoznili metodu `isValid()`. 
V našem kódu jsme tuto metodu vložili do třídy `EthFrame`, kde jsme řekli: "Já, Ethernet, posuzuji svoji validitu tak, že proženu data ASCII Hašem a porovnám ten výsledek se svým uloženým Integerem z patičky".
```javascript
  isValid() {
    return this.calculateFcs() === this.#fcs;
  }
```

Nyní si představte, že v projektu vytvoříme IP paket (`class IPv4Packet extends PDU`). Kód v něm pro ověření přežití balíčku už ale nebude složitý hash rámců, tenhle zničená data zjistí jen prostým součtem velikosti bytů podle hlavičky. A to je to nádherné. V obou dvou balíčcích zavoláme prostým příkazem:
`pokusny_objekt.isValid()` a ačkoliv se kód fyzicky provede diametrálně lišácky bezpečně pod kapotou podle toho v čem leží, u obou doručí správný výsledek stejnou logickou propojkou!

---

## 4. Abstrakce (Abstraction)

### Princip
Abstrakce je proces zjednodušení reálného světa tím, že skryjeme nesouvisející tlusté detaily a komplexní složitosti systému venku představíme jen jako souhrnnou jednoduchou operaci nebo šablonu. Nesoustředí se primárně na to "JAK" se to pod kapotou udělá, ale na to "CO" to dělá.

### Jak jsme to využili v našem kódu
Naše kořenová třída `PDU` byla nastavena jako **abstraktní** (`abstract class` v PHP, `ABC` v Pythonu, nebo uměle přes výjimku v JS v konstruktoru). 
Znamená to jediné. Ve skutečném fyzickém počítači taková obecná "nespecifikovaná struktura posílající balík textů" neexistuje. Nemůžeme z ní udělat fyzickou instanci. Musíme vytvořit nejdříve něco specifikovaného – v našem kontextu to musí být rovnou plnokrevný bezpečný *Ethernetový rámec*. Ale zároveň abstrakce představuje nedotknutelný silný architekturní model v kódu; každý síťový programátor teď po jediném pohledu do struktury na sto procent ví, že libovolná další jednotka sítě přidána do tohoto projektu rovnou sama nese základní data a automaticky vlastní prokazatelnou implementaci toho, jak posoudí, jestli je po bitvě zničená (`isValid()`).
