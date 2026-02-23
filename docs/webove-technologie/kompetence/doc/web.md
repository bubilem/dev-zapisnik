# Weby

[Zpět na README.md](../README.md)

Chronologický seznam kompetencí pro pochopení webového ekosystému:

## 1. Architektura Klient–Server

Základní princip fungování webu:

- **Klient (Prohlížeč):** Zařízení, které o data žádá a vykresluje je (Chrome, Safari, mobil).
- **Server:** Vzdálený počítač, kde jsou soubory uloženy a který na žádosti odpovídá.
- **Doména vs. IP adresa:** Pochopení, že `google.com` je jen maska pro číselnou adresu (DNS).

## 2. Protokoly a Komunikace (HTTP/HTTPS)

Jak si počítače "povídají":

- **HTTP vs. HTTPS:** Rozdíl v zabezpečení (šifrování). Žák musí vědět, proč je dnes HTTPS standardem (symbol zámečku).
- **Struktura komunikace:**

  - **Request (Požadavek):** Co klient chce od serveru.
  - **Response (Odpověď):** Co server posílá zpět (data + stavový kód).

- **Stavové kódy (Základ):**
  - `200 OK` (Vše v pořádku).
  - `404 Not Found` (Stránka neexistuje).
  - `500 Internal Server Error` (Chyba na straně serveru).

## 3. Metody požadavků (GET vs. POST)

Způsob, jakým posíláme data:

- **GET:** Slouží k získání dat. Data jsou vidět v URL adrese (např. vyhledávání).
- **POST:** Slouží k odesílání dat (formuláře, hesla). Data jsou skrytá v těle požadavku.

## 4. Standardy kvality webu

Co dělá web profesionálním a funkčním:

- **Responzivita:** Schopnost webu přizpůsobit se všem velikostem obrazovek (mobil, tablet, desktop).
- **Přístupnost (Accessibility / A11y):** Web musí být použitelný i pro lidi s postižením (nevidomí používající čtečky – zde je důležitá sémantika HTML).
- **SEO (Search Engine Optimization):** Optimalizace pro vyhledávače. Pochopení, že správné nadpisy a metadata pomáhají Googlu web najít.
- **Validita:** Kód bez chyb podle standardů W3C (prohlížeč pak web vykreslí předvídatelně).

<br>
<br>
<br>

# Cvičení: Webová komunikace a standardy

## Část 1: Proces request-reply

Seřaďte kroky tak, jak jdou chronologicky za sebou, když uživatel zadá adresu do prohlížeče:

1. Server zpracuje požadavek a najde soubory.
2. Prohlížeč (Klient) odešle HTTP Request na server.
3. Uživatel zadá URL do adresního řádku.
4. Server odešle HTTP Response (např. HTML soubor) zpět.
5. Prohlížeč vykreslí stránku uživateli.

**Správné pořadí:** \_\_ → \_\_ → \_\_ → \_\_ → \_\_

## Část 2: HTTP Metody a kódy

Doplňte správný pojem:

1. Když odešlete přihlašovací formulář s heslem, použijete metodu:
2. Stavový kód, který říká "Stránka nenalezena", je:
3. Zabezpečený protokol, který šifruje přenos dat, je:

## Část 3: Kvalita webu (Pravda / Nepravda)

1. SEO závisí pouze na tom, kolikrát je na stránce klíčové slovo. (**Pravda / Nepravda**)
2. Responzivita znamená, že web vypadá stejně na mobilu i na počítači. (**Pravda / Nepravda**)
3. Sémantické značky (jako `<nav>` nebo `<main>`) pomáhají nevidomým uživatelům v navigaci. (**Pravda / Nepravda**)

<br>
<br>
<br>

# Klíč k řešení

### Část 1: Proces

3 → 2 → 1 → 4 → 5

### Část 2: HTTP

1. **POST** (data nejsou v URL)
2. **404**
3. **HTTPS**

### Část 3: Kvalita webu

1. **Nepravda** (SEO je komplexní – rychlost, struktura, obsah, zpětné odkazy).
2. **Nepravda** (Znamená, že se přizpůsobí, tedy vypadá _jinak_, aby byl čitelný).
3. **Pravda** (Čtečky obrazovky tyto značky využívají k orientaci).
