# Přehled bežných DBMS a jejich charakteristika

V praxi se setkáváme s mnoha různými systémy řízení báze dat. Každý má své specifické vlastnosti, licencování a vhodné použití.

## Relační databázové systémy (RDBMS)

### 1. Oracle Database
*   **Typ:** Komerční, enterprise RDBMS.
*   **Vývojář:** Oracle Corporation.
*   **Charakteristika:**
    *   Jeden z nejrozšířenějších a nejvýkonnějších systémů na světě.
    *   Extrémní spolehlivost, škálovatelnost a bezpečnost.
    *   Podpora PL/SQL (procedurální rozšíření SQL).
*   **Použití:** Bankovnictví, velké podnikové systémy (ERP), kritické aplikace vyžadující maximální dostupnost.
*   **Nevýhody:** Velmi vysoká cena licencí a náročná správa.

### 2. Microsoft SQL Server
*   **Typ:** Komerční RDBMS (existuje Express edice zdarma).
*   **Vývojář:** Microsoft.
*   **Charakteristika:**
    *   Úzce integrován s ekosystémem Windows a .NET.
    *   Vynikající nástroje pro správu (SQL Server Management Studio).
    *   Jazyk T-SQL (Transact-SQL).
*   **Použití:** Firemní aplikace na platformě Windows, střední a velké podniky.
*   **Nevýhody:** Primárně pro Windows (verze pro Linux existuje, ale není tak běžná), cena.

### 3. MySQL / MariaDB
*   **Typ:** Open Source RDBMS.
*   **Vývojář:** Oracle (MySQL) / Komunita (MariaDB - fork MySQL).
*   **Charakteristika:**
    *   Nejpoužívanější open-source databáze pro webové aplikace.
    *   Součást balíku LAMP (Linux, Apache, MySQL, PHP/Python/Perl).
    *   MariaDB vznikla jako reakce na odkoupení MySQL firmou Oracle, aby zůstala svobodná.
*   **Použití:** Webové stránky (WordPress, Joomla), e-shopy, menší až střední aplikace.
*   **Výhody:** Zdarma, velká komunita, snadná dostupnost na hostingu.

### 4. PostgreSQL
*   **Typ:** Open Source objektově-relační DBMS (ORDBMS).
*   **Vývojář:** PostgreSQL Global Development Group.
*   **Charakteristika:**
    *   Považován za nejpokročilejší open-source databázi.
    *   Klade důraz na dodržování standardů SQL a rozšiřitelnost.
    *   Podpora složitých datových typů (JSON, pole, geometrická data - PostGIS).
*   **Použití:** Složité analytické aplikace, GIS systémy, náhrada za Oracle.
*   **Výhody:** Výkon, funkce srovnatelné s komerčními DB, zdarma.

### 5. SQLite
*   **Typ:** Vestavěná (embedded) relační databáze.
*   **Charakteristika:**
    *   Není to klient-server architektura (nemá samostatný proces).
    *   Celá databáze je uložena v jediném souboru na disku.
    *   Knihovna se linkuje přímo do aplikace.
*   **Použití:** Mobilní aplikace (Android, iOS), prohlížeče, desktopové aplikace, malé weby.
*   **Výhody:** Nulová konfigurace, přenositelnost.
*   **Nevýhody:** Není vhodná pro souběžný zápis mnoha uživatelů.

---

## NoSQL Databázové systémy

### 6. MongoDB
*   **Typ:** Dokumentová databáze.
*   **Charakteristika:**
    *   Ukládá data ve formátu podobném JSON (BSON).
    *   Nemá pevné schéma (schema-less) - každý záznam může mít jinou strukturu.
    *   Vysoká škálovatelnost (sharding).
*   **Použití:** Katalogy produktů, systémy pro správu obsahu, aplikace s rychle se měnící strukturou dat.

### 7. Redis
*   **Typ:** Key-Value store (úložiště v paměti), In-Memory Database.
*   **Charakteristika:**
    *   **In-Memory:** Veškerá data jsou primárně uložena v operační paměti (RAM), což zaručuje extrémně rychlé čtení i zápis (v řádech mikrosekund).
    *   **Struktura dat:** Pracuje na principu klíč-hodnota. Hodnotou může být nejen řetězec, ale i složitější struktury (seznamy, množiny, hash mapy).
    *   **Perzistence:** Ačkoliv je "in-memory", data umí ukládat na disk (Snapshoty/RDB nebo Append Only File/AOF), aby se neztratila při restartu.
    *   **Single-threaded:** Zpracovává příkazy sekvenčně v jednom vlákně (eliminuje složité zamykání), ale díky rychlosti RAM to není úzké hrdlo.
*   **Použití:** Caching (mezipaměť pro zrychlení webů), session management (ukládání přihlášení uživatelů), fronty zpráv (Message Queues), žebříčky v hrách (Leaderboards).
*   **Nevýhody:** Velikost databáze je limitována velikostí RAM. Pokud dojde k výpadku proudu a data nebyla stihnutá uložit na disk, jsou ztracena.

### 8. Cassandra
*   **Typ:** Sloupcová databáze (Wide-column store).
*   **Charakteristika:**
    *   Decentralizovaná, nemá master uzel (všechny uzly jsou si rovny).
    *   Lineární škálovatelnost.
    *   Vymyšleno ve Facebooku.
*   **Použití:** Zpracování obrovského množství dat napříč mnoha servery, záznamy senzorů (IoT), chatovací aplikace.

---

## Moderní trendy: Big Data a AI

S nástupem éry umělé inteligence (AI) a velkých dat (Big Data) přestaly klasické databáze stačit pro některé specifické úlohy.

### Big Data technologie
Pro zpracování obrovských objemů dat (petabajty), která přicházejí velkou rychlostí a v různé struktuře (nejen tabulky, ale i logy, videa, texty).
*   **Hadoop Ecosystem (HDFS, Hive, HBase)**: Distribuované úložiště a zpracování dat.
*   **Apache Spark**: Extrémně rychlý engine pro zpracování velkých dat v paměti.
*   **Data Lakes (Datová jezera)**: Úložiště, kam se "sypou" data v surovém formátu pro pozdější analýzu (např. v cloudu AWS S3, Azure Blob Storage).

### Vektorové databáze (pro AI a LLM)
S rozvojem velkých jazykových modelů (LLM - jako GPT, Claude, Llama) vznikla potřeba ukládat a vyhledávat data podle jejich **významu (sémantiky)**, ne podle klíčových slov.

*   **Princip:** Text, obrázek nebo zvuk se pomocí AI modelu převede na tzv. **vektor (embedding)** - dlouhou řadu čísel, která reprezentuje význam dat v n-rozměrném prostoru.
*   **Vyhledávání:** Hledá se "nejbližší soused" (vektor, který je matematicky nejblíže dotazu). To umožňuje najít dokumenty s podobným významem, i když neobsahují stejná slova (např. dotaz "auto" najde i dokument "vozy").
*   **Příklady:**
    *   **Pinecone**: Plně spravovaná cloudová vektorová databáze.
    *   **Milvus**: Open-source vektorová databáze pro velké škálování.
    *   **ChromaDB**: Jednoduchá open-source databáze pro AI aplikace.
    *   **pgvector**: Rozšíření pro PostgreSQL, které umožňuje ukládat vektory přímo v klasické relační databázi.
*   **Použití:** Chatboti s vlastními daty (RAG - Retrieval Augmented Generation), sémantické vyhledávání, doporučovací systémy.
