# Technická dokumentace schématu `cinema`

Tato část dokumentace detailně rozebírá každou tabulku, její datovou strukturu a vztahy.

## 1. Tabulka `cinema`

**Účel:** Slouží jako kořenová tabulka celého schématu. Reprezentuje fyzickou budovu multikina nebo kulturního centra.

| Atribut         | Datový typ          | Klíč | Modifikátory     | Popis                          |
| --------------- | ------------------- | ---- | ---------------- | ------------------------------ |
| `id`            | `SMALLINT UNSIGNED` | `PK` | `AI`, `NOT NULL` | Unikátní identifikátor kina.   |
| `name`          | `VARCHAR(45)`       |      | `NOT NULL`       | Název kina (např. "Kino Oko"). |
| `street_name`   | `VARCHAR(65)`       |      | `NOT NULL`       | Název ulice.                   |
| `street_number` | `VARCHAR(12)`       |      | `NOT NULL`       | Číslo popisné/orientační.      |
| `city`          | `VARCHAR(45)`       |      | `NOT NULL`       | Město.                         |
| `zip_code`      | `VARCHAR(12)`       |      | `NOT NULL`       | Poštovní směrovací číslo.      |
| `country_code`  | `CHAR(2)`           |      | `NOT NULL`       | ISO kód země (např. "CZ").     |

---

## 2. Tabulka `screen`

**Účel:** Reprezentuje konkrétní sál v daném kině.

| Atribut       | Datový typ          | Klíč | Modifikátory     | Popis                                  |
| ------------- | ------------------- | ---- | ---------------- | -------------------------------------- |
| `id`          | `SMALLINT UNSIGNED` | `PK` | `AI`, `NOT NULL` | Identifikátor sálu.                    |
| `name`        | `VARCHAR(12)`       |      | `NOT NULL`       | Označení sálu (např. "Sál 1", "IMAX"). |
| `capacity`    | `SMALLINT UNSIGNED` |      | `DEFAULT 0`      | Celkový počet míst v sále.             |
| `description` | `TEXT`              |      | `NULL`           | Technické parametry sálu.              |
| `cinema_id`   | `SMALLINT UNSIGNED` | `FK` | `NOT NULL`       | Vazba na kino.                         |

- **Vazby:** N:1 k tabulce `cinema`.
- **Referenční omezení:** `ON DELETE CASCADE`, `ON UPDATE CASCADE` (smazání kina smaže všechny jeho sály).

---

## 3. Tabulka `seat_group`

**Účel:** Sdružuje sedadla do logických skupin pro potřeby nacenění (např. Standardní zóna vs. VIP balkon).

| Atribut       | Datový typ          | Klíč | Modifikátory     | Popis                       |
| ------------- | ------------------- | ---- | ---------------- | --------------------------- |
| `id`          | `SMALLINT UNSIGNED` | `PK` | `AI`, `NOT NULL` | ID skupiny sedadel.         |
| `name`        | `VARCHAR(45)`       |      | `NOT NULL`       | Název skupiny.              |
| `description` | `VARCHAR(255)`      |      | `NULL`           | Bližší popis výhod skupiny. |

---

## 4. Tabulka `seat`

**Účel:** Evidence konkrétních fyzických sedadel v sálech.

| Atribut         | Datový typ           | Klíč | Modifikátory     | Popis                               |
| --------------- | -------------------- | ---- | ---------------- | ----------------------------------- |
| `id`            | `MEDIUMINT UNSIGNED` | `PK` | `AI`, `NOT NULL` | ID sedadla.                         |
| `row`           | `VARCHAR(6)`         |      | `NOT NULL`       | Označení řady (číslo nebo písmeno). |
| `seat_number`   | `TINYINT UNSIGNED`   |      | `NOT NULL`       | Číslo sedadla v řadě.               |
| `screen_id`     | `SMALLINT UNSIGNED`  | `FK` | `NOT NULL`       | Vazba na sál.                       |
| `seat_group_id` | `SMALLINT UNSIGNED`  | `FK` | `NOT NULL`       | Vazba na cenovou skupinu.           |

- **Vazby:** N:1 k `screen` a N:1 k `seat_group`.
- **Integrita:** `UNIQUE INDEX` na (`screen_id`, `row`, `seat_number`) brání duplicitám v sále.

---

## 5. Tabulka `event`

**Účel:** Katalog událostí, které lze v kině pořádat (filmy, konference, přenosy).

| Atribut           | Datový typ           | Klíč | Modifikátory     | Popis                             |
| ----------------- | -------------------- | ---- | ---------------- | --------------------------------- |
| `id`              | `MEDIUMINT UNSIGNED` | `PK` | `AI`, `NOT NULL` | ID události.                      |
| `title`           | `VARCHAR(45)`        |      | `NOT NULL`       | Název filmu nebo akce.            |
| `runtime_minutes` | `SMALLINT UNSIGNED`  |      | `NOT NULL`       | Stopáž v minutách.                |
| `age_rating`      | `VARCHAR(10)`        |      | `NULL`           | Věková přístupnost (např. "12+"). |
| `description`     | `TEXT`               |      | `NULL`           | Synopse nebo program akce.        |

