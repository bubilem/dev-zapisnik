# Datové typy

Každý atribut (sloupec) tabulky musí mít přesně definovaný **datový typ** – říká databázi, jaký druh hodnot smí sloupec obsahovat a kolik místa v paměti hodnota zabere. Správná volba datového typu má zásadní vliv na výkon, velikost databáze a integritu dat.

---

## 1. Číselné typy

### Celá čísla (Integer)

Slouží k ukládání čísel bez desetinné části. Liší se rozsahem a velikostí v bajtech.

| Typ          | Velikost | Rozsah (znaménkový)                          | MySQL / MariaDB  | PostgreSQL    | SQL Server    |
|--------------|:--------:|----------------------------------------------|------------------|---------------|---------------|
| TINYINT      | 1 B      | −128 až 127                                  | `TINYINT`        | –             | `TINYINT`     |
| SMALLINT     | 2 B      | −32 768 až 32 767                            | `SMALLINT`       | `SMALLINT`    | `SMALLINT`    |
| MEDIUMINT    | 3 B      | −8 388 608 až 8 388 607                      | `MEDIUMINT`      | –             | –             |
| INTEGER      | 4 B      | −2 147 483 648 až 2 147 483 647              | `INT`            | `INTEGER`     | `INT`         |
| BIGINT       | 8 B      | −9 223 372 036 854 775 808 až …775 807       | `BIGINT`         | `BIGINT`      | `BIGINT`      |

> **Unsigned (bezznaménkový)** varianty (např. `INT UNSIGNED` v MySQL) zdvojnásobí kladný rozsah – `INT UNSIGNED` pojme 0 až 4 294 967 295.

**Praktické příklady použití:**

```sql
id          INT           -- primární klíč, max ~2 miliardy záznamů
pocet_kusu  SMALLINT      -- počet kusů zboží, stačí rozsah 0–32 767
kapacita    TINYINT UNSIGNED  -- kapacita místnosti, max 255
id_velky    BIGINT        -- např. ID tweetu / Instagram postu (mohou být miliardy)
```

### Desetinná čísla s plovoucí řádovou čárkou (Float / Double)

Rychlá, ale **přibližná** reprezentace. Nevhodné pro finanční výpočty (zaokrouhlovací chyby).

| Typ      | Velikost | Přibližná přesnost    | Použití                        |
|----------|:--------:|-----------------------|--------------------------------|
| `FLOAT`  | 4 B      | ~7 platných číslic    | GPS souřadnice, teploty        |
| `DOUBLE` | 8 B      | ~15 platných číslic   | Vědecké výpočty, statistiky    |
| `REAL`   | 4 nebo 8 B | záleží na DBMS      | Alias pro FLOAT nebo DOUBLE    |

```sql
teplota     FLOAT         -- 36.6 °C
rychlost    DOUBLE        -- 299 792 458.0 m/s
```

### Desetinná čísla s pevnou řádovou čárkou (Decimal / Numeric)

**Přesná** reprezentace – hodnota se ukládá jako řetězec číslic. Nutnost pro finance!

**Syntaxe:** `DECIMAL(přesnost, měřítko)` = celkový počet číslic, z toho číslic za desetinnou čárkou.

```sql
cena        DECIMAL(10, 2)   -- max 99 999 999.99 Kč (10 číslic, 2 za tečkou)
kurz_meny   DECIMAL(15, 6)   -- devizový kurz s přesností na 6 desetinných míst
```

> `NUMERIC` je ve standardu SQL synonymum pro `DECIMAL`.

---

## 2. Textové (řetězcové) typy

### Řetězce pevné délky – CHAR

`CHAR(n)` vždy zabere přesně **n znaků**. Kratší hodnoty se doplní mezerami.

```sql
pohlavi     CHAR(1)    -- 'M' nebo 'Z'
kod_statu   CHAR(3)    -- 'CZE', 'SVK', 'USA' (ISO 3166 kódy)
psč         CHAR(5)    -- '11000', '60200'
```

> **Kdy použít:** Hodnoty, které mají vždy stejnou délku (kódy, PSČ, identifikátory).

### Řetězce proměnné délky – VARCHAR

`VARCHAR(n)` ukládá **jen tolik znaků, kolik je skutečně zadáno** (+ malá režie). Maximální délka je `n`.

```sql
jmeno       VARCHAR(50)   -- jméno osoby, proměnná délka
email       VARCHAR(255)  -- e-mailová adresa
url         VARCHAR(2048) -- URL adresa
```

> **Kdy použít:** Drtivá většina textových polí. VARCHAR je výchozí volba pro text.

### Rozsáhlý text – TEXT

Pro texty, jejichž délka přesahuje limity VARCHAR nebo není předem známá.

