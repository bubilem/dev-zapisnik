# Nasazení webu (Deployment)

[Zpět na README.md](../README.md)

Webová stránka, která běží jen u vás na disku (`file:///Users/...`), jako by neexistovala. Cílem je dostat ji na veřejnou adresu (URL), aby ji viděl celý svět.

## 1. Statický vs. Dynamický hosting

- **Statický hosting (Static Site Generator / CDN):** Ideální pro HTML+CSS+JS weby. Server jen posílá soubory, nic nepočítá. Je extrémně rychlý, bezpečný a často zdarma.
    - *Příklady:* GitHub Pages, Netlify, Vercel, Cloudflare Pages.
- **Dynamický hosting (Server-side):** Potřeba pro PHP, Python, Node.js backendy, databáze. Je složitější na správu.
    - *Příklady:* Heroku, DigitalOcean, běžný webhosting (Wedos, Endora).

## 2. GitHub Pages (Nejjednodušší cesta)

Pokud máte kód na GitHubu, můžete ho zapnout jedním kliknutím:
1. Jděte do `Settings` vašeho repozitáře.
2. Sekce `Pages`.
3. V `Source` vyberte větev `main` a uložte.
4. Vaše stránka poběží na `https://vase-jmeno.github.io/nazev-projektu`.

## 3. Netlify / Vercel (Moderní cesta)

Moderní standard pro frontend vývojáře.
- **Drag & Drop:** Můžete jen přetáhnout složku s webem do okna prohlížeče.
- **Git Integration (CI/CD):** Propojíte službu s GitHubem. Kdykoliv uděláte `git push`, Netlify automaticky stáhne nový kód, sestaví ho a nasadí novou verzi webu (během sekund).

## 4. Domény a DNS

Adresa `brutalni-web-123.netlify.app` nevypadá profesionálně.
- **Registrátor:** Koupíte si doménu (např. `mojewebovka.cz`).
- **DNS záznamy:** Nastavíte směrování (A záznam nebo CNAME), aby doména ukazovala na servery hostingu.

<br>
<br>
<br>

# Cvičení: Jdeme online

## Část 1: Rozhodování

Máte jednoduchou vizitku firmy (HTML, CSS, pár obrázků). Klient chce, aby to běželo spolehlivě a **zadarmo**.
Jakou službu zvolíte?

A) Pronajmu si virtuální server (VPS) za 150 Kč měsíčně.
B) Použiji GitHub Pages nebo Netlify.
C) Zaplatím si drahý MySQL hosting.

Volba: `__________`

## Část 2: CI/CD koncept

Co znamená, když máte nastavené "automatické nasazení" (Continuous Deployment) z GitHubu na Netlify?

1. Musím se přihlásit na Netlify a ručně nahrát soubory po každé změně.
2. Netlify se dívá na můj GitHub. Jakmile detekuje nový commit do `main`, sám web aktualizuje.
3. Musím poslat email do Netlify, aby web aktualizovali.

Odpověď: `__________`

<br>
<br>
<br>

# Klíč k řešení

### Část 1: Rozhodování

**B** je správně. Statický hosting je pro tento účel nejlepší, nejrychlejší a je zdarma. VPS nebo databázový hosting je "kanón na vrabce".

### Část 2: CI/CD

**2** je správně. To je kouzlo moderního vývoje – vy se staráte jen o kód (Git), o zbytek se postarají roboti.
