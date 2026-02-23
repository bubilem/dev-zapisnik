# 04. Úvod do UI/UX a Responzivita

Mít dokonalý Flexbox a validní pravidla nestačí. Web musí na uživatele působit přirozeně a jednoduše. Právě o tom rozhoduje User Interface (Jak to vypadá nakódované) a User Experience (Jaký pocit web při klikání vyvolává).

Programátor, který umí kódovat, ale nerozumí základům designu, tvoří funkční, ale "ošklivé" a těžkopádné aplikace. 

> *"UI je sedlo, třmeny a otěže. UX je pocit, že ovládáte koně a jízdu si užíváte."*

## 1. Dýchající Whitespace (Bílý prostor)

Nejčastější chyba začátečníků: všechno na sebe v CSS nalepit, aby se tam toho vešlo víc. Prostor musí dýchat. Nebojte se používat odvážněji velké `marginy` a `paddingy`.
*   **Oddělování:** Pokud dvě věci spolu nesouvisí, dejte mezi ně fyzicky mezeru (margin). Pokud naopak souvisí, přisuňte je logicky k sobě. Prázdný čistý "bílý prostor" od sebe totiž odděluje obsah u čtenáře mnohem lépe a luxusněji, než jakékoli tlusté černé orámování krabiček `border`!

## 2. Typografie a Hierarchie

Základem webdesignu většinou nebývá barva, ale perfektní rozvržení textu na papíře.

*   **Hierarchie nadpisů:** H1 musí být na hlavní stránce dominantní a vizuálně na míle daleko mnohem větší, než obyčejný odstavcový text. Uživatel na moderním webu už dávno nečte od shora dolů slovo od slova – on obsah „skenuje“ očima a hledá kotvy. Veďte jeho oko.
*   **Volnost čtení řádky (Line-height)**: Defaultní prohlížečová hodnota fontu dělá z textových bloků slitou kaši, kde se oko na konci řádku ztrácí při hledání toho nového. Vždy tak pamatujte přes CSS globálně natavit minimální výšku řádků pomocí poměru: `line-height: 1.5` (nebo `1.6`).
*   **Max délka (Dálnice)**: Pokud necháte článek běžet přes fullHD monitor ze široka od okraje k okraji okna `width: 100%`, čtenářovi se ukroutí na konci monitoru hlava, než zase myší na druhé straně najde pokračování. U dlouhých článků proto raději nastavujte zlatý průměr na `max-width: 60ch` (cca 60 znaků široká obsahová zóna s vystředěním) a zbylý prostor monitoru po bocích se krásně zaplní oním kýženým prázdným místem. 

## 3. Barvy a Kontrast

Je lákavé web obarvit žlutozelenou disko párty. Designéři však sází na střídmost barevných palet. Učí se pracovat s pravidlem **60-30-10**.
   - **60 % Dominantní primární barva** (často naprosto neutrální, např. bílá/světle šedá plnící prázdný layout pozadí).
   - **30 % Sekundární doplňková** (např. elegantní tmavě modrá pro podtržení stínů u karet, textů nadpisů nebo v barvě patičky).
   - **10 % Akcentní výkřičník!!!** (naprosto kontrastní výrazná křiklavá barva, např. oranžová, která je celosítově propisována pouze v CSS identifikátorech tam, kde od uživatele něco vyžadujete – tedy pro tlačítka "Koupit", "Registrovat se" nebo varovné chybové bubliny). 

Šedý text na světlém pozadí (nebo modrý na černém) je pak absolutním **zločinem proti UX přístupnosti** (A11y z HTML kapitol) a proti čitelnosti pro zrakem hůře obdařené osoby nebo uživatele obsluhujícím mobilní weby při polední opalovačce na pláži. Každý design si proto musíte prohnat takzvaným Kontrastním validátorem podle normy WCAG AAA.

---

## Mobile First (Responzivita)

Žádný návštěvník dnes neotevírá eshopy v internetových kavárnách z počítače. Téměř 75% veškerého datového toku na webech tvoří návštěvy z chytrých mobilních telefonů na cestách. Váš CSS tak musí na telefonech reagovat na šířku.

Tomuto formátování říkáme Responzivita. Učí programátory novému paradigmatu v kódování **"Mobile First" (Nejprve Mobil)**. To znamená jediné: Celý CSS script od shora začnete rovnou psát jedině a výlučně jako optimalizovaný pro rozdrbaný drobný smartphone displej! Nic jiného vás jako programátora na první hodinu nezajímá. Vše tvoříte jako pruhy jdoucí za sebou `flex-direction: column`. Teprve když je web úchvatně hotový pro mobil, napíšete do CSS dokumentu kouzelnou klauzuli (tzv. **Media Query** naslouchající změnám obrazovky) s dotazem *„Rozšířil právě uživatel displej do tak širokého režimu, že už víme, že spolehlivě drží web v rukou z tabletu (nebo roztáhl PC aplikaci)?“*. Až teprve pod tuto závorku propíšete pozměňující styly, které z úzkého pruhu v mobilu najednou udělají 2 ikonky vedle sebe pro uvolněných prostor na tabletu.

### Oživení naslouchátka velikostí (Media Queries)
```css
/* Tímto začnu dokument a je mi všechno jedno. Pišu jen pro mobil vertikální linky! Tedy 2 články blogu nasnímám pod sebe na obrazovku*/
.clanek-grid {
   display: flex;
   flex-direction: column;
}

/* Tohle program dál načte A PROVEDE pouze v případě (přepíše chování předchozích identických tříd .clanek-grid!), pokud detekoval v rozlišení u šířky minimálně 768px bodů, a to bývá přelom telefonu s větším hraničním tabletem a monitorem!*/
@media (min-width: 768px) {
    .clanek-grid {
       flex-direction: row; 
    }
}
```
