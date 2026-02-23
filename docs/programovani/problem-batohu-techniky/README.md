# Problém batohu (The Knapsack Problem)

![Knapsack Problem](./img/knapsack.webp)

## Seznámení s problémem

Problém batohu (v angličtině **Knapsack Problem**) je jedním z nejznámějších problémů v informatice a kombinatorické optimalizaci. 

Představte si situaci, kdy se chystáte na dlouhou túru a máte batoh, který unese pouze určitou váhu (například 15 kg). Máte před sebou hromadu věcí, které byste si chtěli vzít s sebou – stan, spacák, konzervy, vodu, lékárničku, knihu, náhradní oblečení... Každá z těchto věcí má svou **hmotnost** a také svou **důležitost** (nebo "cenu") pro vás.

Vaším úkolem je vybrat takovou kombinaci věcí, abyste:
1. **Nepřekročili limit** nosnosti batohu.
2. **Maximalizovali celkovou hodnotu** (užitek) věcí, které si s sebou vezmete.

Tento problém se netýká jen balení na výlety. V reálném světě má obrovské uplatnění:
*   Investiční portfolia (jak vybrat akcie s největším výnosem při omezeném rozpočtu/riziku).
*   Logistika a nakládání kontejnerů.
*   Řezání materiálu (jak nařezat kusy s minimálním odpadem).
*   Výběr projektů k financování ve firmě.

## Formální definice

Jedná se o **kombinatorický optimalizační problém**. Zadání lze definovat následovně:

*   Máme množinu **$n$** předmětů.
*   Každý předmět $i$ má svou **hmotnost $w_i$** (weight) a **hodnotu $v_i$** (value).
*   Máme batoh s maximální **nosností $W$** (kapacita).

**Cíl:** Najít takovou podmnožinu předmětů, aby součet jejich hmotností byl menší nebo roven $W$ a součet jejich hodnot byl co nejvyšší možný.

Matematicky hledáme takový výběr (vektor $x$, kde $x_i$ je 1 pokud předmět vybereme, a 0 pokud ne), pro který platí:

$$ \text{Maximalizovat } \sum_{i=1}^{n} v_i x_i $$
$$ \text{Za podmínky } \sum_{i=1}^{n} w_i x_i \le W $$

---

## Techniky řešení

Problém batohu patří do kategorie **NP-těžkých problémů** (konkrétně 0/1 problém batohu). To znamená, že neexistuje žádný známý algoritmus, který by našel *vždy* optimální (nejlepší možné) řešení v polynomiálním čase (tedy rychle i pro velké množství předmětů).

Existuje však řada přístupů, jak problém řešit – od hledání přesného řešení, přes chytré odhady, až po pokročilé evoluční techniky.

### 1. Hrubá síla (Brute Force)
Nejjednodušší, ale nejpomalejší metoda. Vyzkoušíme **všechny možné kombinace** předmětů. Spočítáme váhu a cenu každé kombinace, vyřadíme ty, co se nevejdou, a z ostatních vybereme tu nejlepší.
*   **Výhoda:** Vždy najde to absolutně nejlepší řešení.
*   **Nevýhoda:** Extrémně pomalé. S každým dalším předmětem se počet možností zdvojnásobí ($2^n$). Pro 20 předmětů je to přes milion kombinací, pro 30 předmětů miliarda.

### 2. Hladový algoritmus (Naive Greedy Algorithm)
Tento základní přístup funguje na principu "ber, co ti přijde pod ruku, dokud se ti to vejde".
*   **Strategie:** Procházíme předměty v tom pořadí, v jakém jsou nám zadány. Pokud se aktuální předmět do batohu vejde, dáme ho tam. Pokud ne, jdeme dál.
*   **Výhoda:** Extrémně rychlé ($O(n)$) – stačí jeden průchod seznamem.
*   **Nevýhoda:** Výsledek je často velmi špatný, protože algoritmus vůbec nezohledňuje cenu ani váhu, jen pořadí.

