# Přehled používaných HTML značek a sémantika

Jazyk HTML existuje už celá desetiletí. Z původní hrstky značek určených ke strukturování černobílých fyzikálních textů se v době HTML5 rozrostl na stovky různých elementů. Zde je výběr těch nejpoužívanějších.

## Text a struktura dokumentu

Základní formátování textového obsahu uvnitř `<body>`.

*   `<h1>` až `<h6>`: Nadpisy. `<h1>` by měl být na stránce ideálně pouze jeden jako hlavní titulek.
*   `<p>`: Běžný odstavec (*paragraph*).
*   `<strong>` a `<b>`: Zápis tlustého písma. `<strong>` nese i významové **zdůraznění**, kdežto `<b>` (*bold*) je spíše jen vizuální změna. Podobně to platí i pro kurzívu u `<em>` a `<i>`.
*   `<br>`: Vynucené zalomení řádku (nepárová značka).
*   `<hr>`: Vodorovná oddělovací čára, tematický přelom (nepárová značka).
*   `<blockquote>`: Delší citace (odsazený blok textu). Krátká inline citace je `<q>`.

## Odkazy a média

*   `<a>`: Hypertextový odkaz (*anchor*). Extrémně důležitý element. Zásadní atribut `href` říká, kam se po kliknutí půjde.
    *   *Příklad:* `<a href="https://example.com" target="_blank">Odkaz otevře nový panel</a>`
*   `<img>`: Obrázek. Nutně vyžaduje atribut `src` (cesta) a v rámci přístupnosti `alt` (textová alternativa).
*   `<audio>` a `<video>`: Přímé vložení multimediálních prvků do stránky. Může obsahovat atributy jako `controls` či `autoplay`. Místo cesty (`src`) se často dovnitř vnořuje přes `<source>`.

## Odstavcové a řádkové kontejnery (`div` vs `span`)

Web z počátku 21. století stál a padal s elementem `<div>`. Dnes jde pořád o jeden z nejpoužívanějších tagů, ale používá se mnohem uváženěji.

*   `<div>`: Slouží jako bezesmyslný **blokový** kontejner pro logické seskupení prvků, často na něj věšíme CSS styly a třídy. Zalomí se za sebou (nový řádek).
*   `<span>`: Stejně bezesmyslný prvek jako `div`, ale určený čistě **pro řádkové inline** vnoření uvnitř textu (barva části slova apod.). Nevytvoří nový řádek.

## Tabulky a Seznamy

*   `<ol>` a `<ul>`: Seznamy.
    *   `<ol>` tvoří číslovaný seznam (1, 2, 3...)
    *   `<ul>` (*unordered list*) tvoří seznam s odrážkami
    *   Skutečné položky seznamu obaluje značka `<li>` (*list item*).
*   `<table>`: Tabulka.
    *   `<tr>`: Řádek (*table row*).
    *   `<th>`: Zvýrazněná hlavičková buňka (*table header*).
    *   `<td>`: Běžná datová buňka se zájmem.

## Formuláře

Slouží k interakci uživatele a odesílání dat.

*   `<form>`: Obaluje kompletně celý formulář a říká se mu „tudyma uživatel bude odesílat data“.
*   `<input>`: Hlavní pracovní prostředek formuláře s nespočtem variant definovaných atributem `type` (`text`, `password`, `email`, `radio`, `checkbox`, `submit`, `date`...).
*   `<textarea>`: Textové pole pro psaní odstavců a zpráv.
*   `<select>` a `<option>`: Rozevírací seznam a jeho položky (tzv. combobox).
*   `<button>`: Klikatelné tlačítko.
*   `<label>`: Popisek patřící ke konkrétnímu políčku. Váže se atributem `for` na unikátní `id` políčka, a po kliknutí na popisek tak automaticky označí políčko (velmi dobré pro mobilní telefony!).

---

## Éra HTML5: Sémantické značky

Po letech `<div>`ové nadvlády (tzv. divitida) přišlo HTML s novými „sémantickými“ pojmy. Tyto značky dělají vizuálně úplně to samé, co obyčejný div.
Mají ovšem v sobě obsaženou informaci **„co konkrétně v té části stránky vlastně je“**, což extrémně pomáhá čtečkám, vyhledávačům i ostatním vývojářům, kteří váš kód čtou.

*   `<header>`: Hlavička stránky nebo bloku.
*   `<nav>`: Navigační oblasti (hlavní menu stran).
*   `<main>`: Místo s hlavním a důležitým obsahem. Ideální prvek k optimalizaci pro čtečky zraku.
*   `<article>`: Nezávislá samostojící část stránky. Příklad pro příspěvek na blogu nebo komentář.
*   `<section>`: Tematické části spojené na jedné stránce pod jedním nadpisem (často používané pro „naše služby“, „kontakty“...).
*   `<aside>`: Postranní panel s informacemi, které přímo nesouvisí s tokem vlastního textu, např. reklamy či štítky úzce souvisejících okruhů.
*   `<footer>`: Patička stránky obsahující často copyright atd.

---

## Demo: Struktura moderního článku
Ukázka praktického složení sémantických značek za účelem vytvoření přehledného a přístupného blogového příspěvku.

```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <title>Můj první článek na blogu</title>
</head>
<body>

    <!-- Hlavní hlavička celého webu -->
    <header>
        <h1>Vesmírný Vývojář</h1>
        <nav>
            <ul>
                <li><a href="/">Domů</a></li>
                <li><a href="/o-mne">O mně</a></li>
                <li><a href="/kontakt">Kontakt</a></li>
            </ul>
        </nav>
    </header>

    <!-- Hlavní a jedinečný obsah stránky -->
    <main>
        <article>
            <header>
                <h2>Jak jsem objevil HTML5</h2>
                <p>Napsáno <time datetime="2026-02-23">23. února 2026</time> autorem <strong>Karel Kodér</strong></p>
            </header>
            
            <section>
                <h3>První setkání se sémantikou</h3>
                <p>Když jsem poprvé viděl značku <code>&lt;article&gt;</code>, změnil se můj svět. Najednou už vše nebylo jen o hromadě bezejmenných divů poskládaných přes sebe.</p>
                <img src="img/radost.jpg" alt="Vývojář radostně zvedá ruce k nebesům po úspěšné validaci">
            </section>
            
            <section>
                <h3>Co jsem se naučil</h3>
                <ul>
                    <li>Struktura dává smysl vyhledávačům.</li>
                    <li>Slepí uživatelé z ní těžce profitují.</li>
                    <li>Kód se po sobě daleko lépe čte.</li>
                </ul>
            </section>

            <footer>
                <p>Zařazeno v kategorii: <a href="/kategorie/web">Web</a></p>
            </footer>
        </article>
        
        <!-- Boční nesouvisející panel (aside) -->
        <aside>
            <h3>Související články</h3>
            <ul>
                <li><a href="/kaskadove-styly-uvod">Úvod do CSS</a></li>
                <li><a href="/javascript-pro-zacatecniky">JS pro začátečníky</a></li>
            </ul>
        </aside>
    </main>

    <!-- Patička webu -->
    <footer>
        <p>&copy; 2026 Vesmírný Vývojář. Všechna práva vyhrazena.</p>
    </footer>

</body>
</html>
```
