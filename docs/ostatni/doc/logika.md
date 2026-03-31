# Logika a výroková logika

Logika je věda o správném myšlení a usuzování. V informatice a elektrotechnice tvoří základ pro návrh obvodů, programovací podmínky, databázové dotazy a algoritmické rozhodování. Pochopení logiky je proto základní dovedností každého programátora i technika.

---

## 1. Základní pojmy a terminologie

### Výrok

**Výrok** je tvrzení, o němž lze jednoznačně rozhodnout, zda je **pravdivé** nebo **nepravdivé**. Výrok nemůže být zároveň pravdivý i nepravdivý.

| Příklad tvrzení | Je výrok? | Proč |
| :--- | :---: | :--- |
| „Praha je hlavní město ČR." | Ano | Jednoznačně pravdivé |
| „2 + 2 = 5" | Ano | Jednoznačně nepravdivé |
| „Zavři okno!" | Ne | Je to příkaz, nelze hodnotit T/F |
| „Tato věta je lešení." | Ne | Paradox, nelze rozhodnout |
| „x > 5" | Záleží | Záleží na hodnotě `x` (predikát) |

### Logické stavy

Každý výrok nabývá právě jednoho ze dvou logických stavů:

| Stav | Symbol | Alternativní zápis | V elektrotechnice |
| :--- | :---: | :--- | :--- |
| **Pravda** (True) | `1` | `TRUE`, `T`, `P` | Vysoký signál (HIGH, +5V) |
| **Nepravda** (False) | `0` | `FALSE`, `F`, `N` | Nízký signál (LOW, 0V) |

> [!TIP]
> Tento dvoustavový systém (0 a 1) je základem **binární soustavy** a veškeré digitální techniky. Každý bit v počítači je právě takovým logickým stavem.

---

## 2. Výroková logika — základy

**Výroková logika** pracuje s výroky a logickými operacemi nad nimi. Složité výroky (složené výroky) vznikají kombinací jednoduchých výroků pomocí **logických spojek**.

### Atomický vs. složený výrok

- **Atomický výrok** — nelze dále rozložit. Označujeme ho malými písmeny: `p`, `q`, `r`…
  - Příklad: *p = „Prší."*, *q = „Je víkend."*
- **Složený výrok** — vznikne kombinací atomických výroků spojkami.
  - Příklad: *„Prší NEBO je víkend."* → `p ∨ q`

### Proměnné a tautologie

| Pojem | Vysvětlení | Příklad |
| :--- | :--- | :--- |
| **Logická proměnná** | Proměnná s hodnotou 0 nebo 1 | `p`, `q`, `A`, `B` |
| **Tautologie** | Výrok pravdivý za všech okolností | `p ∨ ¬p` (vždy pravda) |
| **Kontradikce** | Výrok nepravdivý za všech okolností | `p ∧ ¬p` (vždy nepravda) |
| **Satisfiabilní výrok** | Pravdivý alespoň pro jednu kombinaci vstupů | `p ∧ q` |

---

## 3. Logické operace (Spojky)

Logické spojky jsou operace, které kombinují jeden či více výroků a vrací nový logický stav.

### Přehled základních spojek

| Název | Symbol | Programátorský zápis | Čtení |
| :--- | :---: | :--- | :--- |
| **Negace** (NOT) | `¬`, `~` | `!p`, `not p` | „není p" |
| **Konjunkce** (AND) | `∧`, `·` | `p && q`, `p and q` | „p a zároveň q" |
| **Disjunkce** (OR) | `∨`, `+` | `p \|\| q`, `p or q` | „p nebo q" |
| **XOR** (Exclusive OR) | `⊕`, `^` | `p ^ q`, `p xor q` | „buď p, nebo q, ale ne obě" |
| **Implikace** (IF…THEN) | `→` | `if (p) then q` | „jestliže p, pak q" |
| **Ekvivalence** (XNOR) | `↔`, `⊙` | `p == q` | „p právě tehdy když q" |

---

## 4. Pravdivostní tabulky

Pravdivostní tabulka systematicky zachycuje výstup logické operace pro **všechny možné kombinace vstupů**. Pro `n` vstupů existuje `2ⁿ` kombinací.

