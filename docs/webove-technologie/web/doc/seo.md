# SEO – Optimalizace pro vyhledávače

**SEO** (Search Engine Optimization) je soubor technik, jejichž cílem je dosáhnout co nejvyššího umístění webové stránky ve výsledcích vyhledávání (SERP – Search Engine Results Page) pro relevantní klíčová slova. Jde o kombinaci technické optimalizace, kvalitního obsahu a budování důvěryhodnosti.

## Jak fungují vyhledávače

1. **Crawling** – Robot (crawler, „pavouk") prochází web a stahuje stránky skrze odkazy.
2. **Indexace** – Obsah stránek je uložen do databáze (indexu) a analyzován.
3. **Ranking** – Algoritmus seřadí výsledky podle relevance a kvality (Google používá stovky signálů).

> Nejdůležitějším faktorem rankingu je **relevance obsahu** v kombinaci s **autoritou domény** (počet a kvalita zpětných odkazů).

---

## On-page SEO

On-page SEO zahrnuje vše, co upravujete přímo ve zdrojovém kódu nebo obsahu stránky.

### Title tag

`<title>` je nejdůležitější on-page SEO prvek. Zobrazuje se jako nadpis výsledku ve vyhledávači.

```html
<head>
  <!-- Optimální délka: 50–60 znaků -->
  <title>Kurz HTML pro začátečníky | Web Academy</title>
</head>
```

Pravidla:
- Každá stránka musí mít **unikátní** title.
- Klíčové slovo dejte **co nejblíže začátku**.
- Délka: 50–60 znaků (delší text Google ořízne).

### Meta description

Popisný text zobrazovaný pod nadpisem ve výsledcích hledání. Přímo neovlivňuje ranking, ale zásadně ovlivňuje míru prokliků (CTR).

```html
<head>
  <!-- Optimální délka: 150–160 znaků -->
  <meta
    name="description"
    content="Naučte se HTML od základů. Praktický kurz s příklady,
    kvízy a projekty. Vhodné pro úplné začátečníky bez předchozích znalostí.">
</head>
```

### Kanonická URL

Zabraňuje duplicitnímu obsahu – říká Googlu, která verze URL je „ta pravá".

```html
<head>
  <!-- Sděluje, že tato stránka je kanonická verze -->
  <link rel="canonical" href="https://www.example.com/kurz-html/">
</head>
```

Bez kanonické URL může Google považovat tyto adresy za duplicitní:
- `https://example.com/kurz-html`
- `https://example.com/kurz-html/`
- `https://www.example.com/kurz-html`
- `https://example.com/kurz-html?zdroj=newsletter`

---

## Struktura nadpisů

Správná hierarchie nadpisů pomáhá jak uživatelům, tak vyhledávačům porozumět struktuře obsahu.

```html
<h1>Kurz HTML pro začátečníky</h1>   <!-- Jeden h1 na stránku! -->

  <h2>Proč se učit HTML</h2>
    <h3>HTML jako základ webu</h3>
    <h3>Uplatnění na trhu práce</h3>

  <h2>Co se naučíte</h2>
    <h3>Základní struktura dokumentu</h3>
    <h3>Sémantické značky</h3>
    <h3>Formuláře a tabulky</h3>

  <h2>Jak kurz probíhá</h2>
```

Pravidla:
- Na stránce musí být právě **jeden** `<h1>`.
- Nevynechávejte úrovně (h1 → h3 bez h2 je špatně).
- Klíčová slova zařaďte do nadpisů přirozeně.

---

## SEO-friendly URL

Adresa stránky by měla být čitelná a popisná.

| Špatná URL | Dobrá URL |
|------------|-----------|
| `example.com/p?id=1234` | `example.com/kurz-html` |
| `example.com/article_123_final_v2` | `example.com/zaklady-html` |
| `example.com/CurzHTMLproZacatecniky` | `example.com/kurz-html-zacatecnici` |

Pravidla:
- Používejte **malá písmena** a **pomlčky** místo mezer.
- Vyhněte se ID číslům, parametrům a speciálním znakům.
- URL by měla napovídat obsahu stránky.

---

## Open Graph a sociální sítě

Open Graph (OG) meta tagy řídí, jak stránka vypadá při sdílení na sociálních sítích (Facebook, LinkedIn, Slack...).

```html
<head>
  <!-- Typ obsahu -->
  <meta property="og:type" content="article">

  <!-- Nadpis sdíleného příspěvku -->
  <meta property="og:title" content="Kurz HTML pro začátečníky">

  <!-- Popis -->
  <meta property="og:description"
    content="Praktický kurz HTML od úplných základů.">

  <!-- Náhledový obrázek (doporučená velikost: 1200 × 630 px) -->
  <meta property="og:image" content="https://example.com/og-kurz-html.jpg">

  <!-- Kanonická URL stránky -->
  <meta property="og:url" content="https://example.com/kurz-html">

  <!-- Pro Twitter/X Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Kurz HTML pro začátečníky">
</head>
```

---

## Strukturovaná data (Schema.org)

Strukturovaná data ve formátu **JSON-LD** umožňují Googlu zobrazit tzv. „rich snippets" (hvězdičky, ceny, události...) přímo ve výsledcích hledání.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Kurz HTML pro začátečníky",
  "description": "Praktický kurz HTML od základní struktury dokumentu až po sémantické značky.",
  "provider": {
    "@type": "Organization",
    "name": "Web Academy",
    "sameAs": "https://www.example.com"
  },
  "url": "https://www.example.com/kurz-html",
  "inLanguage": "cs",
  "educationalLevel": "Beginner"
}
</script>
```

Dalšími běžnými typy jsou `Article`, `Product`, `FAQPage`, `BreadcrumbList`, `LocalBusiness`.

---

## Technické SEO

### Výkon stránky (Core Web Vitals)

Google hodnotí uživatelský zážitek pomocí metrik **Core Web Vitals**:

| Metrika | Popis | Cíl |
|---------|-------|-----|
| **LCP** (Largest Contentful Paint) | Čas načtení největšího prvku | < 2,5 s |
| **INP** (Interaction to Next Paint) | Odezva na interakci | < 200 ms |
| **CLS** (Cumulative Layout Shift) | Vizuální stabilita | < 0,1 |

Základní optimalizace:

```html
<!-- Předem načíst kritické zdroje -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="hero.jpg" as="image">

