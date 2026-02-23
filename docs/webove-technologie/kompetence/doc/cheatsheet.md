# Web Developer Cheat Sheet (Základy)

[Zpět na README.md](../README.md)

## 1. Webová komunikace & Teorie

- **Protokoly:** **HTTP** (nešifrovaný) vs. **HTTPS** (zabezpečený pomocí SSL/TLS).
- **Klient-Server:** Klient (prohlížeč) posílá **Request**, Server vrací **Response**.
- **Metody:** 
  - `GET`: Získání dat (parametry v URL).
  - `POST`: Odeslání dat (skryté v těle zprávy).

- **Stavové kódy:** 
  - `200` (OK)
  - `404` (Nenalezeno), `403` (Zakázáno), `401` (Nepřihlášen)
  - `301` (Přesunuto), `302` (Nevyplněno)
  - `500` (Chyba serveru)
- **Kvalita:** 
  - **SEO:** Přehlednost pro vyhledávače.
  - **Přístupnost (A11y):** Použitelnost pro handicapované (sémantika).
  - **Responzivita:** Web se přizpůsobí mobilu i desktopu.

## 2. HTML: Struktura a Sémantika

**Základní šablona:**

```html
<!DOCTYPE html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <title>Titulek stránky</title>
  </head>
  <body>
    <header><h1>Nadpis</h1></header>
    <nav><a href="/">Domů</a></nav>
    <main>
      <section><p>Obsah...</p></section>
      <img src="foto.jpg" alt="Popis pro čtečky" />
    </main>
    <footer>© 2026</footer>
  </body>
</html>
```

## 3. CSS: Styl a Layout

- **Syntaxe:** `selektor { vlastnost: hodnota; }`
- **Box Model:** `Margin` (vně) -> `Border` (rám) -> `Padding` (uvnitř) -> `Content`.
- **Jednotky:** `px` (fixní), `%` (relativní), `rem` (vazba na kořenový font).
- **Flexbox (Layout):**

```css
.kontejner {
  display: flex;
  justify-content: center; /* Zarovnání vodorovně */
  align-items: center; /* Zarovnání svisle */
}
```

- **Media Query:** `@media (max-width: 600px) { ... }` (změna stylu pro mobil).

## 4. Moderní JavaScript (ES6+)

- **Proměnné:** `const` (neměnná), `let` (měnitelná).
- **Template Literals:** `Ahoj ${jmeno}` (zpětné uvozovky).
- **Arrow Functions:** `const mojeFunkce = () => { ... }`.
- **Práce s polem:** `pole.forEach(prvek => { ... })`.

## 5. Manipulace s DOM

- **Výběr:** `const prvek = document.querySelector('.trida');`
- **Obsah:** `prvek.textContent = "Nový text";`
- **Třídy:** `prvek.classList.add('aktivni');`
- **Událost:** `tlacitko.onclick = () => { console.log("Kliknuto!"); }`