### 3. Heuristika – Poměr cena/výkon
Tato metoda je vylepšením hladového algoritmu. Předměty si nejprve "chytře" připravíme.

**Postup:**
1.  **Výpočet efektivity:** U každého předmětu vypočítáme poměr jeho ceny a hmotnosti ($v_i / w_i$). Tomuto číslu se říká měrná hodnota.
2.  **Seřazení:** Všechny předměty seřadíme sestupně podle této efektivity (od nejvýhodnějších po nejméně výhodné).
3.  **Výběr:** Bereme předměty postupně ze seřazeného seznamu.

*   **Výhoda:** Dává mnohem lepší výsledky než prostý hladový algoritmus.
*   **Nevýhoda:** Je pomalejší kvůli nutnosti řazení (složitost řazení je obvykle $O(n \log n)$ nebo $O(n^2)$), zatímco prostý průchod je lineární. Stále ale nezaručuje nalezení optimálního řešení (problém "hluchých míst" v batohu).

### 4. Náhodný výběr (Random Shooting)
Prostě náhodně vybereme předměty a zkontrolujeme, zda se vejdou. Tento proces opakujeme mnohokrát a pamatujeme si nejlepší nalezený výsledek.
*   **Výhoda:** Jednoduché na implementaci.
*   **Nevýhoda:** Je jen malá šance, že trefíme opravdu kvalitní řešení, natož to optimální.

### 5. Další heuristiky a metaheuristiky
Existuje mnoho dalších vylepšení. Například **Hill Climbing** (Horolezecký algoritmus), který vezme náhodné řešení a zkouší ho po malých krůčcích vylepšovat (např. výměnou jednoho předmětu za jiný), dokud se výsledek zlepšuje.

### 5. Genetické programování (Evoluční algoritmy)
Tato metoda se inspiruje biologií a evolucí.
*   Vytvoříme populaci mnoha náhodných řešení (jedinců).
*   Necháme je "soutěžit" – ta lepší (cennější batohy) mají větší šanci "přežít".
*   Úspěšná řešení se mezi sebou "kříží" (kombinují své vlastnosti) a "mutují" (náhodně se mění).
*   Po mnoha generacích obvykle získáme velmi kvalitní řešení.
*   **Výhoda:** Skvělé pro velmi složité problémy, kde jiné metody selhávají.

## Přehled implementovaných algoritmů

Zde najdete detailní popis a ukázky kódů pro jednotlivé techniky řešení Problému batohu:

### Hrubá síla (Brute Force)
*   **[Rekurzivní řešení](doc/brute-force-recursive.md)** – Prochází strom možností.
    *   Kód: [`src/brute-force-recursive.js`](src/brute-force-recursive.js)
*   **[Iterativní řešení](doc/brute-force-no-recursive.md)** – Využívá binární reprezentaci čísel.
    *   Kód: [`src/brute-force-no-recursive.js`](src/brute-force-no-recursive.js)

### Hladové algoritmy a Heuristiky
*   **[Naivní hladový algoritmus](doc/naive-greedy-algorithm.md)** – Bere věci, jak přijdou pod ruku.
    *   Kód: [`src/naive-greedy-algorithm.js`](src/naive-greedy-algorithm.js)
*   **[Heuristika poměr cena/výkon](doc/heuristic-ratio.md)** – Řadí předměty podle výhodnosti.
    *   Kód: [`src/heuristic-ratio.js`](src/heuristic-ratio.js)

### Pokročilé a Náhodné techniky
*   **[Náhodný výběr (Random Shooting)](doc/random-shooting.md)** – Metoda Monte Carlo.
    *   Kód: [`src/random-shooting.js`](src/random-shooting.js)
*   **[Genetický algoritmus](doc/genetic.md)** – Evoluční přístup s populacemi a křížením.
    *   Kód: [`src/genetic.js`](src/genetic.js)
