# Asynchronní JavaScript a API

[Zpět na README.md](../README.md)

Doposud běžel náš kód řádek po řádku. Moderní web ale musí umět čekat – na data ze serveru, na načtení obrázku nebo na odpověď databáze – aniž by zamrzl.

## 1. JSON (JavaScript Object Notation)

Předtím, než začneme posílat data, musíme vědět, v jakém formátu cestují. JSON je textový formát, který vypadá jako JS objekt, ale má přísnější pravidla (všechny klíče musí být v uvozovkách).

- **`JSON.stringify(data)`**: Převede JS objekt na text (pro odeslání).
- **`JSON.parse(text)`**: Převede text zpátky na JS objekt (pro čtení).

## 2. API (Application Programming Interface)

API je "číšník", který zprostředkovává komunikaci mezi vámi (klient) a kuchyní (server/databáze). Vy si "objednáte" data (Request) a API vám je "přinese" (Response).

## 3. Fetch API a Promises

Starší metody (XMLHttpRequest) jsou pryč. Dnes používáme `fetch()`.

```javascript
fetch('https://api.example.com/data')
  .then(odpoved => odpoved.json()) // Čekám na hlavičky a převádím na JSON
  .then(data => console.log(data)) // Mám data!
  .catch(chyba => console.error(chyba)); // Něco se pokazilo
```

## 4. Moderní syntaxe: Async / Await

Zápis s `.then()` může být nepřehledný. ES2017 přineslo revoluci – asynchronní kód, který vypadá jako synchronní.

- **`async`**: Označuje funkci, která bude pracovat asynchronně.
- **`await`**: Příkaz "počkej, dokud se to nedokončí". Lze použít jen uvnitř `async` funkce.

```javascript
const nactiData = async () => {
    try {
        const odpoved = await fetch('https://api.example.com/data');
        const data = await odpoved.json();
        console.log(data);
    } catch (chyba) {
        console.error("Chyba při stahování:", chyba);
    }
}
```

<br>
<br>
<br>

# Cvičení: Práce s daty

## Část 1: JSON Teorie

Který z následujících zápisů je **validní JSON**?

A) `{ jmeno: "Petr", vek: 25 }`
B) `{ 'jmeno': 'Petr', 'vek': 25 }`
C) `{ "jmeno": "Petr", "vek": 25 }`

Odpověď: `__________`

## Část 2: Await v praxi

Máme funkci `stahniObrazek()`, která vrací Promise (chvíli to trvá). Doplňte klíčová slova `async` a `await` na správná místa:

```javascript
const mojeGalerie = __________ () => {
    console.log("Začínám stahovat...");
    const obrazek = __________ stahniObrazek();
    console.log("Obrázek stažen:", obrazek);
}
```

## Část 3: Zpracování chyb

Co se stane v kódu z bodu 4 (Async/Await), když vypadne internet a `fetch` selže? Která část kódu se spustí?

1. Program spadne a stránka zamrzne.
2. Spustí se blok `try`.
3. Spustí se blok `catch` a vypíše chybu do konzole.

Odpověď: `__________`

<br>
<br>
<br>

# Klíč k řešení

### Část 1: JSON

**C** je správně. JSON vyžaduje **dvojité uvozovky** jak u klíčů, tak u textových hodnot.

### Část 2: Await

```javascript
const mojeGalerie = async () => {  // Funkce musí být async
    console.log("Začínám stahovat...");
    const obrazek = await stahniObrazek(); // Musíme počkat na výsledek
    console.log("Obrázek stažen:", obrazek);
}
```

### Část 3: Chyby

**3** je správně. Blok `try...catch` slouží právě k bezpečnému zachycení chyb, aby aplikace nezkolabovala.