---

## 6. Tabulka `session`

**Účel:** Plánované promítání nebo konání události v čase a prostoru.

| Atribut      | Datový typ           | Klíč | Modifikátory     | Popis             |
| ------------ | -------------------- | ---- | ---------------- | ----------------- |
| `id`         | `MEDIUMINT UNSIGNED` | `PK` | `AI`, `NOT NULL` | ID sezení.        |
| `start_time` | `DATETIME`           |      | `NOT NULL`       | Čas začátku akce. |
| `event_id`   | `MEDIUMINT UNSIGNED` | `FK` | `NOT NULL`       | Vazba na událost. |
| `screen_id`  | `SMALLINT UNSIGNED`  | `FK` | `NOT NULL`       | Vazba na sál.     |

- **Vazby:** N:1 k `event` a N:1 k `screen`.
- **Referenční omezení:** `ON DELETE RESTRICT` (nelze smazat film, pokud má naplánované sezení).
- **Integrita:** `UNIQUE INDEX` na (`start_time`, `screen_id`) brání kolizi akcí v jednom sále.

---

## 7. Tabulka `customer`

**Účel:** Evidence osobních údajů uživatelů.

| Atribut     | Datový typ           | Klíč | Modifikátory     | Popis                                |
| ----------- | -------------------- | ---- | ---------------- | ------------------------------------ |
| `id`        | `MEDIUMINT UNSIGNED` | `PK` | `AI`, `NOT NULL` | ID zákazníka.                        |
| `email`     | `VARCHAR(45)`        | `UK` | `NOT NULL`       | Unikátní emailová adresa.            |
| `password`  | `VARCHAR(255)`       |      | `NULL`           | Hash hesla (pouze u registrovaných). |
| `firstname` | `VARCHAR(45)`        |      | `NULL`           | Křestní jméno.                       |
| `surname`   | `VARCHAR(45)`        |      | `NULL`           | Příjmení.                            |

---

## 8. Tabulka `reservation`

**Účel:** Zastřešuje nákupní proces. Spojuje zákazníka s konkrétním sezením.

| Atribut       | Datový typ           | Klíč | Modifikátory     | Popis                      |
| ------------- | -------------------- | ---- | ---------------- | -------------------------- |
| `id`          | `MEDIUMINT UNSIGNED` | `PK` | `AI`, `NOT NULL` | ID rezervace.              |
| `created_at`  | `DATETIME`           |      | `DEFAULT NOW`    | Čas vytvoření rezervace.   |
| `total_price` | `DECIMAL(10,2)`      |      | `DEFAULT 0`      | Celková vypočtená cena.    |
| `is_paid`     | `TINYINT UNSIGNED`   |      | `DEFAULT 0`      | Stav platby (0=ne, 1=ano). |
| `session_id`  | `MEDIUMINT UNSIGNED` | `FK` | `NOT NULL`       | Vazba na sezení.           |
| `customer_id` | `MEDIUMINT UNSIGNED` | `FK` | `NULL`           | Vazba na zákazníka.        |

- **Vztahy:** N:1 k `session` a N:1 k `customer`.
- **Referenční omezení:** `ON DELETE SET NULL` u zákazníka (GDPR – anonymizace při zachování tržeb).

---

## 9. Tabulka `ticket`

**Účel:** Vazební tabulka (Ticket) definující, které sedadlo v rámci rezervace patří ke které cenové kategorii.

| Atribut             | Datový typ           | Klíč     | Modifikátory | Popis                        |
| ------------------- | -------------------- | -------- | ------------ | ---------------------------- |
| `reservation_id`    | `MEDIUMINT UNSIGNED` | `PK, FK` | `NOT NULL`   | Vazba na rezervaci.          |
| `seat_id`           | `MEDIUMINT UNSIGNED` | `PK, FK` | `NOT NULL`   | Vazba na sedadlo.            |
| `price_category_id` | `SMALLINT UNSIGNED`  | `FK`     | `NOT NULL`   | Tarif (Dospělý, Student...). |

- **Primární klíč:** Složený klíč (`reservation_id`, `seat_id`) – jedno sedadlo může být v rezervaci jen jednou.
- **Referenční omezení:** `ON DELETE CASCADE` u rezervace (storno rezervace maže lístky).

---

## 10. Tabulka `price`

**Účel:** Cenová matice určující cenu lístku pro každé promítání, typ sedadla a tarif.

| Atribut             | Datový typ           | Klíč     | Modifikátory | Popis                    |
| ------------------- | -------------------- | -------- | ------------ | ------------------------ |
| `session_id`        | `MEDIUMINT UNSIGNED` | `PK, FK` | `NOT NULL`   | Pro které promítání.     |
| `seat_group_id`     | `SMALLINT UNSIGNED`  | `PK, FK` | `NOT NULL`   | Pro kterou zónu sedadel. |
| `price_category_id` | `SMALLINT UNSIGNED`  | `PK, FK` | `NOT NULL`   | Pro který tarif (věk).   |
| `price`             | `DECIMAL(10,2)`      |          | `NOT NULL`   | Finální cena v měně.     |
