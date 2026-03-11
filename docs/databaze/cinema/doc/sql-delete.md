# Základní ukázky příkazu DELETE

Příkaz `DELETE` slouží k odstraňování záznamů z databáze. 
Podobně jako u `UPDATE`, pokud vynecháme podmínku `WHERE`, vymažeme **všechna data v tabulce**!

Relační databáze se brání chybnému mazání pomocí integritních omezení (vazeb cizích klíčů). Databáze *cinema* používá klauzule jako `ON DELETE CASCADE` (kaskádové mazání), `ON DELETE RESTRICT` (zákaz mazání) a `ON DELETE SET NULL`.

## 1. Zrušení promítání bez rezervací

Zrušení naplánovaného promítání z důvodu nemoci herců/technických důvodů. Promítání (`session`) je smazáno.
Zde funguje kaskádování: `ON DELETE CASCADE` v tabulce `price` způsobí, že navázaný ceník k tomuto času promítání zmizí spolu ním. Ovšem kdyby na tuto událost již existovala `reservation` (rezervace nespadají do kaskády, ale na `RESTRICT`), databáze vám tento dotaz zamítne.

```sql
DELETE FROM `session` 
WHERE `id` = 15;
```

## 2. Vymazání lístku (Zrušení části objednávky)

Zákazník se rozhodl, že jeden z přátel nakonec nedorazí. Zruší tak z rezervace jeden konkrétní lístek, čímž uvolní konkrétní sedadlo spojené se stejnou rezervací (vazba složeného primárního klíče na obě ID naráz).

```sql
DELETE FROM `ticket` 
WHERE `reservation_id` = 412 AND `seat_id` = 55;
```

## 3. Zrušení účtu zákazníka (Např. žádost o zapomenutí dle GDPR)

Zákazník chce zrušit profil na platformě. Použijeme klasické odstranění podle ID.

```sql
DELETE FROM `customer` 
WHERE `id` = 99;
```
**Důležité upozornění pro tento příklad:** 
Tabulka `reservation` má na zákazníka referenční klíč nastavený jako `ON DELETE SET NULL`. To znamená, že vymazáním zákazníka (číslo 99) se nesmažou jeho minulé rezervace (kino potřebuje historické záznamy kvůli tržbám a účetnictví), ale do sloupce `customer_id` v tabulce `reservation` u jeho minulých nákupů se automaticky vloží `NULL`.

## 4. Nepovolené smazání (Ukázka `ON DELETE RESTRICT`)

Představme si, že se pokusíme smazat cenovou kategorii "Student" z číselníku `price_category`.

```sql
-- Tento dotaz skončí pravděpodobně chybou
DELETE FROM `price_category` 
WHERE `name` = 'Student';
```
K zablokování dojde, protože existuje již prodaný `ticket` a také `price` (ceník), které tuto kategorii již využívají.
Konkrétně vazba `fk_ticket_price_category` uvádí: `ON DELETE RESTRICT`. Databáze nás tak nenechá smazat data, která aktivně používá historie či ceníky.
