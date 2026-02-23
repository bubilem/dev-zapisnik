# JS DOM

[Zpět na README.md](../README.md)

**DOM (Document Object Model)** je most, který spojuje JavaScript s HTML a CSS. Díky němu už JavaScript není jen "kalkulačka" v konzoli, ale nástroj, kterým tvoříte interaktivní aplikace.

Představte si HTML dokument jako **strom**, kde každá značka (tag) je jedním listem nebo větví. JavaScriptem pak můžeme s těmito větvemi hýbat, uřezávat je nebo přidávat nové.

Zde jsou klíčové kompetence pro manipulaci s DOM:

## 1. Výběr prvků (Selecting)

Než prvek změníte, musíte ho "chytit":

- `document.querySelector()` – Nejuniverzálnější metoda. Používá stejné selektory jako CSS (např. `.trida`, `#id`, `nav > a`).
- `document.getElementById()` – Rychlý přístup k unikátnímu prvku pomocí jeho ID.
- **Ukládání do proměnných:** Pochopení, že prvek z DOMu si uložíme do `const tlacitko = ...`, abychom s ním mohli dále pracovat.

## 2. Změna obsahu a atributů

Když už prvek máme, můžeme ho upravit:

- `.textContent` – Změna čistého textu uvnitř prvku (bezpečnější než `innerHTML`).
- `.innerHTML` – Změna obsahu včetně HTML značek (pozor na bezpečnost).
- `.src`, `.href`, `.alt` – Přímá změna atributů (např. změna obrázku nebo cíle odkazu).
- `.value` – Získání nebo nastavení hodnoty z formulářových polí (`<input>`).

## 3. Manipulace se styly a třídami

JavaScriptem měníme design za běhu:

- `.style.vlastnost` – Přímá změna CSS (např. `prvek.style.color = 'red'`). _Všimněte si: v JS se píše `backgroundColor` místo `background-color` (camelCase)._
- `.classList.add() / .remove() / .toggle()` – **Nejlepší praxe:** Místo měnění jednotlivých stylů raději přidáváme nebo odebíráme CSS třídy definované v externím souboru.

## 4. Události (Events)

Tady začíná interaktivita:

- `.addEventListener('typ', funkce)` – Metoda, která "poslouchá", co uživatel dělá.
- **Typy událostí:** `click` (kliknutí), `input` (psaní do pole), `submit` (odeslání formuláře), `mouseover` (najetí myší).
- **Anonymní funkce:** Častý zápis `tlacitko.addEventListener('click', () => { ... });`.

## 5. Vytváření a odebírání prvků

Dynamické rozšiřování stránky:

- `document.createElement('tag')` – Vytvoření nového elementu "ve vakuu".
- `.appendChild()` – Přidání nově vytvořeného prvku do stránky (např. nová položka seznamu).
- `.remove()` – Smazání prvku z dokumentu.

<br>
<br>
<br>

# Cvičení: Manipulace s DOM

## Část 1: Výběr a text

Máš v HTML tento kód: `<h1 id="nadpis">Ahoj</h1>`.
Napiš dva řádky kódu, které tento nadpis vyberou a změní jeho text na "Vítejte":

```javascript
const nadpis = document.____________________("__________");
nadpis.____________________ = "Vítejte";
```

## Část 2: Reakce na kliknutí

Doplň kód tak, aby se po kliknutí na tlačítko s třídou `.btn-zmenit` změnil barva pozadí dokumentu na červenou:

```javascript
const tlacitko = document.querySelector(".btn-zmenit");

tlacitko.addEventListener("__________", () => {
  document.body.style.____________________ = "red";
});
```

## Část 3: Práce s třídami

Máš prvek `const karta = document.querySelector(".karta");`.
Napiš kód, který této kartě **přidá** třídu `aktivni` a **odebere** třídu `skryty`:

```javascript
karta.classList.__________("aktivni");
karta.classList.__________("skryty");
```

<br>
<br>
<br>


# Klíč k řešení

### Část 1: Výběr a text

- `document.querySelector("#nadpis")` (nebo `getElementById("nadpis")`)
- `nadpis.textContent = "Vítejte";`

### Část 2: Reakce na kliknutí

- Událost: `"click"`
- Vlastnost: `backgroundColor` (pozor na velké C)

### Část 3: Práce s třídami

- `karta.classList.add("aktivni");`
- `karta.classList.remove("skryty");`
