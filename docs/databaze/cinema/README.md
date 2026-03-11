# Cinema & Event Booking System

Tento projekt představuje komplexní relační databázi pro správu rezervačního systému víceúčelových kin. Byl navržen jako výuková pomůcka pro studenty k pochopení pokročilého návrhu databází, referenční integrity a dynamické cenotvorby.

## O projektu

Systém není omezen pouze na filmy. Díky obecné entitě `event` a časovým blokům `session` dokáže spravovat:

- **Filmová promítání** (s hlídáním věkové přístupnosti).
- **Odborné konference** a přednášky.
- **Kulturní vystoupení** (stand-up, divadlo).

Hlavní předností modelu je **dynamická cenotvorba**, která vypočítává cenu lístku na základě kombinace času akce, zóny sedadla v sále a věkové kategorie návštěvníka.

---

## Struktura repozitáře

Projekt je rozdělen do logických celků pro snadnou orientaci:

### `/doc`: Dokumentace projektu.
- [analysis.md](doc/analysis.md): Původní byznys analýza a požadavky.
- [dictionary.md](doc/dictionary.md): Podrobný technický popis tabulek a atributů.
- [tables.md](doc/tables.md): Tabulky databáze.
- [er-schema.md](doc/er-schema.md): E-R schéma databáze.

### `/database`: SQL skripty a modely.
- [model/cinema.mwb](database/model/cinema.mwb): Zdrojový soubor pro MySQL Workbench.
- [scripts/01-schema.sql](database/scripts/01-schema.sql): Skript pro vytvoření struktury databáze.

### Příklady SQL dotazů (DML)
- [sql-insert.md](doc/sql-insert.md): Ukázky vkládání (Kina, Sály, Rezervace).
- [sql-update.md](doc/sql-update.md): Ukázky aktualizace (Změny údajů, kapacity, uložení platby).
- [sql-delete.md](doc/sql-delete.md): Ukázky mazání dat s ohledem na kaskádová omezení.
- [sql-select.md](doc/sql-select.md): Ukázky dotazování (Spojení přes JOIN, filtry a agregace).

---

## Klíčové vzdělávací cíle

Studenti si na tomto projektu procvičí:

1. **Normalizaci dat:** Rozklad komplexních vztahů do efektivních tabulek.
2. **Referenční integritu:** Nastavení `CASCADE`, `RESTRICT` a `SET NULL` pro ochranu dat (včetně souladu s GDPR).
3. **Komplexní indexování:** Použití unikátních složených indexů pro prevenci kolizí (např. v sálech).
4. **Business Logiku v SQL:** Práci s cenovou maticí a transakčními daty.

---

## Licence

Tento projekt je určen pro vzdělávací účely. Můžete jej volně používat a upravovat pro svou vlastní výuku.
