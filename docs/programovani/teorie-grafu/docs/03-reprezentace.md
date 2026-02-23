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
graf = [
    [0, 1, 1], # A
    [1, 0, 0], # B
    [1, 0, 0]  # C
]

def existuje_hrana(g, u, v):
    return g[u][v] == 1

print(existuje_hrana(graf, 0, 1)) # True (A-B)
```

#### PHP (Matice sousednosti)
```php
$graf = [
    [0, 1, 1],
    [1, 0, 0],
    [1, 0, 0]
];

function existujeHrana($g, $u, $v) {
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
graf = {
    'A': ['B', 'C'],
    'B': ['A'],
    'C': ['A', 'D'],
    'D': []
}

for soused in graf['A']:
    print(f"A sousedí s {soused}")
```

#### PHP (Asociativní pole)
```php
$graf = [
    'A' => ['B', 'C'],
    'B' => ['A'],
    'C' => ['A', 'D'],
    'D' => []
];

foreach ($graf['A'] as $soused) {
    echo "A sousedí s $soused\n";
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
        self.sousede = [] # List of Node objects

    def add_edge(self, node):
        self.sousede.append(node)

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
    public $sousede = [];

    public function __construct($value) {
        $this->value = $value;
    }

    public function addEdge(Node $node) {
        $this->sousede[] = $node;
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
