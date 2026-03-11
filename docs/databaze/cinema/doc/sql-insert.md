# Základní ukázky příkazu INSERT

Příkaz `INSERT` slouží k vkládání nových dat do databáze. Při vkládání do relační databáze jako je `cinema` musíme dodržovat hierarchii určenou cizími klíči (tzv. referenční integritu). 
Nejprve musíme vytvořit základní záznamy ("číselníky" a hlavní entity), a až poté entity, které na ně odkazují.

## 1. Vložení kina (Hlavní entita)

Tabulka `cinema` nemá definované žádné cizí klíče, proto do ní můžeme vložit data jako první.

```sql
INSERT INTO `cinema` (`name`, `street_name`, `street_number`, `city`, `zip_code`, `country_code`) 
VALUES ('Kino Mír', 'Mírové náměstí', '123/4', 'Varnsdorf', '407 47', 'CZ');
```

## 2. Vložení sálu a kategorie sedadel (Podřízené entity)

Následující tabulka `screen` (sál) vyžaduje `cinema_id`. Předpokládáme, že vložené kino výše získá `id` = 1.

```sql
INSERT INTO `screen` (`name`, `capacity`, `description`, `cinema_id`) 
VALUES ('Sál 1', 120, 'Hlavní velký promítací sál s Dolby Atmos', 1);

-- Vytvoření kategorie sedadel (nezávislá tabulka)
INSERT INTO `seat_group` (`name`, `description`) 
VALUES ('Standard', 'Běžná sedadla v sále'),
       ('VIP', 'Polohovatelná kožená sedadla v nejlepších řadách');
```

## 3. Vložení filmu (Události)

Vytvoříme film, který budeme promítat. Tabulka `event` je samostatná entita.

```sql
INSERT INTO `event` (`title`, `runtime_minutes`, `age_rating`, `description`) 
VALUES ('Duna: Část druhá', 166, '12+', 'Pokračování epické sci-fi ságy na planetě Arrakis.');
```

## 4. Vložení zákazníka

Do tabulky `customer` vložíme nového uživatele. Email musí být unikátní (`UNIQUE`).

```sql
INSERT INTO `customer` (`email`, `password`, `firstname`, `surname`) 
VALUES ('jan.novak@example.com', 'hashed_pass_123', 'Jan', 'Novák');
```

## 5. Vytvoření programu (Propojení filmu a sálu do času)

Tabulka `session` zprostředkovává promítání konkrétního filmu (`event_id`) v konkrétním sále (`screen_id`) a daném čase.

```sql
INSERT INTO `session` (`start_time`, `event_id`, `screen_id`) 
VALUES ('2026-03-20 19:30:00', 1, 1);
```

## Hromadné vkládání u ceníků (Cenová matice)

Příkaz `INSERT` umožňuje vkládat vícero záznamů v jednom dotazu. Například, když navážeme ceník pro konkrétní promítání, skupinu sedadel a cenovou kategorii.

```sql
-- Nejprve vytvoříme cenové kategorie
INSERT INTO `price_category` (`name`, `description`) 
VALUES ('Dospělý', 'Základní plná cena'), 
       ('Student', 'Zlevněné vstupné po předložení průkazu');

-- Naplnění cenové matice pro promítání (např. session = 1, seat_group VIP = 2, Dospělý = 1, Student = 2)
INSERT INTO `price` (`session_id`, `seat_group_id`, `price_category_id`, `price`) 
VALUES 
    (1, 2, 1, 250.00), -- VIP dospělý stojí 250 Kč
    (1, 2, 2, 200.00); -- VIP student stojí 200 Kč
```
