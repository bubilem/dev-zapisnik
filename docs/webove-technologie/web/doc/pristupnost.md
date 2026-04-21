# Přístupnost webových stránek (a11y)

Přístupnost (z anglického *accessibility*, zkratka **a11y**) znamená navrhovat weby tak, aby je mohli bez problémů používat **všichni lidé** – včetně těch s různými druhy postižení. Přístupný web není pouze altruistickým činem; v mnoha zemích je to zákonná povinnost a přináší měřitelné obchodní výhody (širší publikum, lepší SEO).

## Proč na přístupnosti záleží

- Přibližně **15–20 % světové populace** žije s nějakým druhem postižení.
- Přístupné weby jsou lepší pro **všechny**: titulky u videí pomáhají nejen neslyšícím, ale i lidem ve hlučném prostředí.
- Sémantické HTML je snáze indexovatelné vyhledávači → lepší SEO.
- Ve státní správě EU platí od roku 2025 přísné zákonné požadavky (směrnice o přístupnosti webových stránek).

## Standardy WCAG

**WCAG** (Web Content Accessibility Guidelines) jsou mezinárodní pokyny vydávané organizací W3C. Jsou organizovány kolem čtyř základních principů (zkratka **POUR**):

| Princip | Popis |
|---------|-------|
| **P**erceivable (vnímatelný) | Obsah musí být prezentovatelný způsobem, který uživatelé dokážou vnímat. |
| **O**perable (ovladatelný) | Uživatelské rozhraní musí být ovladatelné. |
| **U**nderstandable (srozumitelný) | Informace a ovládání musí být srozumitelné. |
| **R**obust (robustní) | Obsah musí být interpretovatelný různými technologiemi. |

Existují tři úrovně shody: **A** (minimální), **AA** (standard ve většině zákonů), **AAA** (nejvyšší).

## Kategorie postižení a jejich řešení

| Typ postižení | Příklady | Technologie / řešení |
|---------------|----------|----------------------|
| Zrakové | slepota, slabozrakost, barvoslepost | čtečky obrazovky (NVDA, JAWS), dostatečný kontrast |
| Sluchové | hluchota, nedoslýchavost | titulky, přepisy zvuku |
| Motorické | ochrnutí, třes, omezená hybnost | klávesnicová navigace, hlasové ovládání |
| Kognitivní | dyslexie, ADHD | jasná struktura, jednoduchý jazyk |

---

## 1. Sémantické HTML jako základ

Nejdůležitějším krokem k přístupnosti je **správné použití sémantických HTML elementů**. Čtečky obrazovky se spoléhají na strukturu dokumentu.

**Nevhodný příklad – nesémantické HTML:**

```html
<div class="header">Moje stránka</div>
<div class="nav">
  <div onclick="goto('home')">Domů</div>
</div>
<div class="h1">Vítejte</div>
```

Čtečka obrazovky vidí pouze sérii `<div>` – nerozumí struktuře.

**Správný příklad – sémantické HTML:**

```html
<header>
  <h1>Moje stránka</h1>
</header>
<nav aria-label="Hlavní navigace">
  <ul>
    <li><a href="/">Domů</a></li>
    <li><a href="/o-nas">O nás</a></li>
  </ul>
</nav>
<main>
  <article>
    <h2>Vítejte</h2>
    <p>Obsah stránky...</p>
  </article>
</main>
<footer>
  <p>&copy; 2025 Moje stránka</p>
</footer>
```

---

## 2. Alternativní texty obrázků

Každý obrázek nesoucí informaci musí mít atribut `alt` s výstižným popisem. Dekorativní obrázky mají prázdný `alt=""`.

```html
<!-- Informační obrázek -->
<img src="graf-prodeje.png" alt="Sloupcový graf prodeje za rok 2025: Q1 120 ks, Q2 180 ks">

<!-- Dekorativní obrázek – čtečka přeskočí -->
<img src="dekorativni-vlnka.svg" alt="">

<!-- Logo v odkazu – popis popisuje funkci -->
<a href="/">
  <img src="logo.png" alt="Přejít na úvodní stránku">
</a>
```

---

## 3. Kontrast barev

Minimální kontrastní poměr podle WCAG 2.1 (úroveň AA):
- **4,5 : 1** pro normální text
- **3 : 1** pro velký text (18 pt nebo 14 pt tučný)

```css
/* Nevhodné – nízký kontrast (poměr ~2,3 : 1) */
.slaby-kontrast {
  color: #aaaaaa;
  background: #ffffff;
}

/* Správné – dostatečný kontrast (poměr ~19 : 1) */
.dobry-kontrast {
  color: #1a1a1a;
  background: #ffffff;
}
```

> Kontrast lze ověřit nástrojem [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) nebo v DevTools prohlížeče.

---

## 4. Klávesnicová navigace

Všechny interaktivní prvky musí být dosažitelné a ovladatelné pouze klávesnicí (klávesou `Tab`).

