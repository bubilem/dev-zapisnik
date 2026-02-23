# Analýza systému: Rezervační portál pro multikina a kulturní centra

## 1. Cíl projektu

Cílem je vytvořit robustní databázové pozadí pro rezervační systém, který není omezen pouze na promítání filmů, ale umožňuje správu jakýchkoliv kulturních událostí (konference, přednášky, divadlo) v rámci fyzických prostor kina. Systém musí řešit variabilitu cen v závislosti na čase, typu sedadla a kategorii návštěvníka.

## 2. Definice domény (Business Rules)

### 2.1 Prostor a kapacita

- **Multi-kino:** Systém musí podporovat více poboček (budov) pod jednou správou.
- **Sály a sedadla:** Každé kino má několik sálů s pevnou kapacitou. Sedadla jsou definována řadou a číslem.
- **Zónování:** Sedadla v sále nejsou rovnocenná. Jsou dělena do skupin (např. VIP zóna, standard, bezbariérové), což ovlivňuje výslednou cenu.

### 2.2 Události a plánování

- **Univerzální obsah:** Událost (`event`) je obecná entita. Může to být film s věkovou přístupností nebo odborná konference.
- **Relace (`session`):** Událost je nasazena do konkrétního sálu a času. Musí být zajištěno, aby v jednom sále neprobíhalo více událostí najednou.

### 2.3 Cenotvorba

- **Cenová matice:** Cena není statická vlastnost filmu. Je výsledkem průniku tří faktorů:

1. Konkrétní čas a typ akce (`session`).
2. Kvalita sedadla (`seat_group`).
3. Typ návštěvníka (`price_category` – dítě, dospělý, senior).

### 2.4 Rezervační proces

- **Zákaznický přístup:** Systém umožňuje nákup registrovaným uživatelům (historie, věrnostní body) i neregistrovaným hostům (pouze na základě validního e-mailu).
- **Vstupenka (`ticket`):** Jedna rezervace může obsahovat více lístků na různá sedadla a pro různé typy tarifů.

## 3. Technické požadavky a omezení

### 3.1 Datová integrita

- Nesmí dojít k "double-bookingu" (prodej jednoho sedadla vícekrát v rámci jedné relace).
- Systém musí bránit smazání historických dat o tržbách, i když je smazán profil uživatele (požadavek GDPR a účetnictví).

### 3.2 Škálovatelnost

- Návrh musí počítat s tisíci relacemi měsíčně a statisíci prodanými lístky. Tomu odpovídá volba datových typů (např. `MEDIUMINT` pro transakční tabulky).

---

## 4. Entity-Relationship Model (ERM)

V rámci analýzy byly identifikovány následující klíčové vztahy, které tvoří kostru SQL implementace:

1. **Cinema (1) : Screen (N)** – Budova a její prostory.
2. **Event (1) : Session (N)** – Katalog a jeho nasazení do programu.
3. **Session (1) : Reservation (N)** – Prodej lístků na konkrétní termín.
4. **Seat (N) : Seat_Attribute (M)** – Vlastnosti sedadel (vazební tabulka).
5. **Reservation (1) : Ticket (N)** – Položky jedné objednávky.

---

### Metodický pokyn pro studenty:

Při studiu tohoto projektu se zaměřte na to, jak tabulka `price` dekomponuje složitý problém dynamického naceňování do jednoduché vyhledávací matice. Tato tabulka je klíčem k pochopení toho, jak systém generuje finanční hodnotu lístku.
