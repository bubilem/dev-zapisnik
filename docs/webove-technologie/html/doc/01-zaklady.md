# HTML: Architektura, pravidla a DOM

HTML (HyperText Markup Language) není programovací jazyk v pravém slova smyslu, ale **značkovací jazyk**. Slouží k popisu struktury webové stránky – definuje, co je nadpis, co odstavec, kde je obrázek a odkud kam vede odkaz.

## Základní struktura dokumentu

Každý HTML dokument (typicky soubor s příponou `.html`) musí mít určitou předepsanou strukturu, aby mu prohlížeč rozuměl.

```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moje první stránka</title>
</head>
<body>
    <h1>Základy HTML</h1>
    <p>Tohle je můj úplně první odstavec na webu.</p>
</body>
</html>
```

*   `<!DOCTYPE html>`: Deklarace typu dokumentu. Říká prohlížeči: „Tohle je moderní dokument v HTML5“.
*   `<html>`: Kořenový prvek, do kterého se balí úplně vše. Atribut `lang="cs"` definuje, že text bude česky.
*   `<head>`: Hlavička. Zde se nachází „neviditelná“ metadata – název stránky, kódování znaků, linky na styly (CSS) atd.
*   `<body>`: Tělo. Sem patří vše, co reálně uvidí uživatel v okně prohlížeče.

## Architektura a syntaxe značky

Stavebním kamenem HTML je **značka (tag)**. Většina značek je **párová**, což znamená, že mají svou otevírací a zavírací část obalující vlastní obsah.

### Párové značky

```html
<nazev_znacky atribut="hodnota">...obsah značky...</nazev_znacky>
```
*Příklad:* `<p class="dulezite">Text odstavce.</p>`

*   **Otevírací část**: `<p>`
*   **Zavírací část**: `</p>` (obsahuje lomítko navíc)
*   **Atributy**: Vkládají se do otevírací značky a nastavují dodatečné vlastnosti. Zde `class="dulezite"`.

### Nepárové značky (void elements)

Některé značky nepotřebují obalovat obsah, plní funkci samy o sobě (třeba obrázek nebo zalomení řádku).
*Příklady:* `<img src="obrazek.jpg" alt="Popis">`, `<br>`, `<hr>`

> [!TIP]
> Ve starším XHTML bylo povinné nepárové značky explicitně ukončovat lomítkem (např. `<br />`). V dnešním HTML5 už to není nutné.

## Pravidla vnořování a stromová struktura

V HTML platí přísná hierarchie. Značky můžeme vkládat do jiných značek (tzv. **vnořování** čili *nesting*). Tím vzniká struktura předka (parent) a potomka (child).

**Základní pravidlo:** Značka, která byla otevřena jako poslední, se musí jako první zavřít (tzv. LIFO – Last In, First Out). Značky se nesmí „křížit“.

```html
<!-- SPRÁVNĚ (značka b je kompletně uzavřená uvnitř p) -->
<p>Tohle je velmi <b>důležité</b> číslo.</p>

<!-- ŠPATNĚ (značky p a b se kříží) -->
<p>Tohle je velmi <b>důležité</p> číslo.</b>
```

Navíc existují logická pravidla specifikovaná standardem W3C. Například: Neměli byste vkládat blokový prvek (třeba `<div>`) dovnitř řádkového prvku (třeba `<span>`). Obdobně odstavec `<p>` nesmí obsahovat jiný blokový prvek.

## DOM (Document Object Model)

Když prohlížeč stáhne váš `.html` soubor (což je jen hromada textu), zanalyzuje jej a vytvoří v paměti datovou strukturu jménem **DOM**.

DOM představuje vaši stránku jako obrovský strom objektů (tzv. uzlů neboli *nodes*).

1.  Na samotném vrcholu (kořen stromu) je uzel `<html>`.
2.  Z něj jako větve vycházejí `head` a `body`.
3.  Z `body` dále vycházejí jako další uzly všechny vaše nadpisy, `div`y, odstavce atd.

**Proč na tom záleží?**
Protože JavaScript! Když v JavaScriptu pomocí příkazů jako `document.getElementById('titulek')` modifikujete stránku, neupravujete na disku původní HTML zdroják, ale přímo tento živý DOM strom v paměti prohlížeče.

## Validita kódu

Napsat částečně špatné HTML se zdá být snadné. Rozdělání značky `<h1>` a nezavření jí `</h1>` by ve světě C++ nebo Javy způsobilo okamžitý pád celé aplikace. HTML prohlížeče jsou však navrženy tak, aby byly extrémně „shovívavé“ a chyby odpouštěly. Prohlížeč se sám pokusí vaši chybu potichu zalepit.

To může vést k obrovským vizuálním problémům (zejména v CSS nebo při načítání dat JS scripty), o kterých se ani nedozvíte.

> [!IMPORTANT]
> Vždy ověřujte validitu svého kódu proti oficiálnímu standardu! Používejte k tomu validátor od konsorcia W3C: **[validator.w3.org](https://validator.w3.org/)**
