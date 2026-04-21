# Výkon a efektivita načítání webu

Výkon webových stránek (Web Performance) je klíčový pro dobrou uživatelskou zkušenost (UX) a úspěch ve vyhledávačích (SEO). Rychle se načítající stránky udržují pozornost uživatelů a snižují míru opuštění (bounce rate).

## Proč je výkon důležitý

- **Uživatelská zkušenost:** Uživatelé očekávají rychlou odezvu. Pomalé načítání vede k frustraci.
- **SEO:** Vyhledávače (jako Google) zohledňují rychlost. Metriky Core Web Vitals (viz SEO) jsou hodnotícím faktorem.
- **Konverze:** Rychlejší weby mají prokazatelně vyšší míru konverze (např. nákupů v e-shopu).
- **Dostupnost:** Efektivní web je lépe použitelný pro uživatele na pomalém mobilním připojení nebo s méně výkonnými zařízeními.

## 1. Optimalizace obrázků a médií

Obrázky a videa tvoří většinu objemu stahovaných dat na běžném webu. Jejich optimalizace má největší dopad na rychlost načítání.

### Moderní formáty

Používejte moderní formáty jako **WebP** nebo **AVIF**, které nabízejí výrazně lepší kompresi než tradiční JPEG nebo PNG při zachování kvality.

```html
<!-- Použití tagu <picture> pro poskytnutí nejlepšího podporovaného formátu -->
<picture>
  <source srcset="obrazek.avif" type="image/avif">
  <source srcset="obrazek.webp" type="image/webp">
  <img src="obrazek.jpg" alt="Popis obrázku">
</picture>
```

### Lazy loading (Líné načítání)

Obrázky, které nejsou viditelné ihned po načtení stránky (tzv. "below the fold"), by se měly načítat až ve chvíli, kdy k nim uživatel doscrolluje.

```html
<!-- Atribut loading="lazy" zajistí nativní líné načítání v prohlížeči -->
<img src="velky-obrazek.jpg" alt="Zajímavý obsah dole na stránce" loading="lazy" width="800" height="600">
```

*Poznámka:* Vždy uvádějte atributy `width` a `height`, aby prohlížeč vyhradil místo na stránce a zabránilo se poskakování obsahu (Cumulative Layout Shift).

### Responzivní obrázky

Nenačítejte velký obrázek na malém displeji mobilního telefonu. Poskytněte různé velikosti.

```html
<img src="foto-800.jpg"
     srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
     alt="Responzivní fotografie">
```

## 2. Optimalizace kódu (HTML, CSS, JS)

Čím méně kódu musí prohlížeč stáhnout a zpracovat, tím rychleji stránku zobrazí.

### Minifikace

Minifikace je proces odstranění bílých znaků (mezer, tabulátorů, odřádkování) a komentářů ze zdrojového kódu. Tím se sníží velikost souboru, aniž by to ovlivnilo jeho funkci. Minifikované soubory často končí na `.min.css` nebo `.min.js`.

### Komprese

Na straně serveru se zapíná komprese (nejčastěji Gzip nebo Brotli). Server minifikovaný kód ještě "zazipuje", pošle prohlížeči a ten si ho rozbalí. To výrazně šetří přenesená data.

## 3. Načítání zdrojů (Resource Hints)

Můžeme prohlížeči napovědět, které zdroje budou brzy potřeba, aby je mohl začít načítat s předstihem.

```html
<head>
  <!-- Preload: Vysoká priorita, stáhnout ihned. Vhodné pro kritické fonty nebo hlavní obrázek. -->
  <link rel="preload" href="/fonts/moje-pismo.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Preconnect: Navázání spojení s externím serverem v předstihu (např. Google Fonts). -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  
  <!-- Prefetch: Nízká priorita, stáhnout v době nečinnosti (uživatel asi brzy klikne na tuto stránku). -->
  <link rel="prefetch" href="/dalsi-stranka.html">
</head>
```

## 4. Efektivní JavaScript

JavaScript může zásadně zpomalit načítání, protože ve výchozím stavu blokuje vykreslování stránky (render-blocking).

### Atributy defer a async

Pokud je `<script>` umístěn v `<head>`, prohlížeč zastaví zpracování HTML, stáhne JS a spustí ho. To je často nežádoucí.

```html
<!-- ASYNC: Skript se stahuje asynchronně a spustí se HNED, jak je stažen (může přerušit HTML parsování).
     Vhodné pro nezávislé skripty (např. analytika). -->
<script src="analytika.js" async></script>

<!-- DEFER: Skript se stahuje asynchronně, ale spustí se až PO DOKONČENÍ parsování HTML.
     Vhodné pro skripty, které pracují s DOMem. Nejobvyklejší moderní přístup. -->
<script src="hlavni-logika.js" defer></script>
```

## 5. Kešování (Caching)

Kešování umožňuje prohlížeči uložit si soubory lokálně. Při další návštěvě je nemusí stahovat ze serveru.

- **Client-side (Browser) caching:** Nastavuje se na serveru pomocí HTTP hlaviček (např. `Cache-Control`). Týká se hlavně statických souborů (obrázky, CSS, fonty).
- Pokud uděláte změnu v CSS a máte nastaveno dlouhé kešování, používá se technika zvaná "cache busting" – do názvu souboru se přidá verze (např. `style.v2.css` nebo `style.css?v=2`).

---

## Shrnutí – základní pravidla pro rychlý web

- [ ] Používejte moderní formáty obrázků a aplikujte lazy loading tam, kde je to vhodné.
- [ ] Omezte velikost obrázků na nezbytné minimum.
- [ ] Minifikujte HTML, CSS a JS soubory a na serveru mějte zapnutou kompresi.
- [ ] Skripty načíttejte pomocí atributu `defer` (případně `async`).
- [ ] Používejte hlavičky pro kešování statického obsahu.

---

*Nástroje pro měření výkonu: [Google PageSpeed Insights](https://pagespeed.web.dev/), panel Lighthouse v Chrome DevTools.*