### NOT — Negace

Negace **obrátí** logický stav. Pravda se stane nepravdou a naopak.

| p | ¬p (NOT p) |
| :---: | :---: |
| `0` | **1** |
| `1` | **0** |

> [!NOTE]
> Negace je jediná **unární** operace — pracuje jen s jedním vstupem.

---

### AND — Konjunkce

AND vrátí `1` pouze tehdy, jsou-li **oba vstupy** rovny `1`. Stačí jediná `0` a výsledek je `0`.

| p | q | p ∧ q (AND) |
| :---: | :---: | :---: |
| `0` | `0` | **0** |
| `0` | `1` | **0** |
| `1` | `0` | **0** |
| `1` | `1` | **1** |

> [!TIP]
> Mnemotechnika: AND je jako přísnýsoud — *všichni* musí souhlasit.

---

### OR — Disjunkce

OR vrátí `1`, je-li **alespoň jeden** ze vstupů `1`. Výsledek je `0` jen tehdy, jsou-li **oba** vstupy `0`.

| p | q | p ∨ q (OR) |
| :---: | :---: | :---: |
| `0` | `0` | **0** |
| `0` | `1` | **1** |
| `1` | `0` | **1** |
| `1` | `1` | **1** |

> [!TIP]
> Mnemotechnika: OR je jako přijímací komise —stačí, aby *někdo* souhlasil.

---

### XOR — Exkluzivní disjunkce

XOR vrátí `1`, pokud jsou vstupy **rozdílné**. Pokud jsou oba stejné (oba `0` nebo oba `1`), výsledek je `0`.

| p | q | p ⊕ q (XOR) |
| :---: | :---: | :---: |
| `0` | `0` | **0** |
| `0` | `1` | **1** |
| `1` | `0` | **1** |
| `1` | `1` | **0** |

> [!NOTE]
> XOR platí výhradně pro *přesně jeden* pravdivý vstup. Slouží např. pro detekci **změny stavu** nebo **paritní bit** při přenosu dat.

---

### NAND — Negovaný AND

NAND je negací AND (NOT AND). Vrátí `0` pouze pokud jsou **oba vstupy** `1`.

| p | q | p ↑ q (NAND) |
| :---: | :---: | :---: |
| `0` | `0` | **1** |
| `0` | `1` | **1** |
| `1` | `0` | **1** |
| `1` | `1` | **0** |

---

### NOR — Negovaný OR

NOR je negací OR (NOT OR). Vrátí `1` pouze pokud jsou **oba vstupy** `0`.

| p | q | p ↓ q (NOR) |
| :---: | :---: | :---: |
| `0` | `0` | **1** |
| `0` | `1` | **0** |
| `1` | `0` | **0** |
| `1` | `1` | **0** |

---

### XNOR — Ekvivalence (Negovaný XOR)

XNOR vrátí `1`, jsou-li vstupy **stejné**. Je opakem XOR.

| p | q | p ↔ q (XNOR) |
| :---: | :---: | :---: |
| `0` | `0` | **1** |
| `0` | `1` | **0** |
| `1` | `0` | **0** |
| `1` | `1` | **1** |

---

### Implikace — „Jestliže… pak…"

Implikace `p → q` říká: *„Jestliže platí p, pak musí platit i q."* Jediný případ, kdy je implikace **nepravdivá**, je situace, kdy p je pravda a q je nepravda (slib byl porušen).

| p | q | p → q (Implikace) |
| :---: | :---: | :---: |
| `0` | `0` | **1** |
| `0` | `1` | **1** |
| `1` | `0` | **0** |
| `1` | `1` | **1** |

> [!NOTE]
> Příklad: *„Jestliže prší (p), vezmu deštník (q)."* Pokud neprší a deštník nevezmu — slib jsem neporušil (1). Pokud prší a deštník nevezmu — slib jsem porušil (0).

---

## 5. Logická hradla v elektrotechnice

Logická hradla jsou základní stavební kameny **digitálních obvodů**. Každé hradlo fyzicky realizuje jednu logickou operaci pomocí tranzistorů.

### Schématické značky hradel

