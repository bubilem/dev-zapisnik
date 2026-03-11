# Základní ukázky příkazu SELECT

Příkaz `SELECT` je nejčastějším SQL dotazem. Slouží k získávání a filtrování dat. Pomocí klauzulí jako `JOIN` pak můžeme natahovat data přes celou šíři databázového E-R schématu a díky provázání (primární/cizí klíč) je spojovat do strukturovaných přehledů.

## 1. Zobrazení všech kin (Jednoduchý výpis)

Nejzákladnější použití bez jakéhokoliv propojení tabulky vypíše všechny hodnoty.

```sql
SELECT `id`, `name`, `city`, `street_name`, `country_code`
FROM `cinema`;
```

## 2. Výpis programu sálu pro dnešní den (Jednoduché filtry na čas)

Zajímá nás, které filmy se dnes ještě promítají, a vyfiltrujeme je tak, aby výsledkem byly pouze časy v budoucnosti, ovšem před půlnocí. K tomu je potřeba spojit `session` a samotný `event`, protože `session` jméno filmu nezná.

```sql
SELECT 
    session.start_time AS 'Začátek',
    event.title AS 'Film',
    event.runtime_minutes AS 'Délka (min)'
FROM `session`
JOIN `event` ON session.event_id = event.id
WHERE 
    session.start_time >= NOW() -- Již probíhající / zrušené neukazovat
    AND session.start_time < CURRENT_DATE() + INTERVAL 1 DAY -- Odkrojit do půlnoci dnešního dne
ORDER BY session.start_time ASC;
```

## 3. Detail rezervace (Spojení více tabulek naráz)

Zákazník nebo obsluha potřebuje nahlédnout na detaily rezervace, aby se ověřila úhrada a zjistilo se o jaký sál, film a sedadla se jedná.

```sql
SELECT 
    reservation.id AS 'Č. rez.',
    customer.email AS 'E-mail zákazníka',
    reservation.total_price AS 'Celková cena',
    reservation.is_paid AS 'Zaplaceno',
    event.title AS 'Film',
    screen.name AS 'Sál',
    seat.row AS 'Řada',
    seat.seat_number AS 'Sedadlo',
    price_category.name AS 'Kategorie lístku'
FROM `reservation`
LEFT JOIN `customer` ON reservation.customer_id = customer.id -- Left join pro anonymní (NULL) zákazníky
JOIN `session` ON reservation.session_id = session.id
JOIN `event` ON session.event_id = event.id
JOIN `screen` ON session.screen_id = screen.id
JOIN `ticket` ON reservation.id = ticket.reservation_id
JOIN `seat` ON ticket.seat_id = seat.id
JOIN `price_category` ON ticket.price_category_id = price_category.id
WHERE reservation.id = 1004; -- Naše hledaná rezervace
```

## 4. Očekávané sumární měsíční tržby (Agregace - Group By)

Mnoho dat se v byznysu využívá pro přehledy. Můžeme si pomocí sečtení (`SUM()`) posčítat např. útraty z rezervací (které již byly zaplacené) s tím, že využijeme seskupení výpisu dat `GROUP BY` tak k sobě připárujeme měsíce a tržby.

```sql
SELECT 
    YEAR(reservation.created_at) AS 'Rok',
    MONTH(reservation.created_at) AS 'Měsíc',
    SUM(reservation.total_price) AS 'Celkové tržby'
FROM `reservation`
WHERE reservation.is_paid = 1
GROUP BY 
    YEAR(reservation.created_at), 
    MONTH(reservation.created_at)
ORDER BY Rok DESC, Měsíc DESC;
```

## 5. Kapacita a vlastnosti sedadel dle kinosálů (Sčítání záznamů)

Jaké a kolik máme sedadel u sálu č. 1, jež spadají do vlastností pro vozíčkáře. Potřebujeme spojit vlastnosti `seat_attribute` (rozluštění čísla na text přes spojovací tabulku `seat_feature`) s fyzickým sedadlem `seat` a ucelit jej na počet kusů u konkrétního sálu `screen`.

```sql
SELECT 
    screen.name AS 'Kinosál',
    seat_attribute.name AS 'Vybavení',
    COUNT(seat.id) AS 'Počet Míst'
FROM `seat`
JOIN `screen` ON seat.screen_id = screen.id
JOIN `seat_feature` ON seat.id = seat_feature.seat_id
JOIN `seat_attribute` ON seat_feature.seat_attribute_id = seat_attribute.id
WHERE screen.id = 1 AND seat_attribute.name = 'Bezbariérový přístup'
GROUP BY screen.id, seat_attribute.id;
```
