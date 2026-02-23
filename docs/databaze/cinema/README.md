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

- **`/doc`**: Dokumentace projektu.
- `analysis.md`: Původní byznys analýza a požadavky.
- `dictionary.md`: Podrobný technický popis tabulek a atributů.

- **`/database`**: SQL skripty a modely.
- `model/cinema.mwb`: Zdrojový soubor pro MySQL Workbench.
- `scripts/01-schema.sql`: Skript pro vytvoření struktury databáze.
- `scripts/02-data.sql`: Ukázková data pro testování (WIP).

- **`/examples`**: Praktické ukázky SQL dotazů (SELECTy, reporty).

---

## Instalace a zprovoznění

Pro zprovoznění databáze na vašem lokálním stroji postupujte následovně:

1. **Klonování repozitáře:**

```bash
git clone https://github.com/bubilem/cinema.git

```

2. **Vytvoření schématu:**
   Otevřete MySQL Workbench (nebo jiný nástroj) a spusťte skript:
   `database/scripts/01-schema.sql`
3. **Import dat:**
   Pro naplnění databáze testovacími daty spusťte:
   `database/scripts/02-data.sql`(WIP)

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
