# Základy JS

[Zpět na README.md](../README.md)

JavaScript je moment, kdy se z „kreslení“ webu stává skutečné **programování**. U HTML a CSS jsme řešili, jak věci vypadají, v JS budeme řešit, jak se věci **chovají**. Pro začátek je klíčové pochopit základní logiku, kterou sdílí většina programovacích jazyků.

Chronologický seznam kompetencí pro základy JS:

## 1. Koncepce a výstup

Žák musí vědět, jak s jazykem komunikovat a kde vidět výsledky:

- **Umístění kódu:** Znalost tagu `<script>` a připojení externího souboru `.js`.
- **Konzole (DevTools):** Schopnost používat `console.log()` pro výpis dat a ladění chyb.
- **Základní syntaxe:** Citlivost na velká a malá písmena (case-sensitivity), používání středníků (volitelné, ale doporučené) a komentářů (`//`).

## 2. Proměnné a datové typy

Jak si počítač pamatuje data:

- **Deklarace:** Rozdíl mezi `let` (proměnná, která se mění) a `const` (konstanta, která se nemění). _Staré `var` už raději neučit._
- **Základní typy:**
  - **String** (text v uvozovkách).
  - **Number** (čísla, JS nerozlišuje celé a desetinné).
  - **Boolean** (`true` / `false`).
  - **Null / Undefined** (prázdnota).
- **Dynamické typování:** Pochopení, že proměnná může změnit svůj typ (např. z čísla na text).

## 3. Operátory a podmínky

Rozhodovací procesy:

- **Aritmetika:** `+`, `-`, `*`, `/`, `%` (zbytek po dělení) a inkrementace `++`.
- **Porovnávání:** Rozdíl mezi `==` (hodnota) a `===` (hodnota i typ – doporučeno používat striktní shodu).
- **Logické operátory:** `&&` (a zároveň), `||` (nebo), `!` (negace).
- **Podmínky:** Konstrukce `if`, `else if`, `else`.

## 4. Pole a Cykly (Práce s daty)

Jak zpracovat více věcí najednou:

- **Pole (Array):** Vytvoření seznamu `['jablko', 'banán']`, přístup k prvkům přes indexy (začíná se od `0`) a vlastnost `.length`.
- **Cykly:**
- `for` cyklus: Klasické procházení pomocí počitadla.
- `for...of`: Moderní a čitelnější způsob procházení prvků v poli.

- **Základní metody pole:** Přidávání (`push`) a odebírání (`pop`) prvků.

## 5. Funkce

Znovupoužitelné bloky kódu:

- **Deklarace a volání:** Jak funkci vytvořit a jak ji spustit.
- **Parametry a argumenty:** Předávání dat do funkce.
- **Návratová hodnota (`return`):** Pochopení, že funkce může výsledek "vydat" zpět pro další použití.


<br>
<br>
<br>

# Cvičení: Základy JavaScriptu

## Část 1: Proměnné a typy

Máš následující kód. Urči, jaký datový typ bude v proměnných uložena:

```javascript
let a = "10"; // Typ: __________
let b = 10; // Typ: __________
let c = 5 > 2; // Typ: __________
const d = [1, 2]; // Typ: __________
```

## Část 2: Podmínky

Doplň kód tak, aby vypsal "Dospělý", pokud je věk 18 a více, jinak vypíše "Nezletilý":

```javascript
let vek = 20;

if (__________) {
    console.log("Dospělý");
} __________ {
    console.log("Nezletilý");
}

```

## Část 3: Cykly a pole

Máš pole barev. Doplň cyklus tak, aby vypsal každou barvu do konzole:

```javascript
let barvy = ["červená", "zelená", "modrá"];

for (let barva __________ barvy) {
    console.log(__________);
}

```

## Část 4: Funkce

Napiš funkci `vynasob`, která přijme dvě čísla jako parametry a vrátí jejich součin:

```javascript
function vynasob(a, b) {
    __________ a * b;
}

let vysledek = vynasob(5, 4); // vysledek by měl být 20

```

<br>
<br>
<br>

# Klíč k řešení

### Část 1: Proměnné a typy

- `a`: String (text)
- `b`: Number (číslo)
- `c`: Boolean (pravda/nepravda)
- `d`: Array (pole / objekt)

### Část 2: Podmínky

```javascript
if (vek >= 18) {
  console.log("Dospělý");
} else {
  console.log("Nezletilý");
}
```

### Část 3: Cykly a pole

```javascript
for (let barva of barvy) {
  console.log(barva);
}
```

### Část 4: Funkce

```javascript
function vynasob(a, b) {
  return a * b;
}
```
