# 7 mostů města Královce (Königsberg)

Jeden z nejslavnějších a vůbec prvních problémů teorie grafů pochází z 18. století. Formuloval a vyřešil jej švýcarský matematik **Leonhard Euler** v roce 1736. Tento problém položil základy celé teorii grafů a topologii.

## Formulace problému

Město Královec (dnes Kaliningrad) leželo na řece Pregole, která vytvářela dva ostrovy. Části města byly propojeny **sedmi mosty**.
Obyvatelé města si kladli otázku, která se stala populárním hlavolamem:

> *Je možné projít městem tak, že člověk vyjde z libovolného místa, přejde každý ze sedmi mostů **právě jednou**, a případně se ještě vrátí do výchozího bodu?*

Dlouho to nikdo nedokázal, ale ani nikdo nedokázal racionálně vysvětlit, proč to nejde.

## Eulerovo řešení a abstrakce

Euler si uvědomil, že **na přesném tvaru ostrovů nebo délce mostů vůbec nezáleží**. Důležité je pouze to, jak jsou jednotlivé části propojeny.

Celou situaci modeloval pomocí bodů a čar, neboli **vrcholů a hran**:
1. Každou část pevniny (dva břehy a dva ostrovy) nahradil **vrcholem** (celkem 4 vrcholy).
2. Každý most nahradil **hranou** spojující odpovídající pevniny (celkem 7 hran spojujících tyto vrcholy).

Získal tak strukturu, kterou dnes nazýváme **multigraf** (graf, kde může být více hran mezi stejnými vrcholy).

Euler zjistil, že řešení nezávisí na zkoušení všech cest, ale spočívá ve **stupních vrcholů** (počtu hran incidentních s vrcholem). 

- Pokud dojdeme na nějakou pevninu (vrchol) po jednom mostě, musíme ji opustit po **jiném** mostě (pokud to není cíl naší cesty a zároveň jsme neprošli všechny mosty).
- Z toho vyplývá pravidlo: Všechny vrcholy (se dvěma možnými výjimkami - startem a cílem) musí mít **sudý počet mostů** (hran), abychom do nich mohli vstoupit a zase odejít.

### Analýza Královce
Pojďme se podívat na stupně (počet hran) vrcholů pevniny v Královci:
- Horní břeh: 3 mosty (lichý stupeň)
- Spodní břeh: 3 mosty (lichý stupeň)
- Pravý ostrov: 3 mosty (lichý stupeň)
- Levý (hlavní) ostrov: 5 mostů (lichý stupeň)

Protože všechny 4 pevniny mají **lichý počet mostů**, cesta, kde projdete každý most právě jednou, **neexistuje**.

---

## Eulerovské tahy v teorii grafů

Na základě tohoto problému dnes definujeme dva klíčové pojmy v teorii spojitých, neorientovaných grafů:

### 1. Eulerovský tah (Eulerian path / trail)
Cesta v grafu, která obsahuje **každou hranu grafu právě jednou**.
Může začínat a končit v různých vrcholech. (Umožňuje tím pádem přechod přes každý most ve městě právě jednou).

**Podmínka existence:**
Graf obsahuje Eulerovský tah právě tehdy, když je souvislý a má **právě 0 nebo 2 vrcholy lichého stupně**.
- Pokud jich je 0, tah je zároveň uzavřený kruh (viz níže).
- Pokud jsou 2, tah musí začínat v jednom lichém vrcholu a skončit ve druhém.

### 2. Eulerovský kruh (Eulerian circuit / cycle)
Je to Eulerovský tah, který je **uzavřený**, tedy začíná a končí ve **stejném vrcholu**.

**Podmínka existence:**
Graf obsahuje Eulerovský kruh právě tehdy, když je souvislý a **VŠECHNY jeho vrcholy mají sudý stupeň**.

*(Rozdíl: Zatímco Eulerovský tah/kruh se zaměřuje na projití hran (mostů), Hamiltonovská cesta se zaměřuje na návštěvu **všech vrcholů** (pevnin) přesně jednou).*
