# Základní grafové algoritmy

Všechny grafové algoritmy stojí na **prohledávání grafu**.
Základem je navštívit všechny vrcholy, které jsou dosažitelné z *výchozího vrcholu (start node)*.

Používáme dva hlavní algoritmy:
1.  **BFS (Breadth-First Search) - Prohledávání do šířky**
    - Používá se pro hledání **nejkratší cesty** v neohodnoceném grafu.
    - Využívá Frontu (Queue - FIFO).
2.  **DFS (Depth-First Search) - Prohledávání do hloubky**
    - Používá se pro topologické třídění, hledání cyklů, hledání komponent souvislosti.
    - Využívá Zásobník (Stack - LIFO) nebo rekurzi.

---

## 1. Test existence cesty (Connected Components)

**Otázka:** Existuje cesta mezi vrcholem A a B?
**Řešení:** Spustíme prohledávání (BFS nebo DFS) z vrcholu A a zjistíme, zda jsme navštívili vrchol B.

### Příklad rekurzivního DFS pro zjištění dosažitelnosti

```python
visited = set()

def dfs_exists_path(graph, start, end):
    if start == end:
        return True
    
    visited.add(start)
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            if dfs_exists_path(graph, neighbor, end):
                return True
                
    return False
```

### Příklad iterativního DFS pro zjištění dosažitelnosti

```python
def dfs_exists_path_iterative(graph, start, end):
    visited = set()
    to_visit = [start] # Zásobník s prvky k navštívení
    
    while to_visit: # Dokud není zásobník prázdný
        current = to_visit.pop() # Vyjme a vrátí poslední prvek (LIFO)
        
        if current == end:
            # Našli jsme cíl
            return True
            
        if current not in visited:
            # Označíme vrchol jako navštívený
            visited.add(current)
            
            # Přidáme všechny nenavštívené sousedy do zásobníku k pozdější návštěvě
            for neighbor in graph[current]:
                if neighbor not in visited:
                    to_visit.append(neighbor)
                    
    return False
```

---

## 2. Nalezení cesty (Path Finding)

**Otázka:** Jaká je konkrétní cesta z A do B?
**Řešení:** Při prohledávání si pamatujeme **předchůdce** (parent) každého vrcholu. 
Když dojdeme do cíle, "zrekonstruujeme" cestu zpětně od B k A a poté ji otočíme.

**Rekonstrukce cesty:** `B -> parent[B] -> parent[parent[B]] ... -> A`

### Příklad implementace (Nalezení cesty pomocí BFS)

```python
from collections import deque

def find_path_bfs(graph, start, end):
    # Fronta pro BFS udržuje uzly k navštívení
    queue = deque([start])
    
    # Slovník předchůdců: klíč je uzel, hodnota je uzel, ze kterého jsme přišli
    # Slouží zároveň jako množina navštívených uzlů (visited)
    parent = {start: None}
    
    while queue:
        current = queue.popleft() # Vyjme a vrátí první prvek (FIFO)
        
        if current == end:
            # Našli jsme cíl, zrekonstruujeme cestu pomocí předchůdců
            path = []
            curr_node = end
            # Zpětný průchod od cíle ke startu
            while curr_node is not None:
                path.append(curr_node)
                curr_node = parent[curr_node]
            # Cesta je konstruována pozpátku, proto ji otočíme
            path.reverse()
            return path
            
        for neighbor in graph[current]:
            if neighbor not in parent:
                # Zaznamenáme si, odkud jsme do souseda přišli
                parent[neighbor] = current
                queue.append(neighbor)
                
    return None # Cesta neexistuje

# Příklad použití
graph_example = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print(find_path_bfs(graph_example, 'A', 'F')) # Vypíše: ['A', 'C', 'F']
```

---

## 3. Nejkratší cesta (Shortest Path)

**A) V neohodnoceném grafu:**
- Použijeme **BFS**.
- BFS garantuje nalezení nejkratší cesty (v počtu hran), protože prohledává graf po vrstvách (vzdálenost 1, vzdálenost 2, atd.).

