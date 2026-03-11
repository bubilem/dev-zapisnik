# Reprezentace grafu v paměti počítače

Graf je abstraktní struktura. Abychom s ním mohli pracovat v programu, musíme ho nějak uložit do paměti.

Nejčastější způsoby reprezentace jsou:

1.  **Matice sousednosti (Adjacency Matrix)**
2.  **Seznam sousedů (Adjacency List)**
3.  **Incidenční matice (Incidence Matrix)**
4.  **Objektová reprezentace**

---

## 1. Matice sousednosti

Je to čtvercová matice $n \times n$ (kde $n$ je počet vrcholů).
- Řádky i sloupce odpovídají vrcholům.
- Hodnota na pozici `[i][j]` určuje, zda (nebo s jakou vahou) existuje hrana z $i$ do $j$.
- **Výhoda:** Rychlé zjištění existence hrany $O(1)$.
- **Nevýhoda:** Velká paměťová náročnost $O(V^2)$, nevhodné pro řídké grafy.

### Příklad (Neorientovaný, neohodnocený)
```
  A B C
A 0 1 1
B 1 0 0
C 1 0 0
```
(A je spojeno s B a C, B jen s A, C jen s A)

### Implementace

#### Python (Matice sousednosti)
```python
# Reprezentace pomocí 2D pole (list of lists)
graph = [
    [0, 1, 1], # A
    [1, 0, 0], # B
    [1, 0, 0]  # C
]

def has_edge(g, u, v):
    return g[u][v] == 1

print(has_edge(graph, 0, 1)) # True (A-B)
```

#### PHP (Matice sousednosti)
```php
$graph = [
    [0, 1, 1],
    [1, 0, 0],
    [1, 0, 0]
];

function hasEdge($g, $u, $v) {
    return $g[$u][$v] === 1;
}
```

---

## 2. Seznam sousedů (Adjacency List)

Pro každý vrchol máme seznam (list/array) vrcholů, se kterými sousedí.
- **Výhoda:** Úspora paměti $O(V+E)$ pro řídké grafy.
- **Nevýhoda:** Zjištění existence hrany trvá déle $O(\text{stupeň vrcholu})$.

### Implementace

#### Python (Slovník seznamů)
```python
graph = {
    'A': ['B', 'C'],
    'B': ['A'],
    'C': ['A', 'D'],
    'D': []
}

for neighbor in graph['A']:
    print(f"A sousedí s {neighbor}")
```

#### PHP (Asociativní pole)
```php
$graph = [
    'A' => ['B', 'C'],
    'B' => ['A'],
    'C' => ['A', 'D'],
    'D' => []
];

foreach ($graph['A'] as $neighbor) {
    echo "A sousedí s $neighbor\n";
}
```

---

## 3. Objektová reprezentace

Každý vrchol je objekt (instace třídy), který obsahuje seznam odkazů na sousední objekty (vrcholy).

### Implementace

#### Python (Třída Node)
```python
class Node:
    def __init__(self, value):
        self.value = value
        self.neighbors = [] # List of Node objects

    def add_edge(self, node):
        self.neighbors.append(node)

# Vytvoření grafu
a = Node('A')
b = Node('B')
c = Node('C')

a.add_edge(b) # A -> B
a.add_edge(c) # A -> C
```

#### PHP (Třída Node)
```php
class Node {
    public $value;
    public $neighbors = [];

    public function __construct($value) {
        $this->value = $value;
    }

    public function addEdge(Node $node) {
        $this->neighbors[] = $node;
    }
}

$a = new Node('A');
$b = new Node('B');
$a->addEdge($b); // A -> B
```

---

## 4. Incidenční matice

Matice $V \times E$ (vrcholy $\times$ hrany).
- Řádky jsou vrcholy, sloupce jsou hrany.
- Hodnota určuje, zda je vrchol součástí dané hrany.
- Používá se méně často (např. v hypergrafech).

### Příklad (Neorientovaný)

Mějme graf se 3 vrcholy (A, B, C) a 2 hranami ($e_1$ mezi A a B, $e_2$ mezi A a C).

```text
   e1 e2
A  1  1
B  1  0
C  0  1
```
(Vrchol A je součástí hran $e_1$ i $e_2$, vrchol B jen $e_1$, vrchol C jen $e_2$)

### Implementace

#### Python (Incidenční matice)
```python
# Řádky jsou vrcholy (A=0, B=1, C=2), sloupce jsou hrany (e1=0, e2=1)
graph = [
    [1, 1], # A
    [1, 0], # B
    [0, 1]  # C
]

def is_incident(g, v, e):
    return g[v][e] == 1

print(is_incident(graph, 0, 0)) # True (vrchol A leží na hraně e1)
```

#### PHP (Incidenční matice)
```php
// Řádky jsou vrcholy (A=0, B=1, C=2), sloupce jsou hrany (e1=0, e2=1)
$graph = [
    [1, 1],
    [1, 0],
    [0, 1]
];

function isIncident($g, $v, $e) {
    return $g[$v][$e] === 1;
}

echo isIncident($graph, 0, 0) ? "True\n" : "False\n"; // Vypíše True
```
