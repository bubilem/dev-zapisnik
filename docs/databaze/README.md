# Databáze a SQL

Tato sekce obsahuje studijní materiály týkající se databázových systémů, návrhu databází a jazyka SQL.

## Obsah

### Teorie
V této části se seznámíte se základními principy a koncepty.

*   **[1. Úvod do databází](doc/01-uvod-do-databazi.md)**  
    Definice databáze, historie, základní pojmy (data, informace, znalost).
*   **[2. Systémy řízení báze dat (SŘBD / DBMS)](doc/02-dbms.md)**  
    Architektura databázových systémů, typy databází (relační, NoSQL), transakce (ACID).
*   **[3. Konceptuální modelování (ER diagramy)](doc/03-konceptualni-modelovani.md)**  
    Jak navrhnout strukturu databáze. Entity, atributy, vztahy, kardinalita.
*   **[4. Relační model dat](doc/04-relacni-model-dat.md)**  
    Tvorba tabulek, primární a cizí klíče, vazby.
*   **[5.Převod ER do RMD ](doc/06-rmd-normalizace.md)**
    Převod konceptuálního modelu do relačního modelu dat.
*   **[6. Normalizace](doc/06-sql.md)**
    Normalizační proces, 1NF, 2NF...
*   **[7.Další modely](doc/07-dalsi-modely.md)**
    OODBMS, noSQL...
*   **[8. Datové typy](doc/08-datove-typy.md)**
    Číselné typy, textové typy, typy pro datum a čas.

### Praktické ukázky a projekty

*   **[Projekt Cinema](cinema/README.md)**  
    Komplexní ukázkový projekt pro fiktivní síť kin. Obsahuje návrh databáze, SQL skripty pro vytvoření tabulek a naplnění daty, a příklady dotazů. Slouží k procvičení:
    *   Návrhu struktury (ERD).
    *   DDL příkazů (`CREATE TABLE`, `ALTER`). WIP
    *   DML příkazů (`INSERT`, `SELECT`, `JOIN`). WIP

---

## Doporučené nástroje
*   **MySQL Workbench** nebo **phpMyAdmin** pro správu databází.
*   **Draw.io** pro kreslení ER diagramů.