| Typ          | Max. délka (MySQL)          | Poznámka                              |
|--------------|-----------------------------|---------------------------------------|
| `TINYTEXT`   | 255 B                       | Krátké zprávy                         |
| `TEXT`       | 65 535 B (~64 KB)           | Běžné delší texty, komentáře          |
| `MEDIUMTEXT` | 16 777 215 B (~16 MB)       | Články, dokumenty                     |
| `LONGTEXT`   | 4 294 967 295 B (~4 GB)     | Velmi rozsáhlé dokumenty, html stránky |

> V **PostgreSQL** se používá typ `TEXT` bez omezení délky.  
> V **SQL Serveru** se dnes doporučuje `VARCHAR(MAX)` místo zastaralého `TEXT`.

```sql
popis       TEXT          -- popis produktu
obsah       LONGTEXT      -- obsah celého článku blogu
```

### Přehled porovnání textových typů

```
CHAR(10)    →  'Ahoj      '  (pevně 10 znaků, doplněno mezerami)
VARCHAR(10) →  'Ahoj'        (4 znaky + 1 bajt délky = 5 B)
TEXT        →  libovolně dlouhý text, uložen mimo řádek
```

---

## 3. Typy pro datum a čas

Správné ukládání časových údajů je kritické – nepoužívejte text pro datum!

| Typ           | Co ukládá                          | Formát / Rozsah                         | MySQL         | PostgreSQL    |
|---------------|------------------------------------|-----------------------------------------|---------------|---------------|
| `DATE`        | Datum (bez času)                   | `YYYY-MM-DD`, 1000-01-01 – 9999-12-31  | `DATE`        | `DATE`        |
| `TIME`        | Čas (bez data)                     | `HH:MM:SS`                             | `TIME`        | `TIME`        |
| `DATETIME`    | Datum + čas                        | `YYYY-MM-DD HH:MM:SS`                  | `DATETIME`    | `TIMESTAMP`   |
| `TIMESTAMP`   | Datum + čas (UTC, auto update)     | 1970-01-01 – 2038-01-19 (Unix time)    | `TIMESTAMP`   | `TIMESTAMPTZ` |
| `YEAR`        | Jen rok                            | 1901 – 2155                            | `YEAR`        | –             |
| `INTERVAL`    | Časový interval                    | např. `3 days`, `2 hours`              | –             | `INTERVAL`    |

```sql
datum_narozeni  DATE         -- '1990-04-15'
cas_otvirani    TIME         -- '08:30:00'
vytvoreno_v     TIMESTAMP    -- '2024-03-15 14:23:05' (automaticky vyplněno při vložení)
aktualizovano   DATETIME     -- explicitně zadaný datum a čas
```

> **TIMESTAMP vs. DATETIME:**  
> `TIMESTAMP` ukládá čas v UTC a automaticky ho převádí do časové zóny serveru. `DATETIME` ukládá přesně to, co bylo zadáno, bez konverze. Pro mezinárodní aplikace preferujte `TIMESTAMP`.

> **Pozor na rok 2038:** `TIMESTAMP` v MySQL (32bitový Unix time) přeteče 19. ledna 2038. Moderní systémy tento problém řeší, ale je dobré na něj myslet.

### Pod pokličkou: Unix timestamp je jen celé číslo

`TIMESTAMP` (Unix time) je ve skutečnosti prosté **celé číslo** o velikosti **4 bajty**. Udává počet **sekund, které uplynuly od epochy 1. ledna 1970 00:00:00 UTC**.

Klíčový detail: klasický Unix timestamp (`time_t` v jazyce C) je **znaménkový** (`INT` / signed), nikoliv bezznaménkový (`INT UNSIGNED`). Proto jeho maximum není 4 294 967 295 (2³²−1), ale pouze **2 147 483 647** (2³¹−1):

```
Signed   INT (4 B)  →  rozsah: −2 147 483 648  až  2 147 483 647
Unsigned INT (4 B)  →  rozsah:              0  až  4 294 967 295
```

```
1970-01-01 00:00:00 UTC  →  Unix timestamp = 0
2024-03-15 12:00:00 UTC  →  Unix timestamp = 1 710 504 000
2038-01-19 03:14:07 UTC  →  Unix timestamp = 2 147 483 647  ← maximum signed INT32
```

Po překročení tohoto maxima by číslo „přeteklo" do záporných hodnot – odtud slavný **bug roku 2038** (Year 2038 problem, Y2K38).

```sql
-- Převod Unix timestampu na čitelné datum (MySQL)
SELECT FROM_UNIXTIME(1710504000);
-- Výsledek: '2024-03-15 12:00:00'

-- Opačný směr – čitelné datum na číslo
SELECT UNIX_TIMESTAMP('2024-03-15 12:00:00');
-- Výsledek: 1710504000
```