```
NOT (Negace)
  p ──[>o]── ¬p
       Invertor (kroužek = negace)

AND (Konjunkce)
  p ──┐
      [D]── p∧q
  q ──┘
      (plochá vstupní strana, zaoblená výstupní)

OR (Disjunkce)
  p ──┐
      [⊃]── p∨q
  q ──┘
      (zahnutá vstupní strana, špičatá výstupní)

XOR (Exkluzivní OR)
  p ──┐
      [⊃=]── p⊕q
  q ──┘
      (jako OR, ale se zdvojenou vstupní linkou)

NAND
  p ──┐
      [D o]── p↑q
  q ──┘
      (AND zakončený kroužkem)

NOR
  p ──┐
      [⊃o]── p↓q
  q ──┘
      (OR zakončený kroužkem)
```

### Universalita NAND a NOR

> [!IMPORTANT]
> Hradla NAND a NOR jsou tzv. **universální hradla** — pomocí samotného NAND (nebo samotného NOR) lze sestavit libovolnou jinou logickou funkci (NOT, AND, OR, XOR…). Proto se v praxi integrované obvody staví převážně z těchto dvou typů.

Ukázka stavby NOT z NAND:
```
p ──┬──┐
    └──[NAND]── ¬p
```
*Oba vstupy NAND jsou spojeny dohromady → chová se jako NOT.*

---

## 6. Logické výrazy v programování

V programovacích jazycích se logické operátory používají zejména v podmínkách (`if`, `while`) a pro výpočet logických hodnot.

### Operátory v různých jazycích

| Operace | Python | JavaScript | C / C++ / Java | PHP |
| :--- | :---: | :---: | :---: | :---: |
| **NOT** | `not x` | `!x` | `!x` | `!x` |
| **AND** | `x and y` | `x && y` | `x && y` | `x && y` |
| **OR** | `x or y` | `x \|\| y` | `x \|\| y` | `x \|\| y` |
| **XOR** | `x ^ y`* | `x ^ y`* | `x ^ y`* | `x ^ y`* |
| **Ekvivalence** | `x == y` | `x === y` | `x == y` | `x === y` |

*\* Pro bitový XOR; pro logický XOR není v těchto jazycích přímý operátor — lze zapsat jako `(x or y) and not (x and y)`.*

---

### Praktické ukázky — Python

```python
# Základní logické operace
p = True
q = False

print(not p)       # False  (NOT)
print(p and q)     # False  (AND)
print(p or q)      # True   (OR)
print(p ^ q)       # True   (XOR — bitový, ale funguje i pro bool)

# Podmínky v praxi
vek = 20
ma_prukaz = True

if vek >= 18 and ma_prukaz:
    print("Vstup povolen")        # AND: obě podmínky musí platit

if vek < 18 or not ma_prukaz:
    print("Vstup zamítnut")       # OR + NOT

# Zkrácené vyhodnocení (short-circuit evaluation)
# Python přestane vyhodnocovat, jakmile je výsledek jasný:
# False AND ... → vždy False, druhý operand se nevyhodnotí
# True OR  ... → vždy True,  druhý operand se nevyhodnotí
```

### Praktické ukázky — JavaScript

```javascript
// Základní logické operace
const p = true;
const q = false;

console.log(!p);         // false  (NOT)
console.log(p && q);     // false  (AND)
console.log(p || q);     // true   (OR)
console.log(p ^ q);      // 1      (XOR — bitový)

// Podmínky v praxi
const vek = 20;
const maPrukazTotoznsti = true;

if (vek >= 18 && maPrukazTotoznsti) {
    console.log("Vstup povolen");
}

// Nullish coalescing (speciální OR pro null/undefined)
const jmeno = null;
const zobrazit = jmeno ?? "Anonym";   // → "Anonym"

// Logické přiřazení (ES2021)
let nastaveni = null;
nastaveni ||= "výchozí hodnota";      // přiřadí, jen když je falsy
```

### Praktické ukázky — SQL

```sql
-- Logické operátory v databázových dotazech
SELECT * FROM uzivatele
WHERE vek >= 18
  AND aktivni = 1;           -- AND: obě podmínky

SELECT * FROM produkty
WHERE kategorie = 'kniha'
  OR  kategorie = 'časopis'; -- OR: jedna z podmínek

SELECT * FROM objednavky
WHERE NOT stav = 'zrušeno';  -- NOT: negace podmínky

-- Kombinace
SELECT * FROM uzivatele
WHERE (vek >= 18 AND overeni = 1)
   OR  admin = 1;            -- závorky určují prioritu
```

