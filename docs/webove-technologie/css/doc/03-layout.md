# 03. Oživení stránek: Layout a pozicování

Ve chvíli, kdy rozumíte rámečkům a okrajům (Box Model) začnete skládat vizuál celého webu. Zde ale přichází největší bolest pro začátečníky. Jak to, že mi občas nadpis sebere celý řádek jen pro sebe a jindy se tlačítko s obrázkem postaví rovnou vedle sebe?

## Přirozený tok dokumentu (Document Flow)

Prohlížeč od shora dolů čte stránku a cokoliv najde, rovnou sází na sebe tak, jak to přišlo po ruce.

### Blokové prvky (Block)
Roztáhnou se vždy na celou dostupnou šířku svého obalu `width: 100%` a nedovolí nikomu cizímu, aby se postavil vedle nich. Vždy tedy automaticky začínají a končí na novém vlastním řádku.
*Příklady: `<p>`, `<h1>`, `<div>`, `<section>`*

### Řádkové prvky (Inline)
Nerespektují rozměry `width` a `height` shora ani okraje marginu. Budou vždy obalovat jen tužitě přesně svůj vnitřní texťák a ochotně se seskládají těsně vedle sebe zleva doprava jako slova na řádku papíru.
*Příklady: `<span>`, `<a>`, `<strong>`, `<img/>`*

V CSS můžete tento přirozený stav pochopitelně přepsat magickou vlastností a tak donutit odkazový čudlík brát plný rozměr na mobilu!
`display: block;` (donutí prvek chovat se jako blok).

---

## Pozicování (Positioning) – Letci mimo dokument

Někdy potřebujete prvek na stránce „vytrhnout“ z tohoto běžného toku. Třeba plovoucí chatovací okénko vpravo dole, vyskakovací menu nebo roletku přes fotku. Přesně k tomu slouží vlastnost `position:` a její souřadnice `top`, `bottom`, `left`, `right`.

1. **`position: static;`** (Výchozí): Prvek sedí naprosto poslušně ve svém bloku v toku stránky spolu s ostatními.
2. **`position: relative;`**: Chová se úplně stejně jako static *(nevidíte nejprve rozdíl)*. Pokud mu ale teď dáte povel zleva se posuň o 20px (`left: 20px`), prvek se utrhne a plachtí na svém místě vzduchem jako duch, ovšem místo po něm **na původní židličce dole v DOMU zůstane u ostatních bloků reálně prázdné započtené a rezervované pro něj**. Zároveň tím poslouží jako "hraniční klec", pro ostatní vnořené potomky (velmi důležité!).
3. **`position: absolute;`**: Prvek kompletně vyletí nad stránku jako dron. Procházející html elementy pod ním ho propletou a zacelí díru po něm jako by nikdy neexistoval. Začne létat neomezeně nad cizím kódem, dokud ho nevycentrujeme zleva (`left: 50px`). Souřadnice ovšem nečerpá vůči původní židličce jako předchozí relative, ale **vůči nejbližšímu možným rodičovskému obalu s `position: relative`**. Pokud nemá rodiče, bude létat dle samotné `<body/html>` skořápky okna nahoru v prohlížeči.
4. **`position: fixed;`**: Stejné jako absolute, akorát letí navzdory všeho a je přilepené hřebíky **vždy přímo na obrazovce našeho monitoru nezávisle na rolování myši diváka pod ním**. *Klasicky cookie lišta naspodu nebo postranní menu webu.*

> [!TIP]
> **Vrstvy a přeskakování (Z-Index)**
> Pokud vám občas přes letící horní menu proletí v okně rolující se text článku ze spodku (tzv letí nad ním i když neměl), nastavte vždy letícím elementům zvenku výškovou hloubku pomocí vlastnosti číslice např.: `z-index: 10`.

---

## Moderní flexibilní layouty

Do roku 2010 to bylo peklo. Vytvořit dva bloky vedle sebe znamenalo kouzlit se `float: left` a matematicky počítat desetinná místa v procentech, zatahovat se do clearů a potit krev při výpočtu okrajů. Pak přišla revoluce pojmenovaná **Flexbox** a později **Grid**.

### Flexbox (Běžící linka v továrně)
Většinou řeší rozložení prvků **v jedním směru** (v jedné dimenzi osy) – buď do řádku vedle sebe (jako krabice na běžícím pásu továrny) nebo srovnané rovně na sebe do sloupce ze shora dolů.

Flexbox musíte vždy „zapnout“ u Obalového rodiče (Roury), do které ty kontejnery cpete.
```css
/* Toto je rodič / Hlavní hala */
.kontejner-menu {
    display: flex;             /* Tím oživne flexbox pro děti unitř (samotná tlačítka a odkazy v něm rázem poletí vedle sebe jako bloky zleva do prava na řádce!) */
    flex-direction: row;       /* To je na lince výchozí, ale mohli byste uvést 'column', pak by se zas sesypaly pod sebe dolů */
    justify-content: space-between;  /* Jak rozházíš krabice po délce (Hlavní ose)? Odsuň je naprosto do rohů proti sobě u oken! (vloží jim mezeru mezi levé <a>logo a pravé odkazové bloky domů menu) */
    align-items: center;       /* A vertikálně (Příčná osa) se chytněte u obrysu krabic za ruce přesně na středu roury */
    flex-wrap: wrap;           /* A Pokud po kraji přejedete monitor z telefonu s myší, a zmenšíte to menu tak, že se tam ty čudle nebudou moci vejít, prosím, "spadněte" jako krabice a zalomte mi novou linků řádky dospod.*/
}
```

### CSS Grid (Kancelářské kóje / Celé plochy)
Kým je Flexbox běhací linkou v jednom tahu (vodorovně nebo svisle), pak **CSS Grid** je vládce celé 2D šachovnice (řad i sloupců najednou).
Nasazuje se typicky na rozebrání samotného prázdného listu celého webu do šablony. (například na rozříznutí Layoutu: kde vlevo je navigační hlavička, vpravo box s textem článku blogu a naspodu patička `<footer>`).

> [!NOTE]
> *Není jedno lepší než druhé. Správný postup je: Pro hrubou kostru celého listu naklepeme Grid o pár řádcích (šachovnice článků s fotkami). Ale když vstoupíme dovnitř karet k formátování ikon a řádek jmen a hvězdiček, otevíráme drobný lokální detail a v něm zapínáme k doladění oblíbený Flexbox!*