> Moderní systémy přechází na **64bitový timestamp** (`BIGINT`, 8 B), který vystačí přibližně do roku **292 miliard** – prakticky bez omezení.  
> V programovacích jazycích: JavaScript `Date.now()` vrací milisekundy od epochy (tedy timestamp × 1000), PHP `time()` vrací klasické sekundy.

---

## 4. Logický typ (Boolean)

Uchovává hodnotu **pravda / nepravda**.

| DBMS         | Typ / Implementace                   | Hodnoty                        |
|--------------|--------------------------------------|--------------------------------|
| PostgreSQL   | `BOOLEAN`                            | `TRUE` / `FALSE` / `NULL`      |
| MySQL / MariaDB | `TINYINT(1)` nebo `BOOLEAN`       | `1` / `0`                      |
| SQL Server   | `BIT`                                | `1` / `0`                      |
| SQLite       | `INTEGER`                            | `1` / `0`                      |

```sql
je_aktivni      BOOLEAN      -- TRUE = aktivní účet, FALSE = zablokovaný
ma_souhlas_gdpr BOOLEAN      -- TRUE = souhlas udělen
je_admin        TINYINT(1)   -- v MySQL
```

> MySQL nemá nativní BOOLEAN – `BOOLEAN` je aliasem pro `TINYINT(1)`. Dbejte na to při práci s ORM frameworky.

---

## 5. Binární typy (BLOB)

BLOB (*Binary Large Object*) slouží k ukládání **surových binárních dat** – obrázků, souborů, PDF apod.

| Typ           | Max. velikost (MySQL) | Použití                       |
|---------------|-----------------------|-------------------------------|
| `TINYBLOB`    | 255 B                 | Malé binární hodnoty          |
| `BLOB`        | 65 535 B (~64 KB)     | Malé obrázky, ikony           |
| `MEDIUMBLOB`  | ~16 MB                | Dokumenty, fotografie         |
| `LONGBLOB`    | ~4 GB                 | Videa, zálohy                 |

```sql
fotka_profilu   MEDIUMBLOB   -- binární data obrázku
pdf_soubor      LONGBLOB     -- přiložený PDF dokument
```

> **Doporučení z praxe:** Ukládání souborů přímo do databáze je kontroverzní. Moderní přístup je soubory ukládat na disk / cloudové úložiště (S3, Azure Blob) a v databázi uchovávat pouze **cestu k souboru** jako `VARCHAR`.

---

## 6. Výčtové typy (ENUM a SET)

### ENUM

Omezuje hodnoty sloupce na přesně definovaný **seznam možností** – jako dropdown v aplikaci.

```sql
pohlavi     ENUM('muz', 'zena', 'neuveden')   DEFAULT 'neuveden'
stav_objednavky ENUM('nova', 'zpracovava_se', 'odeslana', 'dorucena', 'zrusena')
```

> V **PostgreSQL** se `ENUM` vytváří jako vlastní datový typ:
> ```sql
> CREATE TYPE stav AS ENUM ('nova', 'odeslana', 'dorucena');
> ```

### SET (pouze MySQL)

Podobné ENUM, ale každý řádek může obsahovat **více hodnot najednou** (kombinaci z množiny).

```sql
odebirane_kategorie SET('sport', 'kultura', 'technika', 'veda')
-- Možná hodnota: 'sport,technika'
```

> `SET` je specifická pro MySQL. Pro ostatní DBMS se M:N výběry řeší separátní vazbou.

---

## 7. JSON a strukturovaná data

Moderní DBMS umožňují ukládat **JSON dokumenty** přímo do sloupce a dotazovat se na jejich obsah.

| DBMS         | Typ         | Funkce / Operátory               |
|--------------|-------------|---------------------------------|
| MySQL 5.7+   | `JSON`      | `JSON_EXTRACT()`, `->`, `->>`   |
| PostgreSQL   | `JSON`, `JSONB` | `->`, `->>`, `@>`, `?`      |
| SQL Server   | `NVARCHAR`  | `OPENJSON()`, `JSON_VALUE()`    |
| SQLite       | `TEXT`      | `json_extract()`                |

```sql
-- Uložení JSON dat
nastaveni   JSON    -- např. {"tema": "dark", "jazyk": "cs", "notifikace": true}
metadata    JSONB   -- PostgreSQL: binárně uložený JSON s indexováním
```

```sql
-- Dotaz na hodnotu v JSON (PostgreSQL)
SELECT nastaveni->>'tema' FROM uzivatel WHERE id = 1;
-- Výsledek: 'dark'
```

> `JSONB` (PostgreSQL) ukládá JSON v binárním formátu – je rychlejší pro dotazy a podporuje indexování, ale pomalejší při zápisu (parsing). Pro produkci preferujte `JSONB`.

