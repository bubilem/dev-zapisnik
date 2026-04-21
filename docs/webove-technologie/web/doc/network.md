# Webová komunikace a protokoly

Abychom si mohli v prohlížeči zobrazit webovou stránku, musí proběhnout komunikace mezi naším počítačem (klientem) a počítačem, kde jsou soubory uloženy (serverem). Tato komunikace se řídí přísnými pravidly – **protokoly**.

Základním protokolem pro přenos webových stránek je **HTTP** (Hypertext Transfer Protocol), dnes téměř výhradně v zabezpečené verzi **HTTPS**.

## Architektura Klient-Server

Web funguje na modelu dotaz–odpověď:

1. **Klient (např. webový prohlížeč Chrome):** Odešle požadavek (*Request*) na server.
2. **Server (např. Apache, Nginx):** Přijme požadavek, zpracuje ho (např. sáhne do databáze, vygeneruje HTML) a pošle zpět odpověď (*Response*).

Tato komunikace je **bezstavová** (stateless) – server si sám o sobě nepamatuje předchozí požadavky. Abychom zůstali např. přihlášeni do e-shopu, používají se *Cookies* nebo *Tokeny*, které se s každým požadavkem odesílají znovu.

---

## 1. HTTP Požadavek (Request)

Když zadáte do prohlížeče adresu (např. `https://www.example.com/clanek`), prohlížeč sestaví HTTP požadavek. Ten se skládá ze tří hlavních částí:

### A) HTTP Metoda (Sloveso)
Určuje, co chceme se zdrojem na serveru udělat. Nejčastější metody jsou:

- **`GET`**: Žádost o získání dat (např. stažení HTML stránky nebo obrázku). Zásadní pravidlo: `GET` by **nikdy** neměl měnit data na serveru! Parametry se posílají přímo v URL (např. `?id=5`).
- **`POST`**: Odeslání dat na server ke zpracování (např. odeslání přihlašovacího formuláře, nahrání fotky). Data jsou skryta v těle požadavku, nejsou v URL.
- **`PUT` / `PATCH`**: Aktualizace existujících dat na serveru (často se používá u API).
- **`DELETE`**: Smazání dat na serveru.

### B) Hlavičky (Headers)
Předávají serveru dodatečné informace (metada) o požadavku a o tom, kdo ho posílá.

- `Host: www.example.com` (Na jakou doménu se ptáme)
- `User-Agent: Mozilla/5.0 (Windows NT 10.0...)` (Informace o našem prohlížeči a OS)
- `Accept-Language: cs,en;q=0.9` (Jaké jazyky preferujeme)
- `Cookie: session_id=12345` (Odeslání uložených sušenek pro identifikaci)

### C) Tělo (Body)
Obsahuje samotná data. U metody `GET` je tělo prázdné. U metody `POST` zde najdeme obsah vyplněného formuláře nebo odesílaný JSON soubor.

---

## 2. HTTP Odpověď (Response)

Jakmile server požadavek zpracuje, pošle zpět odpověď. I ta má tři části:

### A) Stavový kód (Status Code)
Třímístné číslo, které stroji (prohlížeči) okamžitě říká, jak požadavek dopadl. Kódy se dělí do pěti tříd:

| Třída | Význam | Nejznámější příklady |
| :--- | :--- | :--- |
| **1xx** | **Informační** | (Běžně se s nimi nesetkáte) |
| **2xx** | **Úspěch** | `200 OK` (Vše v pořádku, posílám data), `201 Created` (Záznam úspěšně vytvořen) |
| **3xx** | **Přesměrování** | `301 Moved Permanently` (Trvalé přesměrování na novou URL), `302 Found` (Dočasné přesměrování) |
| **4xx** | **Chyba klienta** | `400 Bad Request` (Špatný formát dotazu), `401 Unauthorized` (Nutné přihlášení), `403 Forbidden` (Zakázaný přístup), **`404 Not Found`** (Stránka neexistuje) |
| **5xx** | **Chyba serveru** | `500 Internal Server Error` (Aplikace na serveru spadla/vyhodila chybu), `503 Service Unavailable` (Server je přetížený nebo v údržbě) |

### B) Hlavičky (Headers)
Informace o tom, co nám server posílá.

- `Content-Type: text/html; charset=UTF-8` (Říká prohlížeči, že mu posílá HTML dokument a má ho tak vykreslit)
- `Content-Length: 1245` (Velikost těla v bajtech)
- `Set-Cookie: session_id=9876; Secure; HttpOnly` (Server přikazuje prohlížeči uložit novou sušenku)
- `Cache-Control: max-age=3600` (Říká prohlížeči, že si má soubor na hodinu uložit do paměti a nestahovat ho znovu)

### C) Tělo (Body)
Samotná data, která jsme si vyžádali (zdrojový kód HTML, binární data obrázku, textový JSON atd.).

---

## Ukázka textové podoby komunikace

Takhle reálně vypadá text, který si mezi sebou prohlížeč a server vymění "pod pokličkou" (můžete to vidět v záložce *Network* ve vývojářských nástrojích prohlížeče).

**1. Prohlížeč odesílá (Request):**
```http
GET /clanky/co-je-html HTTP/1.1
Host: www.mojestranka.cz
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/114.0
Accept: text/html
Accept-Language: cs-CZ
Connection: keep-alive
```

**2. Server odpovídá (Response):**
```http
HTTP/1.1 200 OK
Date: Wed, 21 Apr 2026 12:00:00 GMT
Server: Apache/2.4.41
Content-Type: text/html; charset=UTF-8
Content-Length: 138

<!DOCTYPE html>
<html lang="cs">
<head><title>Co je HTML</title></head>
<body><h1>HTML je základ!</h1></body>
</html>
```

---

## HTTP vs. HTTPS

**HTTP** přenáší data jako prostý text. Pokud by se někdo (např. hacker na veřejné Wi-Fi v kavárně) "zaposlouchal" do komunikace, mohl by snadno přečíst odesílaná hesla nebo čísla kreditních karet.

**HTTPS** (Hypertext Transfer Protocol **Secure**) řeší tento problém tím, že celou komunikaci šifruje pomocí protokolu TLS (dříve SSL).

### Jak funguje HTTPS (zjednodušeně)
1. Prohlížeč požádá server o bezpečné spojení.
2. Server pošle prohlížeči svůj **SSL certifikát** (obsahuje veřejný klíč a ověření identity od certifikační autority).
3. Prohlížeč ověří, zda je certifikát platný a důvěryhodný (zda byla doména ověřena).
4. Pokud ano, prohlížeč a server se domluví na jednorázovém tajném klíči.
5. Veškerá další komunikace (požadavky i odpovědi) je tímto klíčem zašifrována. Případný útočník na síti uvidí jen nečitelný rozsypaný čaj.

> **Důležité:** Dnes je HTTPS naprostým standardem pro všechny weby, nejen pro e-shopy a banky. Vyhledávače (Google) penalizují weby, které HTTPS nemají, a prohlížeče u nich uživatelům zobrazují varování "Nezabezpečeno".
