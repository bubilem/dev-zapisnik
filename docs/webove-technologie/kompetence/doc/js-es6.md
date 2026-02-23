# JS ES6+

[Zpět na README.md](../README.md)

Moderní JavaScript (často označovaný jako **ES6+** nebo **ECMAScript 2015+**) přinesl zápisy, které kód dělají kratší, čitelnější a elegantnější. Pro žáka je důležité tyto zápisy znát, protože v moderních tutoriálech a praxi už starý styl (např. klíčové slovo `var` nebo klasické `function`) téměř nepotká.

Zde jsou klíčové kompetence pro moderní JS zápisy:

## 1. Arrow Functions (Šipkové funkce)

Způsob, jak psát anonymní funkce stručněji:

- **Syntaxe:** `() => { ... }` místo `function() { ... }`.
- **Zkrácený zápis:** Pokud má funkce jen jeden parametr, nemusí mít závorky: `param => { ... }`. Pokud vrací výsledek na jednom řádku, nemusí mít složené závorky ani `return`: `(a, b) => a + b`.
- **Použití v událostech:** Např. `btn.onclick = () => { alert('Klik!'); };`.

## 2. Template Literals (Šablonové řetězce)

Konec složitého spojování textu pomocí `+`:

- **Zpětné uvozovky (backticks):** Používání `text` místo `'text'` nebo `"text"`.
- **Interpolace proměnných:** Vkládání proměnných přímo do textu pomocí `${promenna}`.
- **Víceřádkové řetězce:** Možnost psát text na více řádků bez použití `\n`.

## 3. Destrukturalizace (Destructuring)

Rychlé "vytažení" hodnot z polí nebo objektů do samostatných proměnných:

- **U polí:** `const [prvni, druhy] = pole;`.
- **U objektů:** `const { jmeno, vek } = uzivatel;`. To se extrémně často používá při práci s daty z API.

## 4. Spread a Rest operátor (`...`)

Tři tečky, které umí zázraky:

- **Spread (rozprostření):** Kopírování polí nebo objektů – `const novePole = [...starePole, "novyPrvek"];`.
- **Rest (zbytek):** Shromáždění zbývajících parametrů ve funkci do jednoho pole.

## 5. Moderní práce s poli (Metody `map`, `filter`, `forEach`)

Místo klasických `for` cyklů se dnes používají tyto metody, které často využívají právě šipkové funkce:

- **`forEach`:** Provede akci pro každý prvek.
- **`map`:** Vytvoří nové pole transformací prvků (např. z pole čísel pole jejich dvojnásobků).
- **`filter`:** Vytvoří nové pole obsahující jen prvky, které splňují podmínku.


<br>
<br>
<br>

# Cvičení: Moderní JS (ES6+)

## Část 1: Přepis na Arrow Function

Přepiš tuto klasickou funkci na šipkovou (arrow) funkci:

```javascript
// Starý zápis:
const pozdrav = function (jmeno) {
  return "Ahoj " + jmeno;
};

// Moderní zápis (včetně template literal):
const pozdrav = (__________) => `__________`;
```

## Část 2: Template Literals

Máš proměnné `produkt` a `cena`. Vytvoř větu: "Produkt [produkt] stojí [cena] Kč." pomocí backticks:

```javascript
const produkt = "Káva";
const cena = 50;

const veta = `________________________________________`;
```

## Část 3: Práce s poli (forEach)

Máš pole `const jmena = ["Petr", "Jana", "Lucie"];`. Použij metodu `forEach` a šipkovou funkci, aby se do konzole vypsalo každé jméno:

```javascript
jmena.forEach((__________) => {
  console.log(__________);
});
```

<br>
<br>
<br>

# Klíč k řešení

### Část 1: Přepis

```javascript
const pozdrav = (jmeno) => `Ahoj ${jmeno}`;
```

### Část 2: Template Literals

```javascript
const veta = `Produkt ${produkt} stojí ${cena} Kč.`;
```

### Část 3: forEach

```javascript
jmena.forEach((jmeno) => {
  console.log(jmeno);
});
```
