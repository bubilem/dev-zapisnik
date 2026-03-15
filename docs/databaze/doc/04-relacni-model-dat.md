# Relační model dat

Relační model dat (RMD) je způsob, jak organizovat a ukládat data v databázi. Byl navržen **Edgarem F. Coddem** v roce 1970 a dnes je to základ všech běžných databázových systémů (MySQL, PostgreSQL, Oracle, SQL Server…). Jeho genialita spočívá v jednoduchosti: veškerá data jsou uložena v **tabulkách**.

---

## 1. Základní stavební kameny RMD

### Relace (Tabulka)

V relačním modelu se každá entita (věc, o které chceme uchovávat data) reprezentuje jako **relace** – v praxi ji vidíme jako **tabulku**. Každá tabulka má:
*   **Název** – identifikuje, o čem tabulka je (např. `student`, `kurz`).
*   **Sloupce (atributy)** – popisují vlastnosti entity.
*   **Řádky (záznamy / n-tice)** – každý řádek je jedna konkrétní entita.

### Atribut (Sloupec)

Atribut je jeden konkrétní **sloupec** tabulky. Definuje, jaký typ informace se bude ukládat, a má přesně daný **datový typ** (celé číslo, text, datum, …).

### N-tice (Řádek / Záznam)

Každý řádek tabulky je jedna **n-tice** (anglicky *tuple*) – tedy jedna konkrétní instance entity. Pokud máme tabulku `student`, pak každý řádek je jeden student.

### Doména (Domain)

Doména definuje **přípustné hodnoty**, které smí atribut nabývat. Například atribut `pohlavi` má doménu `{muz, zena}`, atribut `vek` má doménu kladných celých čísel.

---

## 2. Praktická ukázka: tabulka s reálnými daty

Nejlépe se relační model pochopí na konkrétním příkladu. Představme si, že chceme evidovat studenty a kurzy na škole.

### Tabulka `student`

| **id** (PK) | jmeno  | prijmeni | email                 | rocnik |
|:-----------:|--------|----------|-----------------------|:------:|
| **1**       | Tomáš  | Novák    | novak@skola.cz        | 2      |
| **2**       | Jana   | Dvořák   | dvorak@skola.cz       | 3      |
| **3**       | Petr   | Svoboda  | svoboda@skola.cz      | 2      |
| **4**       | Lucie  | Marková  | markova@skola.cz      | 1      |

> Každý **sloupec** = jeden atribut (vlastnost studenta).  
> Každý **řádek** = jeden konkrétní student (jedna entita).  
> Sloupec `id` je **primární klíč (PK)** – unikátně identifikuje každý řádek.

### Tabulka `kurz`

| **id** (PK) | nazev              | kreditu |
|:-----------:|--------------------|:-------:|
| **10**      | Matematika         | 5       |
| **11**      | Databaze           | 4       |
| **12**      | Programovani v C   | 6       |

---

## 3. Primární klíč (PK – Primary Key)

Primární klíč je atribut (nebo kombinace atributů), který **jednoznačně identifikuje každý řádek** v tabulce.

**Pravidla PK:**
*   Hodnoty jsou **unikátní** – žádné dva řádky nesmí mít stejný PK.
*   Hodnota nesmí být **NULL** (prázdná).
*   Hodnota by se měla **neměnit** (proto se doporučuje používat umělé číselné ID).

**Typy primárních klíčů:**

| Typ                        | Popis                                                                | Příklad                     |
|----------------------------|----------------------------------------------------------------------|-----------------------------|
| **Přirozený klíč**         | Klíč odvozený z reálných dat                                         | Rodné číslo, ISBN           |
| **Umělý klíč (Surrogate)** | Uměle vygenerované číslo, obvykle `AUTO_INCREMENT` / `SERIAL`        | `id = 1, 2, 3, ...`         |
| **Složený klíč**           | Kombinace více atributů dohromady tvoří unikátní identifikátor       | `(id_studenta, id_predmetu)` |

> **Doporučení z praxe:** Téměř vždy používejte **umělý číselný klíč** pojmenovaný prostě `id`. Přirozené klíče se mohou v čase změnit (změna příjmení, rodného čísla) a způsobit problémy s referenční integritou.

---

## 4. Cizí klíč (FK – Foreign Key)

