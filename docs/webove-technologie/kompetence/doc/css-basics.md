# Základy CSS

[Zpět na README.md](../README.md)

Chronologický seznam kompetencí pro CSS (Kaskádové styly, Cascading Style Sheets):

## 1. Koncepce a připojení

Žák musí vědět, kde se styl bere a jak ho prohlížeč interpretuje:

- **Způsoby připojení:** Rozdíl mezi inline stylem (v atributu), `<style>` v hlavičce a (nejdůležitějším) **externím souborem** pomocí `<link>`.
- **Princip kaskády (Cascading):** Jak prohlížeč řeší konflikty (např. když jsou pro jeden text definovány dvě různé barvy).
- **Dědičnost:** Které vlastnosti se přenášejí z rodiče na potomka (např. barva textu) a které ne (např. rámeček).

## 2. Syntaxe a Selektory

Základní gramatika, bez které kód nebude fungovat:

- **Anatomie pravidla:** `selektor { vlastnost: hodnota; }`. Důraz na složené závorky, dvojtečku a středník.
- **Základní selektory:**
- **Tag (typ):** `p`, `h1`, `div` (ovlivní všechny prvky daného typu).
- **Třída (Class):** `.moje-trida` (nejpoužívanější, začíná tečkou).
- **ID:** `#moje-id` (unikátní prvek, začíná mřížkou).

- **Kombinátory:** Vnořování (např. `nav a` vybere odkazy pouze uvnitř navigace).
- **Pseudo-třídy:** Změna stavu, zejména `:hover` (přejetí myší), `:focus` nebo `:nth-child()`.

## 3. Barvy, Jednotky a Boxmodel

Pochopení toho, jak prohlížeč počítá prostor:

- **Barvy:** Jména (`red`), HEX (`#ff0000`), RGB (`rgb(255, 0, 0)`) a RGBA pro průhlednost.
- **Jednotky délky:** \* Absolutní: `px` (pixely).
- Relativní: `em`, `rem` (vazba na velikost písma) a `%`, `vh`, `vw` (vazba na velikost okna).

- **Box Model (Klíčová kompetence):** Rozdíl mezi `content`, `padding` (vnitřní okraj), `border` (rám) a `margin` (vnější okraj).

## 4. Top 20 nejpoužívanějších vlastností

Tento seznam musí mít žák v "malíku", aby mohl tvořit moderní weby:

### Text a Písmo

1. `color` – Barva textu.
2. `font-size` – Velikost písma.
3. `font-family` – Typ písma (font).
4. `font-weight` – Tloušťka písma (bold).
5. `text-align` – Zarovnání textu (left, center, right).
6. `text-decoration` – Dekorace (např. odstranění podtržení u odkazů).
7. `line-height` – Výška řádku (pro lepší čitelnost).

### Pozadí a Rámečky

8. `background-color` – Barva pozadí.
9. `background-image` – Obrázek na pozadí.
10. `border` – Zkratka pro šířku, styl a barvu rámečku.
11. `border-radius` – Zaoblení rohů.

### Box Model a Rozvržení (Layout)

12. `width` / `height` – Šířka a výška.
13. `margin` – Vnější okraj.
14. `padding` – Vnitřní okraj.
15. `display` – Nejdůležitější vlastnost (`block`, `inline`, `inline-block`, `flex`, `none`).
16. `position` – Pozicování (`static`, `relative`, `absolute`, `fixed`).
17. `box-sizing` – Nastavení výpočtu velikosti (doporučeno `border-box`).

### Flexbox (Základy moderního layoutu)

18. `flex-direction` – Směr toku prvků.
19. `justify-content` – Zarovnání v hlavní ose.
20. `align-items` – Zarovnání v příčné ose.

## Co by měl žák "cítit"?

U CSS žák nesmí bojovat s tím, proč se mu dva prvky "lepí" na sebe (nepochopení margin/padding) nebo proč mu prvek zmizel (nepochopení display/position).


<br>
<br>
<br>

