# Převod konceptuálního modelu do relačního modelu dat

Jakmile máme hotový **ER diagram** (konceptuální model), je nutné jej převést do **konkrétních tabulek** relační databáze. Tento proces se nazývá **logický návrh** a má přesná pravidla pro každý typ vztahu.

Klíčové otázky při převodu:
*   Jak se z entitního typu stane tabulka?
*   Jak se v tabulkách realizují vazby (1:1, 1:N, M:N)?
*   Co dělat se vztahovou entitou?

---

## 1. Základní pravidlo: Entita → Tabulka

Každý **entitní typ** z ER diagramu se stane jednou **tabulkou** v databázi. Atributy entity se stanou sloupci tabulky. Primární klíč entity se stane primárním klíčem tabulky – obvykle pojmenovaný prostě `id`.

**Příklad z ER diagramu:**

```
Entitní typ: STUDENT
Atributy:    id (PK), jmeno, prijmeni, email

Entitní typ: PREDMET
Atributy:    id (PK), nazev, kredity
```

**Výsledné tabulky:**

```
student(id, jmeno, prijmeni, email)
predmet(id, nazev, kredity)
```

---

## 2. Kardinalita 1:1 – Jedna ku jedné

### Princip

U vztahu 1:1 každé entitě A odpovídá **maximálně jedna** entita B a naopak.

**Příklad:** `zamestnanec` má `sluzebni_automobil` (jeden zaměstnanec – jedno auto, jedno auto – jeden zaměstnanec).

### Jak to řešit v RMD?

**Možnost A – FK u libovolné ze stran**  
Přidáme cizí klíč do jedné z tabulek. Logicky ho dáváme na stranu, kde vazba je *volitelná* (nepovinná), nebo tam, kde to dává větší smysl.

**Tabulka `automobil`:**

| **id** (PK) | spz       | model         |
|:-----------:|-----------|---------------|
| 5           | 1A1 1234  | Skoda Octavia |
| 6           | 2B2 5678  | Ford Focus    |

**Tabulka `zamestnanec`** (FK je zde):

| **id** (PK) | jmeno  | prijmeni | id_automobilu (FK, UNIQUE) |
|:-----------:|--------|----------|:--------------------------:|
| 101         | Tomáš  | Novák    | **5**                      |
| 102         | Jana   | Dvořák   | **6**                      |
| 103         | Petr   | Svoboda  | NULL ← nemá auto           |

> `id_automobilu` v tabulce `zamestnanec` je **FK + UNIQUE**. Kombinace FK a UNIQUE zajistí, že to auto nemůže mít přiřazeno více zaměstnanců.  
> Petr Svoboda nemá přidělené auto – hodnota `NULL`.

**Možnost B – Sloučení do jedné tabulky**  
Pokud je vztah 1:1 vždy povinný (každý zaměstnanec má vždy auto a každé auto má vždy zaměstnance), lze obě entity sloučit do jedné tabulky:

```
zamestnanec(id, jmeno, prijmeni, spz, model_auta)
```

> **Doporučení z praxe:** V praxi se vztah 1:1 řeší sloučením entit do jedné tabulky, pokud jsou vždy pohromadě. FK se používá, když existuje reálná možnost NULL (nepovinná vazba).

---

## 3. Kardinalita 1:N – Jedna ku mnoha

### Princip

Jedné entitě A odpovídá **více** entit B, ale entita B patří vždy právě **jedné** entitě A.

**Příklad:** `trida` má mnoho `studentů`. Ale každý student chodí do právě jedné třídy.

### Jak to řešit v RMD?

**Pravidlo:** Cizí klíč se vždy přidá na stranu **„mnoha"** – tedy do tabulky, kde je více záznamů ke jednomu záznamu v druhé tabulce.

