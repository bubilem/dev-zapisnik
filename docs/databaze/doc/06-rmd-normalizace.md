# Normalizace relačního modelu dat

Normalizace je proces **systematického upravování struktury tabulek** tak, aby se odstranila redundance (duplicita dat), anomálie při vkládání, úpravě a mazání záznamů a závislosti, které tam nepatří. Výsledkem je čistší, konzistentnější a lépe udržovatelná databáze.

Normalizace probíhá v krocích zvaných **normální formy (NF)**. Každá vyšší forma předpokládá splnění všech forem nižších.

---

## Proč normalizovat? – Problémy nenormalizovaných dat

Začněme příkladem špatně navržené tabulky, na které ukážeme všechny problémy.

### Tabulka `objednavka` – nenormalizovaná

| id_obj | zakaznik       | email_zakaznika    | produkty                         | ceny        | mesto_zakaznika |
|:------:|----------------|--------------------|----------------------------------|-------------|-----------------|
| 1      | Tomáš Novák    | novak@email.cz     | Klávesnice, Myš                  | 800, 300    | Praha           |
| 2      | Jana Dvořák    | dvorak@email.cz    | Monitor                          | 5000        | Brno            |
| 3      | Tomáš Novák    | novak@email.cz     | Myš                              | 300         | Praha           |

**Problémy:**

*   **Redundance:** Tomáš Novák a jeho město Praha se opakuje ve více řádcích. Při změně adresy musíme upravit všechny řádky.
*   **Anomálie při vkládání:** Nemůžeme evidovat zákazníka, dokud nepodá objednávku.
*   **Anomálie při mazání:** Smažeme-li objednávku č. 2, ztratíme i informace o Janě Dvořák.
*   **Anomálie při úpravě:** Změníme-li email Tomáše Nováka jen v jednom řádku, data budou nekonzistentní.
*   **Více hodnot v buňce:** Sloupce `produkty` a `ceny` obsahují seznam – to porušuje atomicitu.

---

## 1. Normální forma (1NF)

### Pravidlo

> Každá buňka tabulky musí obsahovat **atomickou (nedělitelnou) hodnotu**. Žádné opakující se skupiny, žádné seznamy v jedné buňce. Tabulka musí mít primární klíč.

### Porušení 1NF – příklad

| id_obj | zakaznik    | produkty            | ceny      |
|:------:|-------------|---------------------|-----------|
| 1      | Tomáš Novák | Klávesnice, Myš     | 800, 300  |

Sloupce `produkty` a `ceny` obsahují více hodnot → **porušení 1NF**.

### Oprava na 1NF

Každý produkt dostane vlastní řádek:

| id_obj | zakaznik    | produkt    | cena |
|:------:|-------------|------------|:----:|
| 1      | Tomáš Novák | Klávesnice | 800  |
| 1      | Tomáš Novák | Myš        | 300  |
| 2      | Jana Dvořák | Monitor    | 5000 |
| 3      | Tomáš Novák | Myš        | 300  |

Tabulka je v **1NF** – každá buňka obsahuje jednu atomickou hodnotu. Primárním klíčem je kombinace `(id_obj, produkt)`.

**Stále přetrvávají problémy:** Název zákazníka se zbytečně opakuje v každém řádku.

---

## 2. Normální forma (2NF)

### Pravidlo

> Tabulka musí být v **1NF** a každý neklíčový atribut musí záviset na **celém primárním klíči**, ne jen na jeho části *(platí pouze pokud je PK složený)*.

### Porušení 2NF – příklad

PK naší tabulky je `(id_obj, produkt)`. Podívejme se na závislosti:

```
(id_obj, produkt) → cena          závisí na celém PK
 id_obj           → zakaznik      závisí jen na části PK (id_obj)
```

Atribut `zakaznik` závisí pouze na `id_obj`, ne na celé dvojici `(id_obj, produkt)` → **porušení 2NF** (tzv. *částečná závislost*).

### Oprava na 2NF

Rozdělíme tabulku na dvě:

**Tabulka `objednavka`:**

| **id_obj** (PK) | zakaznik    |
|:---------------:|-------------|
| 1               | Tomáš Novák |
| 2               | Jana Dvořák |
| 3               | Tomáš Novák |

**Tabulka `polozka_objednavky`:**

| **id_obj** (FK) | **produkt** (PK část) | cena |
|:---------------:|----------------------|:----:|
| 1               | Klávesnice           | 800  |
| 1               | Myš                  | 300  |
| 2               | Monitor              | 5000 |
| 3               | Myš                  | 300  |

Obě tabulky jsou v **2NF**

**Stále přetrvávají problémy:** Tomáš Novák se opakuje vícekrát v tabulce `objednavka`.

---

## 3. Normální forma (3NF)

### Pravidlo

> Tabulka musí být v **2NF** a žádný neklíčový atribut nesmí záviset na jiném neklíčovém atributu *(tranzitivní závislost)*.

### Porušení 3NF – příklad

Rozšiřme tabulku `objednavka` o údaje zákazníka:

| **id_obj** (PK) | id_zakaznika | jmeno_zakaznika | email_zakaznika    | mesto_zakaznika |
|:---------------:|:------------:|-----------------|--------------------|-----------------|
| 1               | 101          | Tomáš Novák     | novak@email.cz     | Praha           |
| 2               | 102          | Jana Dvořák     | dvorak@email.cz    | Brno            |
| 3               | 101          | Tomáš Novák     | novak@email.cz     | Praha           |

Řetězec závislostí:

```
id_obj → id_zakaznika → jmeno_zakaznika, email_zakaznika, mesto_zakaznika
```