---

## 8. Speciální a rozšířené typy

### UUID

Universally Unique Identifier – 128bitové unikátní ID (alternativa k auto-increment `INT`).

```sql
id  UUID  DEFAULT gen_random_uuid()  -- PostgreSQL
-- Příklad hodnoty: 'a3b8d1b6-0b3b-4b1a-9c1a-1a2b3c4d5e6f'
```

> **Kdy použít UUID místo INT:**  
> - Distribuované systémy (ID se generuje bez znalosti ostatních uzlů).  
> - Bezpečnostní důvody (ID nejde odhadnout – `/users/1`, `/users/2`… je předvídatelné).  
> - Nevýhoda: větší velikost (16 B vs. 4 B), horší výkon při řazení a indexování.

### Geometrické / prostorové typy (Spatial)

Pro ukládání geografických dat – souřadnic, tvarů, polygonů.

```sql
-- MySQL / PostGIS (rozšíření PostgreSQL)
poloha      POINT        -- GPS souřadnice: POINT(14.4208 50.0880)
oblast      POLYGON      -- obvod parcely nebo území
```

> **PostGIS** je nejpokročilejší rozšíření pro prostorová data (GIS systémy, mapové aplikace).

### ARRAY (PostgreSQL)

PostgreSQL umožňuje pole jako datový typ.

```sql
tagy        TEXT[]       -- pole řetězců: {'databaze', 'sql', 'postgresql'}
oceneni     INTEGER[]    -- pole čísel: {5, 4, 5, 3}
```

### XML

Ukládá XML dokument s možností dotazování.

```sql
konfigurace  XML         -- XML dokument
```

---

## 9. Přehled po kategorii

| Kategorie           | Datový typ                                     | Typické použití                      |
|---------------------|------------------------------------------------|--------------------------------------|
| **Celá čísla**      | `TINYINT`, `SMALLINT`, `INT`, `BIGINT`         | ID, počty, věk, roky                 |
| **Desetinná čísla** | `FLOAT`, `DOUBLE`                              | Fyzikální hodnoty, souřadnice        |
| **Přesná desetinná**| `DECIMAL(p,s)`, `NUMERIC(p,s)`                 | Ceny, měny, účetnictví               |
| **Text pevný**      | `CHAR(n)`                                      | Kódy, PSČ, zkratky                   |
| **Text proměnný**   | `VARCHAR(n)`                                   | Jméno, email, popis                  |
| **Dlouhý text**     | `TEXT`, `MEDIUMTEXT`, `LONGTEXT`               | Články, komentáře, HTML              |
| **Datum / čas**     | `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`        | Datum narození, čas vytvoření        |
| **Logická hodnota** | `BOOLEAN`, `BIT`, `TINYINT(1)`                 | Příznaky, aktivace, souhlasy         |
| **Binární data**    | `BLOB`, `MEDIUMBLOB`, `LONGBLOB`               | Obrázky, soubory (nedoporučeno)      |
| **Výčet**           | `ENUM`, `SET`                                  | Stav, kategorie, pohlaví             |
| **JSON**            | `JSON`, `JSONB`                                | Nastavení, metadata, API odpovědi    |
| **UUID**            | `UUID`                                         | Distribuované ID, bezpečné klíče     |
| **Prostorové**      | `POINT`, `POLYGON`, `GEOMETRY`                 | GPS, mapy, GIS systémy               |

---

## 10. Konvence a doporučení z praxe

| Situace                                   | Doporučený typ                  | Proč                               |
|-------------------------------------------|---------------------------------|------------------------------------|
| Primární klíč (malá tabulka)              | `INT` + `AUTO_INCREMENT`        | Rychlý, malý, indexovatelný        |
| Primární klíč (distribuovaný systém)      | `UUID`                          | Globálně unikátní bez koordinace   |
| Cena, finanční částka                     | `DECIMAL(10, 2)`                | Přesná reprezentace, žádné zaokrouhlovací chyby |
| E-mail, URL                               | `VARCHAR(255)`                  | Dostatečná délka, proměnná         |
| Datum vytvoření záznamu                   | `TIMESTAMP DEFAULT NOW()`       | Automaticky vyplněno, v UTC        |
| Příznak (ano/ne)                          | `BOOLEAN` / `TINYINT(1)`        | Úsporné, sémanticky jasné          |
| Stav s omezeným počtem hodnot             | `ENUM`                          | Integrity, čitelnost               |
| Konfigurace / nestandardní schéma         | `JSON` / `JSONB`                | Flexibilita bez změny schématu     |
| Soubory a obrázky                         | `VARCHAR` (cesta) + ext. úložiště | Výkon, škálovatelnost             |
