# Vlastnosti a dělení grafů

Grafy můžeme dělit podle různých kritérií. Základní dělení se týká směru hran a existence ohodnocení.

## 1. Dělení grafů

### Orientovaný graf (Directed Graph / Digraph)
- Hrany mají **směr** (šipky).
- Cesta z A do B neznamená automaticky cestu z B do A.
- Příklad: Tok řeky, webové stránky s odkazy (jednosměrné), silnice s jednosměrkami.
- Hrana je uspořádaná dvojice `(u, v)`.

### Neorientovaný graf (Undirected Graph)
- Hrany nemají směr. Spojení je symetrické.
- Cesta z A do B je stejná jako z B do A.
- Příklad: Silnice (obousměrné), přátelství na Facebooku.
- Hrana je neuspořádaná dvojice `{u, v}`.

### Ohodnocený graf (Weighted Graph)
- Každá hrana má přiřazenu číselnou **hodnotu (váhu)**.
- Váha může reprezentovat vzdálenost, cenu, čas, kapacitu atd.
- Příklad: Silniční síť (vzdálenost v km), potrubní síť (kapacita průtoku).

### Neohodnocený graf (Unweighted Graph)
- Všechny hrany jsou si rovny (váha 1).
- Příklad: Mapa metra (počet zastávek), sociální síť (existence spojení).

---

## 2. Speciální typy grafů a vlastnosti

### Úplný graf (Complete Graph)
- Každý vrchol je spojen hranou s každým jiným vrcholem.
- Označuje se $K_n$, kde $n$ je počet vrcholů.
- Maximální možný počet hran pro daný počet vrcholů.

### Bipartitní graf (Bipartite Graph)
- Vrcholy lze rozdělit do dvou disjunktních množin tak, že hrany vedou pouze mezi těmito množinami, nikdy uvnitř množiny.
- Příklad: Vztahy "Zaměstnanci" vs "Projekty".

### Souvislý graf (Connected Graph)
- Z každého vrcholu existuje cesta do libovolného jiného vrcholu.
- Pokud graf není souvislý, skládá se z komponent souvislosti.

### Strom (Tree)
- Souvislý graf bez kružnic (cyklů).
- Má $n$ vrcholů a přesně $n-1$ hran.
- Hierarchická struktura (např. souborový systém).

---

## 3. Další důležité vlastnosti

### Stupeň vrcholu (Degree)
- Počet hran připojených k danému vrcholu.
- V orientovaném grafu rozlišujeme **vstupní stupeň** (in-degree) a **výstupní stupeň** (out-degree).

### Rovinnost grafu (Planarity)
- Graf je rovinný, pokud ho lze nakreslit do roviny tak, aby se žádné dvě hrany nekřížily (mimo vrcholy).
- Důležité pro návrh plošných spojů (PCB) nebo map.

### Barvení grafu (Graph Coloring)
- Problém přiřazení barev vrcholům tak, aby žádné dva sousední vrcholy neměly stejnou barvu.
- **Chromatické číslo**: Minimální počet barev potřebný k obarvení grafu.
- Aplikace: Rozvrhování (např. zkoušek, aby se nepřekrývaly předměty), alokace registrů v kompilátorech.
- Slavná věta o čtyřech barvách: Každou rovinnou mapu lze obarvit maximálně 4 barvami.

### Klika (Clique)
- Podgraf, který je úplným grafem.
- Skupina vrcholů, kde je každý s každým propojen.
- V sociálních sítích: Skupina přátel, kde se všichni navzájem znají.