---

## 7. Priority a závorky

Logické operátory mají svou prioritu (pořadí vyhodnocování), podobně jako matematické operátory:

| Priorita | Operátor | Poznámka |
| :---: | :--- | :--- |
| 1. (nejvyšší) | `NOT` (`¬`, `!`) | Vyhodnotí se jako první |
| 2. | `AND` (`∧`, `&&`) | |
| 3. | `XOR` (`⊕`, `^`) | |
| 4. (nejnižší) | `OR` (`∨`, `\|\|`) | Vyhodnotí se jako poslední |

> [!WARNING]
> **Závorky mění prioritu!** Vždy používejte závorky pro komplexní výrazy, aby byl kód čitelný a choval se podle očekávání.

```python
# Bez závorek — může být nečekané
vysledek = True or False and False
# Vyhodnotí se jako: True or (False and False) = True or False = True ✅

# Se závorkami — jednoznačné a čitelné
vysledek = (True or False) and False
# Vyhodnotí se jako: True and False = False
```

---

## 8. De Morganovy zákony

De Morganovy zákony popisují, jak lze transformovat logické výrazy s negací. Jsou základem pro zjednodušování logických obvodů i booleovské algebry.

### První zákon (negace AND)
```
¬(p ∧ q)  ≡  ¬p ∨ ¬q
NOT (p AND q)  =  (NOT p) OR (NOT q)
```
*„Negace konjunkce = disjunkce negací"*

### Druhý zákon (negace OR)
```
¬(p ∨ q)  ≡  ¬p ∧ ¬q
NOT (p OR q)  =  (NOT p) AND (NOT q)
```
*„Negace disjunkce = konjunkce negací"*

> [!TIP]
> Jednoduchá mnemotechnika: **„Prolom závorku a přehoď spojku"** (AND↔OR) — a nezapomeň negovat oba výroky.

Ověření pomocí pravdivostní tabulky pro první zákon:

| p | q | p ∧ q | ¬(p ∧ q) | ¬p | ¬q | ¬p ∨ ¬q |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 0 | 0 | **1** | 1 | 1 | **1** |
| 0 | 1 | 0 | **1** | 1 | 0 | **1** |
| 1 | 0 | 0 | **1** | 0 | 1 | **1** |
| 1 | 1 | 1 | **0** | 0 | 0 | **0** |

Hodnoty 4. a 7. sloupce jsou totožné → zákony jsou ověřeny.

Využití v programování:
```python
# Místo:
if not (uzivatel_prihlasen and ma_opravneni):
    odmitni_pristup()

# Ekvivalentně (De Morgan):
if not uzivatel_prihlasen or not ma_opravneni:
    odmitni_pristup()
```

---

## 9. Přehledná rekapitulace

| Spojka | Symbol | Výstup = 1 když... | Výstup = 0 když... |
| :--- | :---: | :--- | :--- |
| **NOT** | `¬p` | p = 0 | p = 1 |
| **AND** | `p ∧ q` | oba vstupy jsou 1 | alespoň jeden vstup je 0 |
| **OR** | `p ∨ q` | alespoň jeden vstup je 1 | oba vstupy jsou 0 |
| **XOR** | `p ⊕ q` | vstupy jsou různé | vstupy jsou stejné |
| **NAND** | `p ↑ q` | alespoň jeden vstup je 0 | oba vstupy jsou 1 |
| **NOR** | `p ↓ q` | oba vstupy jsou 0 | alespoň jeden vstup je 1 |
| **XNOR** | `p ↔ q` | vstupy jsou stejné | vstupy jsou různé |

> [!NOTE]
> Logika prostupuje celou informatikou — od nejnižší úrovně (tranzistory → hradla → obvody) až po vysokou abstrakci (databázové dotazy, podmínky v kódu, formální verifikace softwaru). Pevné zvládnutí základů logiky je investice, která se mnohonásobně vrátí.