**B) V ohodnoceném grafu:**
- BFS nestačí (kratší cesta může mít více hran s menšími váhami).
- Používá se **Dijkstrův algoritmus**.
    - Funguje pro grafy s nezápornými vahami hran.
    - Používá prioritní frontu (Priority Queue).
    - V každém kroku vybírá vrchol s nejmenší aktuální vzdáleností od startu.
    - Relaxuje hrany (zkouší vylepšit vzdálenost k sousedům).

**C) V grafu se zápornými vahami:**
- Bellman-Fordův algoritmus.

---

## Příklad - Dijkstrův algoritmus (Princip)

Mějme graf:
- A -> B (váha 10)
- A -> C (váha 3)
- C -> B (váha 2)
- C -> D (váha 8)
- B -> D (váha 1)

**Cíl: Nejkratší cesta z A do D.**

1. **Inicializace:** Vzdálenost A=0, ostatní=nekonečno.
2. **Krok 1 (Z A):**
   - Do B se dostaneme za 10. `dist[B] = 10`.
   - Do C se dostaneme za 3. `dist[C] = 3`.
3. **Krok 2 (Vybereme nejbližší: C, protože 3 < 10):**
   - Z C do B: $3 + 2 = 5$. Protože $5 < 10$, aktualizujeme `dist[B] = 5`. (Našli jsme lepší cestu přes C).
   - Z C do D: $3 + 8 = 11$. `dist[D] = 11`.
4. **Krok 3 (Vybereme nejbližší nezpracovaný: B, protože 5 < 11):**
   - Z B do D: $5 + 1 = 6$. Protože $6 < 11$, aktualizujeme `dist[D] = 6`.
5. **Výsledek:** Nejkratší cesta do D má délku 6 (Cesta A -> C -> B -> D).

### Implementace v Pythonu

```python
import heapq

def dijkstra_shortest_path(graph, start, end):
    # Inicializace vzdáleností na nekonečno
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0
    
    # Prioritní fronta: ukládá dvojice (vzdálenost, vrchol)
    pq = [(0, start)]
    
    # Slovník předchůdců pro rekonstrukci cesty 
    parent = {start: None}
    
    while pq:
        # Vybereme vrchol s nejmenší známou vzdáleností
        current_distance, current_vertex = heapq.heappop(pq)
        
        # Můžeme optimalizovat: pokud vyjmeme cílový uzel a jedná se o nejkratší cestu do něj, 
        # nemusíme dál prohledávat (protože už všechny ostastní cesty z pq mají větší nebo rovnou vzdálenost).
        if current_vertex == end:
            break
        
        # Pokud jsme našli lepší cestu už dříve, přeskočíme
        if current_distance > distances[current_vertex]:
            continue
        
        # Projdeme sousedy
        for neighbor, weight in graph[current_vertex].items():
            distance = current_distance + weight
            
            # Pokud najdeme kratší cestu k sousedovi
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                parent[neighbor] = current_vertex # Zaznamenáme si ze kterého uzlu jsme se dostali nejrychleji
                heapq.heappush(pq, (distance, neighbor))
                
    # Rekonstrukce cesty, pokud existuje spojení do cíle
    path = []
    if distances[end] != float('infinity'):
        curr_node = end
        while curr_node is not None:
            path.append(curr_node)
            curr_node = parent.get(curr_node, None) # Může se stát, že uzel parent nemá, pokud jsme u konce
        path.reverse()
        
    return distances[end], path

# Použití (odpovídá příkladu výše)
graf = {
    'A': {'B': 10, 'C': 3},
    'B': {'D': 1},
    'C': {'B': 2, 'D': 8},
    'D': {}
}

shortest_distance, shortest_path = dijkstra_shortest_path(graf, 'A', 'D')
print(f"Vzdálenost: {shortest_distance}")
print(f"Cesta: {' -> '.join(shortest_path)}")
# Výsledek:
# Vzdálenost: 6
# Cesta: A -> C -> B -> D
```