# Cvičení: Základy CSS

Toto cvičení prověří tvou schopnost vybírat prvky (selektory), pracovat s barvami, jednotkami a rozumět tomu, jak prvky zabírají místo na stránce.

## Část 1: Syntaxe a selektory

_Představ si, že máš v HTML následující kód:_

```html
<nav id="hlavni-menu">
  <a href="#" class="odkaz aktivni">Domů</a>
  <a href="#" class="odkaz">Produkty</a>
</nav>
```

**Napiš CSS selektor, který vybere:**

1. Všechny značky `<a>`: __________
2. Pouze prvek s ID `hlavni-menu`: __________
3. Všechny prvky s třídou `odkaz`: __________
4. Pouze odkaz, který má zároveň třídu `aktivni`: __________
5. Všechny odkazy, které jsou uvnitř navigace: __________

## Část 2: Box Model (Teorie i výpočet)

_Doplňte nebo vypočítejte._

1. Která vlastnost vytváří **prostor uvnitř** prvku (mezi obsahem a rámečkem)? __________
2. Která vlastnost vytváří **prostor vně** prvku (odsazení od ostatních prvků)? __________
3. **Výpočet:** Máš prvek `<div>`. Má nastaveno:
   `width: 200px;`, `padding: 20px;`, `border: 5px solid black;`.
   Pokud je `box-sizing: content-box;`, jaká bude **celková šířka** prvku v px? __________

## Část 3: Barvy a jednotky

1. **Převeď zápis barvy:** Jak zapíšeš černou barvu pomocí HEX kódu? __________
2. **Průhlednost:** Který barevný model (zkratka) umožňuje nastavit průhlednost? __________
3. **Jednotky:** Jaký je rozdíl mezi `px` a `rem`?

## Část 4: Analýza a oprava kódu

_V následujícím CSS kódu jsou **3 chyby** (syntaktické nebo logické). Najdi je:_

```css
/* Styl pro hlavní nadpis */
.h1 {
    color = blue;
    font-size: 24px
    margin-top: 10px;
}

/* Styl pro tlačítko při najetí myší */
.button-super:hover [
    background-color: #ff0000;
]

```

1. Chyba: __________
2. Chyba: __________
3. Chyba: __________

## Část 5: Praktický úkol

_Napiš CSS pravidlo pro třídu `.karta`, která bude mít: tmavě šedé pozadí, bílý text, vnitřní odsazení 15px a zaoblené rohy 10px._

```css
/* Zde napiš svůj kód */
```


<br>
<br>
<br>

# Klíč k řešení

### Část 1: Selektory

1. `a` (selektor tagu)
2. `#hlavni-menu` (selektor ID)
3. `.odkaz` (selektor třídy)
4. `.odkaz.aktivni` (spojené třídy bez mezery)
5. `nav a` (potomek) nebo `id="hlavni-menu" a`

### Část 2: Box Model

1. `padding`
2. `margin`
3. **250px** (200 + 20 zleva + 20 zprava + 5 zleva + 5 zprava).

### Část 3: Barvy a jednotky

1. `#000000` (nebo zkráceně `#000`)
2. `rgba` (a = alpha kanál)
3. `px` je fixní (pixel), `rem` je relativní k velikosti písma kořenového elementu (html).

### Část 4: Analýza kódu (Chyby)

1. **Špatné přiřazení:** V CSS se nepoužívá `=`, ale dvojtečka (`color: blue;`).
2. **Chybějící středník:** Za `24px` chybí středník, což zastaví čtení dalších vlastností.
3. **Špatné závorky:** U `.button-super:hover` jsou použity hranaté závorky `[]` místo složených `{}`.
   _(Bonusová chyba: Selektor `.h1` hledá třídu, ale nadpis je většinou jen tag `h1` bez tečky)._

### Část 5: Praktický úkol

```css
.karta {
  background-color: #333; /* nebo darkgray */
  color: white;
  padding: 15px;
  border-radius: 10px;
}
```
