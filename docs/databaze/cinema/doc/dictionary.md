# Datový slovník: Rezervační systém pro víceúčelová kina

Tento dokument obsahuje detailní popis databázového schématu `cinema`. Systém je navržen tak, aby obsloužil nejen promítání filmů, ale i konference, přednášky a jiné kulturní události.

## 1. Přehled tabulek

### 1.1 Fyzická struktura kina

- **`cinema`**: Základní entita reprezentující budovu kina/centra.
- **`screen`**: Jednotlivé sály v rámci kina. (Vazba 1:N na `cinema`).
- **`seat_group`**: Kategorizace sedadel (např. Standard, VIP, Love-seats). Umožňuje hromadné naceňování.
- **`seat`**: Konkrétní fyzické sedadlo v sále.
- **`seat_attribute`**: Číselník vlastností (např. "Bezbariérový přístup", "Vyhřívané").
- **`seat_feature`**: Vazební tabulka (M:N) mezi sedadly a jejich vlastnostmi.

### 1.2 Program a události

- **`event`**: Katalog obsahu (filmy, konference). Obsahuje metadata jako délku a přístupnost.
- **`session`**: Konkrétní výskyt události v čase a sále (např. "Duna v sále 1, pondělí 18:00").
- **`price`**: Cenová matice definující cenu pro kombinaci `session`, `seat_group` a `price_category`.

### 1.3 Rezervace a prodej

- **`customer`**: Evidence uživatelů. Podporuje registrované i "hosty" (pouze email).
- **`reservation`**: Hlavička rezervace zastřešující nákup více lístků.
- **`price_category`**: Typy tarifů (např. Dospělý, Student, Senior).
- **`ticket`**: Klíčová entita reprezentující konkrétní prodané místo (Vazba mezi `reservation`, `seat` a `price_category`).

---

## 2. Detailní popis atributů (Výběr klíčových polí)

| Tabulka       | Atribut           | Typ           | Omezení     | Popis                                            |
| ------------- | ----------------- | ------------- | ----------- | ------------------------------------------------ |
| `cinema`      | `country_code`    | `CHAR(2)`     | `NOT NULL`  | ISO 3166-1 alpha-2 kód země (např. "CZ").        |
| `event`       | `runtime_minutes` | `SMALLINT U`  | `NOT NULL`  | Délka události v minutách.                       |
| `session`     | `start_time`      | `DATETIME`    | `NOT NULL`  | Datum a přesný čas začátku akce.                 |
| `reservation` | `is_paid`         | `TINYINT U`   | `DEFAULT 0` | Boolean příznak stavu platby.                    |
| `customer`    | `email`           | `VARCHAR(45)` | `UNIQUE`    | Unikátní identifikátor pro přihlášení a kontakt. |
| `ticket`      | `reservation_id`  | `MEDIUMINT U` | `PK, FK`    | Vazba na nadřazenou rezervaci.                   |

---

## 3. Vztahy a Kardinality

### 1:N (Jeden k mnoha)

- **`cinema` : `screen**`
- _Kardinalita:_ 1:N. Jedno kino má mnoho sálů. Sál patří právě jednomu kinu.
- _Parcialita:_ Povinná (Sál nemůže existovat bez kina).

- **`event` : `session**`
- _Kardinalita:_ 1:N. Jeden film může mít mnoho promítání. Promítání patří k jednomu filmu.
- _Parcialita:_ Povinná.

### M:N (Mnoho k mnoha) – Implementováno vazebními tabulkami

- **`seat` : `seat_attribute` (přes `seat_feature`)**
- Sedadlo může mít více vlastností, vlastnost může patřit mnoha sedadlům.

- **`reservation` : `seat` (přes `ticket`)**
- Jedna rezervace obsahuje více sedadel, sedadlo (v rámci různých `session`) může figurovat v mnoha rezervacích.

---

## 4. Integritní omezení a Referenční integrita

Systém využívá pokročilá omezení pro zajištění čistoty dat bez nutnosti aplikační logiky:

- **UNIQUE INDEX `unique_seat_idx**`: V rámci jednoho sálu (`screen_id`) nesmí existovat dvě sedadla se stejnou řadou a číslem.
- **UNIQUE INDEX `unique_dttm_screen_idx**`: V jednom sále nesmí ve stejný čas začít dvě různé události (`session`).
- **ON DELETE CASCADE**: Použito u technických vazeb (např. smažeš-li rezervaci, automaticky zmizí její lístky).
- **ON DELETE RESTRICT**: Brání smazání dat, která jsou v užívání (např. nelze smazat sál, pokud jsou v něm naplánované akce).
- **ON DELETE SET NULL**: Použito u vazby `reservation` -> `customer`. Při smazání účtu zákazníka (GDPR) zůstane rezervace zachována pro statistiky tržeb, ale osobní údaje jsou odpojeny.

---

### Poznámka pro studenty

Při práci s touto databází dbejte na pořadí vkládání dat. Nejdříve musí existovat "číselníky" (`cinema`, `event`, `seat_group`), až poté lze vytvářet konkrétní instance (`session`, `seat`) a nakonec transakční data (`reservation`, `ticket`).