```html
<!-- Přirozené pořadí v DOM je nejlepší volba -->
<a href="/prvni">První odkaz</a>
<a href="/druhy">Druhý odkaz</a>
<button>Odeslat</button>

<!-- tabindex="0" zařadí vlastní prvek do přirozeného pořadí -->
<div role="button" tabindex="0" onclick="akce()">Klikni</div>
```

**Nikdy neodstraňujte focus ring bez náhrady!**

```css
/* Špatně – uživatelé klávesnice nevidí, kde jsou */
:focus {
  outline: none;
}

/* Správně – vlastní výrazný focus styl */
:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## 5. ARIA atributy

**ARIA** (Accessible Rich Internet Applications) přidávají sémantiku prvkům, které ji samy nemají. Platí pravidlo: **používejte ARIA pouze tehdy, když nativní HTML nestačí**.

| Atribut | Účel | Příklad |
|---------|------|---------|
| `role` | Definuje roli prvku | `role="dialog"` |
| `aria-label` | Pojmenuje prvek | `aria-label="Zavřít"` |
| `aria-labelledby` | Odkáže na viditelný popis | `aria-labelledby="id-nadpisu"` |
| `aria-describedby` | Odkáže na pomocný text | `aria-describedby="id-napovedy"` |
| `aria-hidden` | Skryje před čtečkou | `aria-hidden="true"` |
| `aria-expanded` | Stav rozbalení | `aria-expanded="false"` |
| `aria-live` | Oznámí dynamické změny | `aria-live="polite"` |

**Příklad: přístupné modální okno**

```html
<button
  id="btn-otevrit"
  aria-haspopup="dialog"
  onclick="otevritDialog()">
  Otevřít nastavení
</button>

<div
  id="dialog-nastaveni"
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-nadpis"
  aria-describedby="dialog-popis"
  hidden>

  <h2 id="dialog-nadpis">Nastavení účtu</h2>
  <p id="dialog-popis">Změňte svá osobní nastavení.</p>

  <button onclick="zavritDialog()" aria-label="Zavřít dialog nastavení">
    &times;
  </button>
</div>
```

**Příklad: živá oblast (live region)**

```html
<!-- Text vložený JavaScriptem čtečka přečte automaticky -->
<div aria-live="polite" aria-atomic="true" id="status-zprava"></div>

<script>
  function zobrazZpravu(text) {
    document.getElementById('status-zprava').textContent = text;
  }
  // Volání: zobrazZpravu('Formulář byl úspěšně odeslán.');
</script>
```

---

## 6. Přístupné formuláře

```html
<form action="/prihlaseni" method="post" novalidate>

  <div>
    <label for="email">E-mailová adresa</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      aria-required="true"
      autocomplete="email"
      aria-describedby="email-napoveda">
    <span id="email-napoveda">Zadejte svou pracovní e-mailovou adresu.</span>
  </div>

  <!-- Skupiny voleb obalte fieldsetem -->
  <fieldset>
    <legend>Preferovaný kontakt</legend>
    <label>
      <input type="radio" name="kontakt" value="email"> E-mail
    </label>
    <label>
      <input type="radio" name="kontakt" value="telefon"> Telefon
    </label>
  </fieldset>

  <!-- Chybová zpráva asociovaná s polem -->
  <div>
    <label for="heslo">Heslo</label>
    <input
      type="password"
      id="heslo"
      name="heslo"
      required
      aria-invalid="true"
      aria-describedby="heslo-chyba">
    <span id="heslo-chyba" role="alert">
      Heslo musí mít alespoň 8 znaků.
    </span>
  </div>

  <button type="submit">Přihlásit se</button>
</form>
```

---

## 7. Videa a média

```html
<video controls>
  <source src="vyuka.mp4" type="video/mp4">

  <!-- Titulky ve formátu WebVTT -->
  <track
    kind="subtitles"
    src="titulky-cs.vtt"
    srclang="cs"
    label="Čeština"
    default>

  Váš prohlížeč nepodporuje přehrávač videa.
</video>

<p><a href="prepis-vyuky.txt">Textový přepis videa</a></p>
```

---

## Shrnutí – kontrolní seznam

Před publikováním stránky zkontrolujte:

- [ ] Každý obrázek má atribut `alt`.
- [ ] Struktura nadpisů je logická (h1 → h2 → h3...).
- [ ] Stránka je plně ovladatelná pouze klávesnicí.
- [ ] Focus je vždy viditelný.
- [ ] Kontrastní poměr splňuje minimálně 4,5 : 1.
- [ ] Každý formulářový prvek má `<label>`.
- [ ] Chybové zprávy jsou asociované s příslušnými poli.
- [ ] Videa mají titulky nebo přepis.

---

*Další informace: [MDN – Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility) | [WebAIM](https://webaim.org/) | [W3C WCAG 2.1](https://www.w3.org/TR/WCAG21/)*