<!-- Lazy loading obrázků mimo viewport -->
<img src="clanek-foto.jpg" alt="Popis" loading="lazy" width="800" height="450">

<!-- Responzivní obrázky – různá velikost pro různé displeje -->
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Popis fotografie"
  width="800"
  height="450">
```

### Mobilní zobrazení

Google používá **mobile-first indexing** – primárně indexuje mobilní verzi stránky.

```html
<head>
  <!-- Bez tohoto tagu prohlížeč nezmenší stránku správně -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
```

```css
/* Mobile-first přístup: nejprve mobilní styl, pak větší displeje */
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
}
```

### Sitemap

Soubor `sitemap.xml` pomáhá crawlerům objevit všechny stránky webu.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2025-09-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://www.example.com/kurz-html</loc>
    <lastmod>2025-09-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

</urlset>
```

Na sitemap odkazujte v `robots.txt` nebo ji nahlaste přes Google Search Console.

### Soubor robots.txt

Říká crawlerům, které části webu mohou nebo nesmí indexovat.

```
# robots.txt – umístěte na https://example.com/robots.txt

User-agent: *           # Pravidlo pro všechny crawlery
Disallow: /admin/       # Zakáže indexaci administrace
Disallow: /tmp/         # Zakáže dočasné soubory
Allow: /                # Povolí vše ostatní

# Odkaz na sitemapu
Sitemap: https://www.example.com/sitemap.xml
```

---

## Celková šablona `<head>` pro SEO

```html
<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Kurz HTML pro začátečníky | Web Academy</title>
  <meta name="description"
    content="Naučte se HTML od základů. Praktický kurz s příklady a projekty.">

  <!-- Kanonická URL -->
  <link rel="canonical" href="https://www.example.com/kurz-html/">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="Kurz HTML pro začátečníky">
  <meta property="og:description"
    content="Naučte se HTML od základů. Praktický kurz s příklady a projekty.">
  <meta property="og:image" content="https://www.example.com/og-kurz-html.jpg">
  <meta property="og:url" content="https://www.example.com/kurz-html/">

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image">

  <!-- Preload kritických zdrojů -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Strukturovaná data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Kurz HTML pro začátečníky",
    "provider": { "@type": "Organization", "name": "Web Academy" }
  }
  </script>

  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <!-- Obsah stránky -->
</body>
</html>
```

---

## Shrnutí – kontrolní seznam

Před publikováním stránky zkontrolujte:

- [ ] Stránka má unikátní `<title>` (50–60 znaků).
- [ ] Stránka má poutavý `<meta name="description">` (150–160 znaků).
- [ ] Na stránce je právě jeden `<h1>`.
- [ ] URL je čitelná, obsahuje klíčová slova, bez zbytečných parametrů.
- [ ] Stránka má nastavenou kanonickou URL.
- [ ] Obrázky mají atributy `alt`, `width` a `height`.
- [ ] Stránka je responzivní (meta viewport je nastaven).
- [ ] Sitemap existuje a je nahlášena v Search Console.
- [ ] `robots.txt` správně povoluje nebo zakazuje indexaci.
- [ ] Core Web Vitals jsou v zeleném pásmu (ověřte přes PageSpeed Insights).

---

*Další informace: [Google Search Central](https://developers.google.com/search) | [web.dev/learn/seo](https://web.dev/learn/seo/) | [Schema.org](https://schema.org/)*
