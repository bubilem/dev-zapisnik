# Úvod do databází

## 1. Základní pojmy

Při studiu databází je důležité rozlišovat mezi několika základními termíny, které se často zaměňují.

### Data vs. Informace
*   **Data**: Jsou to surová, nezpracovaná fakta, čísla, texty nebo symboly, které samy o sobě nemají konkrétní význam (např. číslo `38.5`).
*   **Informace**: Jsou data zasazená do kontextu, která mají pro příjemce význam a snižují jeho nejistotu (např. `Teplota pacienta je 38.5 °C`).
*   **Znalost**: Je to informace aplikovaná v praxi nebo propojená s jinými informacemi a zkušenostmi (např. `Pacient má horečku, je nutné podat lék`).

### Databáze (DB)
Databáze je organizovaná sbírka dat, která jsou uložena v počítačovém systému tak, aby s nimi bylo možné efektivně pracovat (vyhledávat, přidávat, měnit, mazat). Je to pasivní složka systému – samotná data.

### Systém řízení báze dat (SŘBD / DBMS)
*DBMS (Database Management System)* je software, který zajišťuje interakci mezi uživatelem (nebo aplikací) a databází.
**Hlavní funkce DBMS:**
*   Definice dat (DDL - Data Definition Language).
*   Manipulace s daty (DML - Data Manipulation Language).
*   Řízení přístupu a bezpečnosti.
*   Zajištění integrity dat (Constrainty).
*   Transakční zpracování - zajištění **ACID** vlastností:
    *   **A**tomicity (Atomicita): Transakce se provede celá nebo vůbec.
    *   **C**onsistency (Konzistence): Databáze je před i po transakci ve validním stavu.
    *   **I**solation (Izolace): Transakce se neovlivňují navzájem.
    *   **D**urability (Trvalost): Potvrzená data jsou trvale uložena i při výpadku napájení.
*   Zálohování a obnova.

*Příklady DBMS:* MySQL, PostgreSQL, Oracle Database, Microsoft SQL Server, SQLite, MongoDB.

### Databázový systém (DBS)
Databázový systém je celkový systém skládající se z:
1.  **Dat** (samotné DB).
2.  **Softwaru** (DBMS).
3.  **Hardwaru** (servery, úložiště, sítě).
4.  **Uživatelů** (administrátoři, vývojáři, koncoví uživatelé).

Vztah lze zapsat jako: **DBS = DB + DBMS**.

---

## 2. Historie a evoluce databází

Vývoj databází lze rozdělit do několika generací, které odrážejí technologický pokrok a měnící se potřeby zpracování dat.

### 1. Generace: Souborové systémy (50. - 60. léta)
*   Data byla ukládána v plochých souborech (flat files).
*   Každá aplikace měla svá vlastní data -> **redundance** (duplication) a **inkonzistence**.
*   Závislost dat na programu (změna struktury dat vyžadovala přepsání programu).
*   Žádné standardy pro přístup.

### 2. Generace: Hierarchické a síťové modely (60. - 70. léta)
*   Snaha o centralizaci dat.
*   \*\*IDS (Integrated Data Store)\*\* - první DBMS (Charles Bachman).
*   **Hierarchický model (např. IMS od IBM)**: Struktura stromu (rodič-potomek). Rychlé, ale nepružné pro složitější vztahy (nemožnost M:N vztahu přímo).
*   **Síťový model (CODASYL)**: Zobecnění hierarchického, potomek může mít více rodičů (graf). Složitá navigace a údržba.

### 3. Generace: Relační databáze (70. léta - současnost)
*   **Edgar F. Codd** (1970) publikoval práci "A Relational Model of Data for Large Shared Data Banks".
*   Data jsou organizována do tabulek (relací).
*   Vztahy jsou realizovány pomocí klíčů (Primary Key, Foreign Key).
*   Nezávislost dat na aplikaci.
*   Vznik jazyka **SQL** (Structured Query Language).
*   Dominantní technologie dodnes (Oracle, DB2, SQL Server, MySQL).

### 4. Generace: Objektové a Objektově-relační (80. - 90. léta)
*   **OODBMS**: Ukládání objektů tak, jak jsou v programovacím jazyce. Neuchytilo se masově.
*   **ORDBMS**: Rozšíření relačních databází o objektové prvky (dědičnost, uživatelské typy, metody). Většina dnešních RDBMS je objektově-relačních.