**Tabulka `trida`** (strana „jedna"):

| **id** (PK) | nazev | rok_studia |
|:-----------:|-------|:----------:|
| 1           | 2A    | 2          |
| 2           | 3B    | 3          |

**Tabulka `student`** (strana „mnoho") – FK je zde:

| **id** (PK) | jmeno | prijmeni | id_tridy (FK) |
|:-----------:|-------|----------|:-------------:|
| 1           | Tomáš | Novák    | **1**         |
| 2           | Jana  | Dvořák   | **2**         |
| 3           | Petr  | Svoboda  | **1**         |
| 4           | Lucie | Marková  | **1**         |

Sloupec `id_tridy` ve `student` odkazuje → do tabulky `trida`.

*   Třída 2A (id=1) má studenty s id `1, 3, 4` → **3 studenti v jedné třídě**.
*   Jana Dvořák (id=2) má `id_tridy = 2` → chodí do **jedné třídy** 3B.

> **Zlaté pravidlo 1:N:** FK (cizí klíč) jde vždy na stranu „N" – na stranu, kde je **více** záznamů.

### Schéma relace:

```
trida(id, nazev, rok_studia)
student(id, jmeno, prijmeni, id_tridy)
                               ↑ FK → trida.id
```

---

## 4. Kardinalita M:N – Mnoho ku mnoha

### Proč nelze M:N realizovat přímo?

**Příklad:** `student` studuje `predmet`. Jeden student má více předmětů a jeden předmět navštěvuje více studentů.

Pokud bychom se pokusili přidat FK do jedné tabulky, do jednoho sloupce by muselo jít **více hodnot** – například student studuje předměty `10, 11, 12`. To **porušuje pravidlo atomicity** (každá buňka musí obsahovat jednu hodnotu).

### Řešení: Vazební (spojovací) tabulka

Vztah M:N se vždy rozloží na **dvě vazby 1:N** pomocí **vazební tabulky** (také se říká *junction table*, *pivot table* nebo *asociativní tabulka*). Tato pomocná tabulka obsahuje cizí klíče z obou stran vztahu.

**Tabulka `student`:**

| **id** (PK) | jmeno | prijmeni |
|:-----------:|-------|----------|
| 1           | Tomáš | Novák    |
| 2           | Jana  | Dvořák   |
| 3           | Petr  | Svoboda  |

**Tabulka `predmet`:**

| **id** (PK) | nazev            | kredity |
|:-----------:|------------------|:-------:|
| 10          | Matematika       | 5       |
| 11          | Databaze         | 4       |
| 12          | Programovani v C | 6       |

**Vazební tabulka `student_predmet`:**

| **id_studenta** (FK) | **id_predmetu** (FK) | datum_zapisu |
|:--------------------:|:--------------------:|:------------:|
| 1                    | 10                   | 2024-09-01   |
| 1                    | 11                   | 2024-09-01   |
| 1                    | 12                   | 2024-09-01   |
| 2                    | 11                   | 2024-09-01   |
| 3                    | 10                   | 2024-09-01   |
| 3                    | 11                   | 2024-09-01   |

**Co z toho vidíme?**
*   Tomáš Novák (id=1) studuje předměty 10, 11, 12 → **3 předměty**.
*   Databaze (id=11) studují studenti 1, 2, 3 → **3 studenti**.
*   Sloupec `datum_zapisu` je příklad **atributu vztahu** – informace, která patří ke konkrétní kombinaci (ne ke studentovi ani předmětu samotným).

**Primární klíč vazební tabulky** je nejčastěji **složený klíč** tvořený oběma cizími klíči:

```
student_predmet(id_studenta, id_predmetu, datum_zapisu)
                ↑ FK          ↑ FK
                PK = (id_studenta, id_predmetu) = složený klíč
```

Složený PK zajistí, že jeden student nemůže být zapsán na stejný předmět dvakrát.

> **Alternativa:** Místo složeného klíče lze použít umělý PK `id` a přidat UNIQUE constraint na kombinaci `(id_studenta, id_predmetu)`.

---

## 5. Přehledné srovnání – jak řešit kardinality

| Kardinalita | Příklad                      | Řešení v RMD                                              | Kde je FK?                        |
|:-----------:|------------------------------|-----------------------------------------------------------|-----------------------------------|
| **1:1**     | zamestnanec – automobil      | FK + UNIQUE na jedné straně, nebo sloučení do 1 tabulky   | Na straně, kde je vazba nepovinná |
| **1:N**     | trida – student              | FK přidat na stranu „N"                                   | V tabulce „mnoho" (`student`)     |
| **M:N**     | student – predmet            | Vazební tabulka se dvěma FK                               | Ve vazební tabulce                |

---

## 6. Kompletní ukázkové schéma

Pojďme sestavit kompletní schéma ze školního prostředí s reálnými vazbami:

**ER diagram (slovně):**
*   `trida` má mnoho `studentů` (1:N)
*   `student` je zapsán na mnoho `predmetů` a `predmet` má mnoho `studentů` (M:N)
*   `predmet` vyučuje jeden `ucitel`, ale `ucitel` může vyučovat více `predmetů` (1:N)

**Výsledné tabulky:**

```
trida(id, nazev, rok_studia)

student(id, jmeno, prijmeni, email, id_tridy)
                                     ↑ FK → trida.id

ucitel(id, jmeno, prijmeni, email)

predmet(id, nazev, kredity, id_ucitele)
                              ↑ FK → ucitel.id

student_predmet(id_studenta, id_predmetu, datum_zapisu)
                ↑ FK           ↑ FK
                → student      → predmet
                PK = (id_studenta, id_predmetu)
```

**Vizualizace vazeb:**

```
trida ──────< student >────── student_predmet >────── predmet
  1:N                  M:N (vazební tabulka)             1:N
                                                          |
                                                        ucitel
```

> Symbol `──────<` znázorňuje „k jednomu může patřit více" – tedy strana „N".

---

## 7. Tipy a nejčastější chyby

**✅ Co dělat:**
*   Pojmenovávejte tabulky v **jednotném čísle, lower_snake_case, bez diakritiky**: `student`, `predmet`, `student_predmet`.
*   PK tabulky pojmenovávejte prostě **`id`**.
*   FK pojmenovávejte jako `id_<nazev_tabulky>`: `id_tridy`, `id_studenta` – jasné, z jaké tabulky FK pochází.
*   Pro M:N vztah vždy vytvořte vazební tabulku.
*   Přidejte k FK `NOT NULL`, pokud je vazba povinná (každý student musí být v třídě).

**❌ Co nedělat:**
*   **Neukládejte více hodnot do jedné buňky** – žádné `predmety = "10, 11, 12"`. To porušuje relační model.
*   **Nevynechávejte vazební tabulku u M:N** – DBMS nedovolí ukládat víc FK hodnot do jednoho sloupce.
*   **Nepřidávejte FK na stranu „1"** u vazby 1:N – FK patří vždy na stranu „N".