Cizí klíč je atribut v jedné tabulce, který **odkazuje na primární klíč jiné tabulky**. Tímto mechanismem se v relační databázi realizují **vazby mezi tabulkami**.

**Pravidlo referenční integrity:** Hodnota cizího klíče musí buď:
*   Existovat v odkazované tabulce, NEBO
*   Být `NULL` (pokud je vazba nepovinná).

Nelze tedy vytvořit záznam, který odkazuje na neexistující řádek v jiné tabulce!

### Příklad: Student je přiřazen do třídy

**Tabulka `trida`:**

| **id** (PK) | nazev  | rok_studia |
|:-----------:|--------|:----------:|
| **1**       | 2A     | 2          |
| **2**       | 3B     | 3          |

**Tabulka `student`** (s FK):

| **id** (PK) | jmeno | prijmeni | id_tridy (FK)       |
|:-----------:|-------|----------|:-------------------:|
| **1**       | Tomáš | Novák    | **1** → třída 2A    |
| **2**       | Jana  | Dvořák   | **2** → třída 3B    |
| **3**       | Petr  | Svoboda  | **1** → třída 2A    |
| **4**       | Lucie | Marková  | **1** → třída 2A    |

Sloupec `id_tridy` v tabulce `student` je **cizí klíč**, který ukazuje do tabulky `trida`. Díky tomu víme, do jaké třídy každý student patří – bez opakování celého názvu třídy u každého studenta.

---

## 5. Schéma relace (zápis struktury tabulky)

V teorii RMD se struktura tabulky zapisuje tzv. **schématem relace**. Primární klíč se podtrhuje, cizí klíče se označují symbolem FK.

**Formát:** `nazev_tabulky(atribut1, atribut2, atribut3, …)`

**Příklady:**

```
trida(id, nazev, rok_studia)
student(id, jmeno, prijmeni, id_tridy)
```

> Podtržení: `id` – primární klíč každé tabulky  
> Cizí klíč: `id_tridy` v tabulce `student` odkazuje na `id` tabulky `trida`

---

## 6. Integritní omezení

Integritní omezení jsou **pravidla, která databáze automaticky vynucuje**, aby data zůstala konzistentní a platná.

| Omezení          | Popis                                                                  |
|------------------|------------------------------------------------------------------------|
| **NOT NULL**     | Atribut nesmí být prázdný                                              |
| **UNIQUE**       | Hodnoty musí být unikátní v rámci sloupce (ale může být NULL)          |
| **PRIMARY KEY**  | NOT NULL + UNIQUE – jednoznačná identifikace řádku                     |
| **FOREIGN KEY**  | Odkazuje na PK jiné tabulky – referenční integrita                     |
| **CHECK**        | Vlastní podmínka (např. `vek > 0`, `plat BETWEEN 15000 AND 200000`)    |
| **DEFAULT**      | Výchozí hodnota, pokud není uvedena při vkládání záznamu              |

---

## 7. Vlastnosti relace (tabulky) v RMD

Aby tabulka splňovala požadavky relačního modelu, musí dodržovat tato pravidla:

*   **Každá hodnota v buňce je atomická** – buňka nesmí obsahovat seznam nebo vnořenou tabulku. Každá informace do vlastního sloupce.
*   **Všechny řádky jsou unikátní** – žádné dva řádky nesmí být totožné (proto existuje PK).
*   **Pořadí řádků nezáleží** – databáze negarantuje žádné pořadí bez explicitního `ORDER BY`.
*   **Pořadí sloupců nezáleží** – sloupce jsou pojmenovány, ne pozicovány.
*   **Každý sloupec má jednoznačný název** – v rámci jedné tabulky nemohou existovat dva sloupce se stejným názvem.

---

## Shrnutí

| Pojem v teorii RMD | Co vidíme v praxi (tabulka)  |
|--------------------|------------------------------|
| Relace             | Tabulka                      |
| Atribut            | Sloupec (název + typ)        |
| N-tice             | Řádek (jeden záznam)         |
| Doména             | Přípustné hodnoty sloupce    |
| Primární klíč (PK) | `id` – unikátní ID řádku     |
| Cizí klíč (FK)     | Odkaz na `id` jiné tabulky   |
| Schéma relace      | Definice struktury tabulky   |
