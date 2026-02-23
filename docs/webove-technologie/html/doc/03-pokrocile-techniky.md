# Pokročilé techniky HTML: A11y, SEO, Graph Data a Custom data atributy

I když se může zdát psaní HTMl docela primitivní a jasné odvětví, oddělují ty nejlepší Webaře od průměrných znalosti drobných funkčních technik zasahujících do celého ekosystému sítě. Nejde totiž jen o napsání webu pro zdravého člověka se zrakem před monitorem. Jak říkají best practice — web čtou kromě lidí také tísíce různých strojů, vyhledávačů, botů a nástrojů.

## 1. Přístupnost (A11y - Accessibility)
Zpřístupnění webu uživatelům nehledě na jejich tělesné, vizuální, paměťové i technické limity (handicap). Nejznámější formou poškození je poškození zraku nebo pohybového aparátu. Uživatelé pak často surfují se **čtečkami obrazovky (screen readers)** a ovládají vše **pouze klávesnicí**.

### Dobré praktiky (Best practice) v přístupnosti:
*   **Hierarchie nadpisů**: Využívejte všechny `<h1>` až `<h6>` logicky a neskákejte v nich. Netvořte obří text velkým `<b>`, jen protože se tak chová CSS.
*   **Alternativní text u obrázků (`alt="popis"`)**: Každý `<img />` by ho měl mít a to nikoli slovo "obrazek1", ale popsat to, "co slepý uživatel přichází na snímku odepřením zraku".
*   **Sémantické weby**: Prohlížeče preferují značky `<button>`, `<dialog>` nebo `<nav>` místo tisíce nastylovaných klikatelných `<div>`.
*   **Role (ARIA atributy)**: Přístupnostní ARIA (*Accessible Rich Internet Applications*). Tam, kde obyčejné sémantické tvary nepomohou (např. rozevírací mega menu nebo záložky), přidáváte role (např. `role="tab"`, `aria-hidden="true"`, `aria-expanded="false"`, `aria-live="polite"`).

## 2. SEO (Search Engine Optimization)
Nejde úplně ovlivnit pozici Google algoritmu pomocí HTMl tagů, ale velmi rychle umíte Google „naštvat“ a zakázat si vůbec vstup do listů.

*   `title` je to hlavní: Pokud nemáte unikátní značku `<title>` uvnitř `<head>`, jste neviditelní.
*   `meta description`: Měl by existovat na každé URL a odlišovat se. Atribut `<meta name="description" content="..." />`. Slouží ke shrnutí u vyhledávačích zobrazení.
*   `robots`: Roboti procházející obsah od Google (nebo Seznamu) mohou narazit na: `<meta name="robots" content="index, follow" />` (projděte náš web). Další velmi oblíbená varianta k testovacích sekci je parametr `noindex`, tedy zrušení zápisu vyhledání (typicky pro staging verze).
*   **Sitemap a Hreflang**: `<link rel="alternate" hreflang="en" href="..." />` v případě multilingválních překladů webu. Na sitemap xml odkazují vyhledávače.

## 3. Social Data / Open Graph (Pro sdílení textu)
Když kamarádovi vyhodit adresu do Facebook messengeru či WhatsAppu a ten zobrazí krásnou náhledovou fotku s velkým nadpisem článku – je to vlivem implementace speciálních **meta tagů Open Graph** a Twitter (X) cards.

```html
<head>
  <!-- Zobrazení náhledu u odkazů převážně ve vrstvách Mety (Facebook, IG, atp...)-->
  <meta property="og:title" content="Otevřel bych si raději čipkovaný salám pro kočky." />
  <meta property="og:description" content="Není moc věcí s příchutí mořských plodů..." />
  <meta property="og:image" content="https://nekde.cz/moje/nahledovka.jpg" />
  <meta property="og:url" content="https://nekde.cz" />
  <!-- A ten samý formát např. pro Twitter/X zprávu -->
  <meta name="twitter:card" content="summary_large_image">
</head>
```

Tím zajistíme, aby se odkaz nesdílel naslepo v aplikacích, ale plný informací.

## 4. Custom `data-*` atributy
HTML nám dovoluje vymyslet si zcela jakékoliv neznámé tagové vlastnosti pro naše prvky, ale pro zvalidování bychom měli přikládat speciální formát `data-název`.
Nijak s vizualizací sami nehnou a Google o nich neví.
Umožňují ale **vkládat si skrytě jakákoli „klientská JavaScript data“ neviditelně rovnou do HTML (k frontendu)** z backendu systému. Javascript si pak už umí `data-` parametry pohodlně najít a zpracovávat události s objektem.

*Až se podíváme na JavaScript pole, můžete s danou položkou provádět event listener operace...*

```html
<!-- Server poslal 2 uživatele z DB, do id si označil primery keys. V CSS neovlivní -->
<ul>
   <li data-user-id="1" data-role="admin">Martin Z.</li>
   <li data-user-id="2" data-role="editor">Filtr V.</li>
</ul>
```
