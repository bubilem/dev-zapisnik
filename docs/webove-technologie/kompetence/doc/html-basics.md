# HTML

[Zpět na README.md](../README.md)

Chronologický seznam kompetencí pro HTML:

## 1. Koncepce a syntaxe

Než napíše student první řádek, musí rozumět mechanice jazyka:

- **Princip značkování:** Rozdíl mezi obsahem (textem) a značkou (instrukcí pro prohlížeč).
- **Anatomie elementu:** Schopnost rozlišit počáteční značku, obsah a ukončovací značku.
- **Párové vs. nepárové tagy:** Vědět, které značky se uzavírají a které ne (např. `<img>`, `<br>`).
- **Vnořování (Nesting):** Pochopení hierarchie (rodič vs. potomek) a správného pořadí uzavírání značek.

## 2. Struktura dokumentu a atributy

Každý dokument má povinnou "kostru", bez které není validní:

- **Základní šablona:** Znalost `<!DOCTYPE html>`, `<html>`, `<head>` (metadata) a `<body>` (viditelný obsah).
- **Atributy:** Pochopení, že značky mají vlastnosti ve formátu `klíč="hodnota"` (např. `id`, `class`, `src`, `href`, `alt`).
- **Sémantika:** Proč nepoužívat jen `<div>`, ale volit značky podle jejich významu (pro SEO a přístupnost).

## 3. Top 20 nejpoužívanějších značek (Must-know)

Těchto 20 prvků tvoří 90 % běžného webu. Žák by je měl umět použít bez nápovědy:

### Strukturální a sémantické

1. `<div>` – Obecný kontejner pro blokové prvky.
2. `<span>` – Obecný kontejner pro řádkové (inline) prvky.
3. `<header>` – Hlavička stránky nebo sekce.
4. `<main>` – Hlavní, jedinečný obsah stránky.
5. `<footer>` – Patička stránky.
6. `<section>` – Logický oddíl dokumentu.
7. `<nav>` – Navigační oblast.

### Textové

8. `<h1>` až `<h6>` – Nadpisy (s důrazem na to, že `<h1>` je na stránce jen jednou).
9. `<p>` – Odstavec textu.
10. `<a>` – Odkaz (včetně atributu `href`).
11. `<ul>` a `<li>` – Nečíslovaný seznam a jeho položky.
12. `<ol>` – Číslovaný seznam.
13. `<strong>` – Důležitý text (tučné písmo).
14. `<em>` – Zdůrazněný text (kurzíva).

### Multimediální a interaktivní

15. `<img>` – Obrázek (atributy `src` a `alt`).
16. `<table>`, `<tr>`, `<td>` – Základy tabulek (řádky a buňky).
17. `<form>` – Definice formuláře.
18. `<input>` – Vstupní pole (typy: text, email, password, checkbox).
19. `<button>` – Tlačítko pro odeslání nebo akci.
20. `<br>` – Zalomení řádku (používat střídmě).

## Co by měl žák "vidět" v hlavě?

Když se žák podívá na jakýkoliv web (např. web školy, instagram...), měl by být schopen ho mentálně "rozřezat" na HTML značky. Měl by vidět, že menu je `<nav>`, hlavní článek je `<article>` a odkaz je `<a>`.

<br>
<br>
<br>

# Cvičení: Základy HTML

Tento pracovní list prověří tvé znalosti struktury, syntaxe a nejpoužívanějších HTML značek.

## Část 1: Teorie a syntaxe

_Doplňte nebo vyberte správnou odpověď._

1. **Vysvětlete jednotlivé části zápisu:**
   `<p class="text">Ahoj světe!</p>`

- `p` je: __________
- `class` je: __________
- `"text"` je: __________
- `</p>` je: __________

2. **Který symbol se používá pro označení ukončovací značky (např. u párového elementu)?**
   a) `\`
   b) `/`
   c) `!`
3. **Vysvětlete rozdíl mezi značkou `<head>` a `<body>`:**

## Část 2: Identifikace značek

_Přiřaďte správnou HTML značku k jejímu účelu:_

| Účel značky                         | Odpovídající HTML tag |
| ----------------------------------- | --------------------- |
| Nejdůležitější nadpis na stránce    |                       |
| Hypertextový odkaz na jinou stránku |                       |
| Vložení obrázku                     |                       |
| Položka v seznamu                   |                       |
| Hlavní navigační menu               |                       |
| Obecný kontejner (blokový)          |                       |
| Odstavec textu                      |                       |

## Část 3: Analýza kódu

_Podívej se na následující ukázku kódu a najdi v ní **3 chyby**, které brání tomu, aby byl kód správný:_

```html
<!DOCTYPE html>
<html>
<head>
    <title>Moje stránka</title>
</head>
<body>
    <h1>Vítejte na webu
    <p>Toto je můj první pokus o HTML. <br> Baví mě to.</p>
    <img src="foto.jpg" alt="Moje fotka">
    <a href="https://google.com">Odkaz na Google<a>
</body>
</html>

```

1. Chyba: \_\_\_\_\_\_\_\_\_\_

2. Chyba: \_\_\_\_\_\_\_\_\_\_

3. Chyba: \_\_\_\_\_\_\_\_\_\_

## Část 4: Praktický úkol

_Napište HTML kód pro jednoduchý seznam vašich tří nejoblíbenějších jídel. Seznam musí být nečíslovaný._

```html

```

<br>
<br>
<br>

# Klíč k řešení

### Část 1: Teorie a syntaxe

1. `p` = název značky (tag), `class` = název atributu, `"text"` = hodnota atributu, `</p>` = ukončovací značka.
2. b) `/`
3. `<head>` obsahuje metadata a informace pro prohlížeč (nejsou vidět přímo na stránce), `<body>` obsahuje veškerý viditelný obsah pro uživatele.

### Část 2: Identifikace značek

- Nejdůležitější nadpis: `<h1>`
- Odkaz: `<a>`
- Obrázek: `<img>`
- Položka seznamu: `<li>`
- Navigace: `<nav>`
- Kontejner: `<div>`
- Odstavec: `<p>`

### Část 3: Analýza kódu (Chyby)

1. Chybějící ukončovací značka `</h1>` (nadpis nebyl uzavřen).
2. **Chybně zapsaná ukončovací značka odkazu** (`<a>` místo `</a>`).
3. **Logická chyba/Sémantika:** Vnoření odstavce `<p>` do neuzavřeného nadpisu `<h1>` (v rámci opravy chyby č. 1).

### Část 4: Praktický úkol

```html
<ul>
  <li>Svíčková</li>
  <li>Pizza</li>
  <li>Sushi</li>
</ul>
```
