# Základní ukázky příkazu UPDATE

Příkaz `UPDATE` slouží k aktualizaci již existujících dat v databázi. 
Pamatujte, že pokud zapomenete napsat podmínku `WHERE`, změníte hodnoty **ve všech řádcích** v tabulce!

## 1. Aktualizace profilu zákazníka

Zákaznice (např. se změněným příjmením nebo emailem) si potřebuje aktualizovat své údaje. 
Upravujeme klíčové sloupce na základě jejího unikátního `id`.

```sql
UPDATE `customer` 
SET `email` = 'jana.novakova.new@example.com',
    `surname` = 'Nováková' 
WHERE `id` = 12;
```

## 2. Zvýšení kapacity sálu (Změna fyzické struktury)

Při rekonstrukci kina jsme do Sálu 1 přidali dalších 20 míst navíc k původním 120.

```sql
UPDATE `screen` 
SET `capacity` = `capacity` + 20, 
    `description` = 'Hlavní velký promítací sál s Dolby Atmos (po rekonstrukci)' 
WHERE `id` = 1;

-- Nebo natvrdo:
UPDATE `screen` 
SET `capacity` = 140 
WHERE `id` = 1;
```

## 3. Označení rezervace jako zaplacené (Klíčová byznys logika)

Zákazník právě zaplatil za své lístky (např. platba kartou proběhla úspěšně). Vlajku `is_paid` změníme z 0 na 1 (false na true).

```sql
UPDATE `reservation` 
SET `is_paid` = 1 
WHERE `id` = 5024;
```

## 4. Hromadná úprava cen pro konkrétní událost

Potřebujeme dočasně zlevnit všechny ceny za lístky pro první ranní promítání (`session_id = 45`) o 10 %.
Zde nám nepomůže ID, musíme kombinovat podmínky na základě cizích klíčů.

```sql
UPDATE `price` 
SET `price` = `price` * 0.9 
WHERE `session_id` = 45;
```

## 5. Změna data u odloženého promítání filmu

Z technických důvodů se promítání filmu posouvá o dvě hodiny dopředu (nastane později). Od původního času přičteme interval 2 hodin.

```sql
UPDATE `session` 
SET `start_time` = DATE_ADD(`start_time`, INTERVAL 2 HOUR) 
WHERE `id` = 88;
```
