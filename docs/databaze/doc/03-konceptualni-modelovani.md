# Konceptuální modelování databáze

Konceptuální modelování je první a nejdůležitější fází návrhu databáze. Jeho cílem je zachytit požadavky na data a jejich vzájemné vztahy nezávisle na tom, jaký konkrétní databázový systém (DBMS) bude nakonec použit. Nejčastějším nástrojem pro tento účel je **ER diagram (Entity-Relationship Diagram)**.

## 1. Základní stavební kameny

### Entita a Entitní typ
Je důležité rozlišovat mezi těmito dvěma pojmy, ačkoli se v běžné řeči často zaměňují.
*   **Entitní typ (Entity Type)**: Je to šablona nebo kategorie objektů, o kterých chceme uchovávat informace. Například `STUDENT`, `KNIHA`, `AUTO`. V diagramu se kreslí jako obdélník.
*   **Entita (Entity)**: Je to jeden konkrétní výskyt (instanci) daného typu. Například student `Jan Novák`, kniha `Babička` nebo auto `Škoda Fabia s SPZ 1A1 1234`. V relační databázi tomu odpovídá jeden **záznam (řádek)** v tabulce.

### Vztah a Vztahový typ
*   **Vztahový typ (Relationship Type)**: Definuje, že mezi dvěma entitními typy existuje nějaká vazba. Například `STUDENT` *si půjčuje* `KNIHU`. V diagramu se často značí kosočtvercem nebo spojnicí s popisem.
*   **Vztah (Relationship)**: Je to konkrétní spojení mezi dvěma entitami. Například `Jan Novák` si půjčil knihu `Babička`.

### Atribut
Atribut je vlastnost entity, která nás zajímá a kterou chceme evidovat.
*   **Název atributu**: Pojmenování vlastnosti (např. `Jméno`, `Příjmení`, `Datum narození`).
*   **Typ atributu**: Datový typ (číslo, text, datum, logická hodnota).
*   **Hodnota atributu**: Konkrétní údaj pro danou entitu (např. `Petr`, `Svoboda`, `1990-01-01`).

---

## 2. Kardinalita vztahů

Kardinalita určuje, *kolik* entit jednoho typu se může (nebo musí) účastnit vztahu s entitou druhého typu.

### 1:1 (Jedna ku jedné)
 jedné entitě typu A odpovídá maximálně jedna entita typu B a naopak.
*   *Příklad:* `OBČAN` má `RODNÉ ČÍSLO`, `ŘEDITEL` řídí `ŠKOLU` (pokud uvažujeme, že ředitel řídí jen jednu školu a škola má jen jednoho ředitele).
*   V praxi je tento vztah méně častý, často se řeší sloučením entit do jedné tabulky.

### 1:N (Jedna ku mnoha)
Jedné entitě typu A může odpovídat více entit typu B, ale entitě typu B odpovídá maximálně jedna entita typu A.
*   *Příklad:* `TŘÍDA` má mnoho `ŽÁKŮ`, ale `ŽÁK` chodí jen do jedné `TŘÍDY`. `FAKTURA` obsahuje mnoho `POLOŽEK`, ale `POLOŽKA` patří jen k jedné `FAKTUŘE`.
*   Toto je **nejčastější** typ vztahu.

### M:N (Mnoho ku mnoha)
Jedné entitě typu A může odpovídat více entit typu B a zároveň jedné entitě typu B může odpovídat více entit typu A.
*   *Příklad:* `STUDENT` studuje `PŘEDMĚT` (student má více předmětů a předmět navštěvuje více studentů). `AUTOR` píše `KNIHU` (autor napsal více knih, knihu napsalo více autorů).
*   V relační databázi se tento vztah **nedá realizovat přímo** a musí se rozložit na dva vztahy 1:N pomocí **vazební tabulky**.

---

## 3. Parcialita (Povinnost účasti ve vztahu)

Určuje, zda se *každá* entita daného typu musí účastnit vztahu, nebo zda je účast volitelná (nepovinná).
*   **Povinná účast (Mandatory / Total)**: Každá entita musí mít vztah. Například: Každá `FAKTURA` musí mít `ZÁKAZNÍKA`. Graficky se často značí plnou čarou nebo dvojitou čarou.
*   **Volitelná účast (Optional / Partial)**: Entita může existovat i bez vztahu. Například: `ZAMĚSTNANEC` *může* mít přidělené `SLUŽEBNÍ AUTO`, ale nemusí (někteří nemají žádné). Graficky se značí přerušovanou čarou nebo kroužkem u konce vazby.

---

## 4. Klíče (Identifikátory)

Klíč je atribut (nebo skupina atributů), který slouží k jednoznačné identifikaci entity.

### Kandidátní klíč (Candidate Key)
Jakýkoli atribut, který unikátně identifikuje entitu. Entita může mít více kandidátních klíčů.
*   *Příklad:* U `OBČANA` to může být `Rodné číslo` i `Číslo OP`.

### Primární klíč (Primary Key - PK)
Jeden vybraný kandidátní klíč, který zvolíme jako hlavní identifikátor.
*   Musí být **unikátní** (nesmí se opakovat).
*   Nesmí být **NULL** (nesmí být prázdný).
*   Měl by být neměnný.
*   Často se používá umělý klíč (ID - automaticky generované číslo), aby se předešlo problémům při změně přirozených dat (např. změna příjmení).

### Cizí klíč (Foreign Key - FK)
Atribut, který odkazuje na primární klíč jiné entity. Slouží k vytvoření vazby mezi dvěma tabulkami (typicky 1:N).
*   Pokud v tabulce `ŽÁCI` máme sloupec `id_tridy`, je to cizí klíč odkazující na primární klíč tabulky `TŘÍDY`.
*   Zajišťuje **referenční integritu** (nemohu smazat třídu, pokud do ní chodí žáci; nemohu přiřadit žáka do neexistující třídy).

### Složený klíč (Composite Key)
Klíč, který se skládá z více atributů.
*   Používá se často u vazeb M:N ve vazební tabulce. Například ve vazbě `STUDENT-PŘEDMĚT` může být klíčem dvojice `(id_studenta, id_predmetu)`.