Atributy zákazníka nezávisí přímo na `id_obj` (PK objednávky), ale na `id_zakaznika`. Jedná se o **tranzitivní závislost** → porušení 3NF.

### Oprava na 3NF

Vytáhneme zákazníka do vlastní tabulky:

**Tabulka `zakaznik`:**

| **id** (PK) | jmeno       | email           | mesto |
|:-----------:|-------------|-----------------|-------|
| 101         | Tomáš Novák | novak@email.cz  | Praha |
| 102         | Jana Dvořák | dvorak@email.cz | Brno  |

**Tabulka `objednavka`:**

| **id_obj** (PK) | id_zakaznika (FK) |
|:---------------:|:-----------------:|
| 1               | 101               |
| 2               | 102               |
| 3               | 101               |

**Tabulka `polozka_objednavky`:**

| **id_obj** (FK) | **produkt**  | cena |
|:---------------:|--------------|:----:|
| 1               | Klávesnice   | 800  |
| 1               | Myš          | 300  |
| 2               | Monitor      | 5000 |
| 3               | Myš          | 300  |

Všechny tabulky jsou v **3NF** 

**Výsledek:** Změna emailu Tomáše Nováka se provede na **jediném místě** – v tabulce `zakaznik`.

---

## Boyce-Coddova normální forma (BCNF)

Zpřísněná verze 3NF. Zatímco 3NF toleruje výjimky u složených kandidátních klíčů, BCNF říká:

> Pro každou funkční závislost `X → Y` musí platit, že X je **nadklíč** (superkey) tabulky.

BCNF je v praxi splněna většinou tabulek, které jsou ve 3NF. Porušení nastávají v méně obvyklých situacích s více překrývajícími se kandidátními klíči.

### Příklad porušení BCNF

Tabulka kurzy: jeden předmět může vyučovat více učitelů, ale každý učitel vyučuje jen jeden předmět.

| student     | predmet    | ucitel    |
|-------------|------------|-----------|
| Tomáš       | Matematika | Novotný   |
| Tomáš       | Fyzika     | Horáček   |
| Jana        | Matematika | Malý      |

Kandidátní klíče: `(student, predmet)` a `(student, ucitel)`.  
Závislost: `ucitel → predmet` – učitel určuje předmět, ale `ucitel` není nadklíč → **porušení BCNF**.

### Oprava

**Tabulka `ucitel_predmet`:**

| **ucitel** (PK) | predmet    |
|:---------------:|------------|
| Novotný         | Matematika |
| Horáček         | Fyzika     |
| Malý            | Matematika |

**Tabulka `student_ucitel`:**

| student | ucitel  |
|---------|---------|
| Tomáš   | Novotný |
| Tomáš   | Horáček |
| Jana    | Malý    |

---

## 4. a 5. Normální forma (4NF, 5NF)

Vyšší normální formy se v běžné praxi řeší jen výjimečně – v akademickém nebo velmi komplexním prostředí.

### 4NF – Vícehodnotové závislosti

> Tabulka nesmí obsahovat dvě nebo více **nezávislých vícehodnotových závislostí** na primárním klíči.

**Příklad problému:** Zaměstnanec může mít více jazyků a více projektů, přičemž jazyk a projekt na sobě nezávisí:

| zamestnanec | jazyk      | projekt   |
|-------------|------------|-----------|
| Novák       | čeština    | Alpha     |
| Novák       | angličtina | Alpha     |
| Novák       | čeština    | Beta      |
| Novák       | angličtina | Beta      |

Musíme přidat kombinaci `(čeština, Beta)` jen proto, že existuje `(angličtina, Beta)` → redundance.

**Oprava:** Dvě separátní tabulky – `zamestnanec_jazyk` a `zamestnanec_projekt`.

### 5NF – Dekompozice bez ztráty (Join Dependency)

> Tabulku nelze bez ztráty informace dále dekomponovat.

5NF se týká složitých trojstranných (nebo víceúrovňových) vztahů. V praktickém návrhu se s ní setkáme velmi zřídka.

---

## Shrnutí normálních forem

| Forma   | Klíčové pravidlo                                              | Co řeší                           |
|---------|---------------------------------------------------------------|-----------------------------------|
| **1NF** | Atomické hodnoty, žádné opakující se skupiny                  | Více hodnot v buňce               |
| **2NF** | Žádná částečná závislost na části složeného PK               | Redundance u složených klíčů      |
| **3NF** | Žádná tranzitivní závislost mezi neklíčovými atributy         | Redundance zákaznických dat apod. |
| **BCNF**| Každá závislost `X→Y` – X musí být nadklíč                   | Okrajové případy 3NF              |
| **4NF** | Žádné nezávislé vícehodnotové závislosti                      | Kombinatorická exploze řádků      |
| **5NF** | Nelze dále dekomponovat bez ztráty                            | Složité víceúrovňové vztahy       |

---

## Denormalizace – kdy záměrně porušit pravidla?

Normalizace je ideál, ale v praxi se někdy záměrně **denormalizuje** – tedy vědomě ponechá redundance – z výkonnostních důvodů.

**Typické důvody:**
*   **Reporting a analytika (OLAP):** Datový sklad záměrně duplikuje data do tzv. **hvězdicového schématu** (star schema), aby se vyhnul nákladným JOINům přes desítky tabulek.
*   **Rychlost čtení:** Pokud se data velmi často čtou, ale málokdy mění, může být denormalizace výhodná.
*   **Cache / NoSQL:** Dokumentové databáze (MongoDB) záměrně vkládají data redundantně – embedding dokumentů je rychlejší než JOIN.

> **Zlaté pravidlo:** Normalizujte nejprve na 3NF. Denormalizujte až tehdy, když máte **naměřený výkonnostní problém** – ne dopředu z předtuchy.