### Moderní éra: NoSQL a Big Data (2000+)
*   Hnaná potřebou webových gigantů (Google, Amazon, Facebook) škálovat horizontálně a zpracovávat nestrukturovaná data.
*   **NoSQL**: Not Only SQL. Různé modely (Dokumentové, Key-Value, Grafové).
*   **NewSQL**: Snaha spojit škálovatelnost NoSQL s ACID vlastnostmi relačních DB (např. CockroachDB).

---

## 3. Datové modely

Datový model definuje logickou strukturu dat a určuje, jak jsou data uložena, organizována a jak se s nimi manipuluje.

### 1. Hierarchický model
*   Data organizována do stromové struktury.
*   Každý záznam má jednoho rodiče (kromě kořene).
*   **Výhody**: Rychlý přístup, pokud známe cestu.
*   **Nevýhody**: Rigidní struktura, nelze modelovat vztahy M:N bez duplicit.

### 2. Síťový model
*   Data organizována v grafu.
*   Záznam může mít více rodičů.
*   **Výhody**: Flexibilnější než hierarchický.
*   **Nevýhody**: Velmi složitá struktura a manipulace („navigace v síti“).

### 3. Relační model
*   Založen na matematické teorii množin.
*   Data uložena v tabulkách (řádky a sloupce).
*   **Výhody**: Jednoduchost, flexibilita, standardizace (SQL), nezávislost dat.
*   **Nevýhody**: Horší výkon při extrémně složitých vztazích nebo obrovském objemu nestrukturovaných dat.

### 4. NoSQL Modely
*   **Key-Value (Klíč-Hodnota)**: Nejjednodušší, jako hash mapa (Redis).
*   **Dokumentový**: Ukládá data jako dokumenty (JSON, XML). Flexibilní schéma (MongoDB).
*   **Sloupcový (Column-family)**: Data uložena po sloupcích, nikoliv řádcích. Vhodné pro analytiku (Cassandra).
*   **Grafový**: Ukládá uzly a hrany. Ideální pro sociální sítě a složité vztahy (Neo4j).

---

## 4. Architektury databázových systémů

Architektura určuje, jak jsou rozmístěny komponenty DBS (aplikace, DBMS, data) v počítačové síti.

### Centralizovaná architektura
*   Vše (DBMS, data, aplikace) běží na jednom výkonném počítači (mainframe).
*   Uživatelé se připojují přes "hloupé" terminály, které jen zobrazují výstup.
*   **Výhody**: Jednoduchá správa, bezpečnost.
*   **Nevýhody**: Drahý HW, jediný bod selhání, omezená škálovatelnost.

### Architektura Klient-Server (Client-Server)
Rozdělení zátěže mezi klientskou stanici a server.

1.  **File-Server (Souborový server)**:
    *   Server poskytuje pouze soubory. Veškeré zpracování (filtrování, třídění) probíhá na klientovi.
    *   **Nevýhoda**: Obrovská zátěž sítě (přenáší se celá tabulka, i když chci jen 1 řádek).

2.  **Database-Server (Two-Tier / Dvojvrstvá)**:
    *   **Klient (Fat Client)**: Obsahuje aplikační logiku a GUI. Posílá SQL dotazy.
    *   **Server**: Obsahuje DBMS a data. Vykoná dotaz a vrací jen výsledek.
    *   **Výhoda**: Menší zátěž sítě.
    *   **Nevýhoda**: Těžká údržba klientů (při změně aplikace se musí aktualizovat u všech uživatelů).

3.  **Třívrstvá architektura (Three-Tier)**:
    *   **1. Prezentační vrstva (Klient)**: Tenký klient (webový prohlížeč). Jen zobrazuje GUI.
    *   **2. Aplikační vrstva (Application Server)**: Obsahuje business logiku (Java, PHP, C#). Zpracovává požadavky klienta a komunikuje s DB.
    *   **3. Datová vrstva (DB Server)**: Pouze data a DBMS.
    *   **Výhody**: Snadná údržba (změny jen na aplikačním serveru), škálovatelnost, bezpečnost.

### Distribuovaná architektura
*   Logicky jedna databáze, ale fyzicky rozdělená na více počítačích (uzlech) v síti.
*   Transparentnost pro uživatele (neví, kde data leží).
*   **Fragmentace**: Rozdělení tabulek na části.
*   **Replikace**: Kopírování dat na více uzlů (zvýšení dostupnosti).
