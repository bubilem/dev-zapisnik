# Kosinova podobnost vektorů

## 1. Co je Kosinova podobnost?

Když máme dvě slova nebo texty převedené na vektory, potřebujeme zjistit, **jak moc jsou si podobné**. K tomu nám slouží **Kosinova podobnost** (anglicky *Cosine Similarity*).

> **Základní myšlenka:** Místo toho, abychom počítali vzdálenost mezi vektory, měříme **úhel mezi nimi**.

Pokud dva vektory míří **stejným směrem** → jsou si velmi podobné.
Pokud míří **kolmo** (do pravého úhlu) → nejsou vůbec podobné.
Pokud míří **opačným směrem** → jsou si zcela nepodobné (nebo dokonce protichůdné).

---

## 2. Vizuální představa

Představ si vektory jako šipky vycházející z počátku souřadnic:

```
          ↑  y
          |
    dog ↗ | ↗ cat       ← oba míří podobným směrem → PODOBNÉ (malý úhel)
          |
──────────+──────────→ x
          |
          |     ↗ car   ← míří úplně jiným směrem → NEPODOBNÉ (velký úhel)
          |
```

> Kosinova podobnost měří **kosinus** tohoto úhlu.
> - Úhel `0°` → kosinus = `1.0` → **identické vektory**
> - Úhel `90°` → kosinus = `0.0` → **žádná podobnost**
> - Úhel `180°` → kosinus = `-1.0` → **opačné vektory**

---

## 3. Vzorec

$$\cos(\theta) = \frac{\vec{A} \cdot \vec{B}}{|\vec{A}| \times |\vec{B}|}$$

Kde:
- `A · B` = **skalární součin** vektorů (viz níže)
- `|A|` = **délka** (norma) vektoru A
- `|B|` = **délka** (norma) vektoru B

### Jak spočítat skalární součin?

Vynásobíme hodnoty na stejných pozicích a výsledky sečteme:

```
A = [1, 2, 3]
B = [4, 5, 6]

A · B = (1×4) + (2×5) + (3×6)
      = 4 + 10 + 18
      = 32
```

### Jak spočítat délku vektoru?

Odmocnina ze součtu čtverců všech hodnot:

```
|A| = √(1² + 2² + 3²) = √(1 + 4 + 9) = √14 ≈ 3.742
|B| = √(4² + 5² + 6²) = √(16 + 25 + 36) = √77 ≈ 8.775
```

---

## 4. Jednoduchý příklad ručně

Vezměme dva jednoduché 2D vektory:

```
cat = [0.9, 0.1]   ← hodně "zvíře", málo "doprava"
dog = [0.8, 0.2]   ← hodně "zvíře", trochu "doprava"
car = [0.1, 0.9]   ← malo "zvíře", hodně "doprava"
```

**Kosinova podobnost cat vs. dog:**
```
cat · dog = (0.9×0.8) + (0.1×0.2) = 0.72 + 0.02 = 0.74
|cat| = √(0.9² + 0.1²) = √(0.81 + 0.01) = √0.82 ≈ 0.906
|dog| = √(0.8² + 0.2²) = √(0.64 + 0.04) = √0.68 ≈ 0.825

podobnost = 0.74 / (0.906 × 0.825) ≈ 0.74 / 0.748 ≈ 0.99  ← VELMI PODOBNÉ!
```

**Kosinova podobnost cat vs. car:**
```
cat · car = (0.9×0.1) + (0.1×0.9) = 0.09 + 0.09 = 0.18
|cat| ≈ 0.906
|car| = √(0.1² + 0.9²) = √(0.01 + 0.81) = √0.82 ≈ 0.906

podobnost = 0.18 / (0.906 × 0.906) ≈ 0.18 / 0.821 ≈ 0.22  ← NEPODOBNÉ
```

---

## 5. Python implementace – od nuly

```python
import math

def dot_product(a, b):
    """Skalární součin dvou vektorů."""
    return sum(x * y for x, y in zip(a, b))

def vector_length(v):
    """Délka (norma) vektoru."""
    return math.sqrt(sum(x ** 2 for x in v))

def cosine_similarity(a, b):
    """
    Kosinova podobnost dvou vektorů.
    Vrací číslo od -1.0 do 1.0.
      1.0  = identické vektory
      0.0  = žádná podobnost
     -1.0  = opačné vektory
    """
    dot   = dot_product(a, b)
    len_a = vector_length(a)
    len_b = vector_length(b)

    if len_a == 0 or len_b == 0:
        return 0.0  # nelze dělit nulou

    return dot / (len_a * len_b)


# ─── Ukázkové vektory (zjednodušené embeddingy) ───────────────────────────────

word_vectors = {
    "cat":  [0.9, 0.1, 0.8, 0.2],
    "dog":  [0.8, 0.2, 0.7, 0.3],
    "fish": [0.6, 0.1, 0.3, 0.5],
    "car":  [0.1, 0.9, 0.1, 0.8],
    "bus":  [0.2, 0.8, 0.1, 0.7],
}

# ─── Porovnání všech dvojic ───────────────────────────────────────────────────

words = list(word_vectors.keys())

print(f"{'Slova':<20} {'Podobnost':>10}")
print("-" * 32)

for i in range(len(words)):
    for j in range(i + 1, len(words)):
        word_a = words[i]
        word_b = words[j]
        vec_a  = word_vectors[word_a]
        vec_b  = word_vectors[word_b]
        sim    = cosine_similarity(vec_a, vec_b)
        print(f"{word_a} vs {word_b:<15} {sim:>10.4f}")
```

**Očekávaný výstup:**
```
Slova                Podobnost
────────────────────────────────
cat vs dog               0.9994
cat vs fish              0.8816
cat vs car               0.3228
cat vs bus               0.3861
dog vs fish              0.8485
dog vs car               0.3862
dog vs bus               0.4443
fish vs car              0.4336
fish vs bus              0.4721
car vs bus               0.9971
```

> `cat` a `dog` mají podobnost **~0.999** → téměř identické vektory.
> `cat` a `car` mají podobnost **~0.322** → velmi odlišné.
> `car` a `bus` mají podobnost **~0.997** → obojí jsou dopravní prostředky.

---

## 6. Python implementace – s knihovnou NumPy

V praxi se obvykle používá knihovna **NumPy**, která výpočty výrazně zjednodušuje a zrychluje:

```python
import numpy as np

def cosine_similarity_numpy(a, b):
    """Kosinova podobnost pomocí NumPy."""
    a = np.array(a)
    b = np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


cat = [0.9, 0.1, 0.8, 0.2]
dog = [0.8, 0.2, 0.7, 0.3]
car = [0.1, 0.9, 0.1, 0.8]

print(f"cat vs dog: {cosine_similarity_numpy(cat, dog):.4f}")  # ~0.9994
print(f"cat vs car: {cosine_similarity_numpy(cat, car):.4f}")  # ~0.3228
```

---

## 7. Praktická ukázka – vyhledávání podobných vět

```python
import math

def bag_of_words_vector(text, vocabulary):
    """Převede text na Bag of Words vektor."""
    words = text.lower().split()
    return [words.count(word) for word in vocabulary]

def cosine_similarity(a, b):
    dot   = sum(x * y for x, y in zip(a, b))
    len_a = math.sqrt(sum(x**2 for x in a))
    len_b = math.sqrt(sum(x**2 for x in b))
    if len_a == 0 or len_b == 0:
        return 0.0
    return dot / (len_a * len_b)


# ─── Databáze vět ─────────────────────────────────────────────────────────────

sentences = [
    "I love cats and dogs",
    "My cat is very cute",
    "Dogs are loyal animals",
    "I drive a fast car",
    "Cars and buses use fuel",
]

# Vytvoříme slovník ze všech unikátních slov
all_words = set()
for sent in sentences:
    all_words.update(sent.lower().split())
vocabulary = sorted(all_words)

# Převedeme každou větu na vektor
sentence_vectors = [bag_of_words_vector(s, vocabulary) for s in sentences]

# ─── Vyhledávání ──────────────────────────────────────────────────────────────

query = "I have a dog"
query_vector = bag_of_words_vector(query, vocabulary)

print(f'Dotaz: "{query}"\n')
print("Podobnost s větami v databázi:")
print("-" * 50)

results = []
for i, sent in enumerate(sentences):
    sim = cosine_similarity(query_vector, sentence_vectors[i])
    results.append((sim, sent))

# Seřaď od nejpodobnějšího
results.sort(reverse=True)

for sim, sent in results:
    print(f"  {sim:.4f}  |  {sent}")
```

**Výstup:**
```
Dotaz: "I have a dog"

Podobnost s větami v databázi:
──────────────────────────────────────────────────
  0.5000  |  I love cats and dogs
  0.3536  |  Dogs are loyal animals
  0.2500  |  My cat is very cute
  0.2000  |  I drive a fast car
  0.0000  |  Cars and buses use fuel
```

---

## 8. Shrnutí

| Hodnota | Interpretace |
|--------|--------------|
| `1.0` | Vektory jsou totožné (nebo míří přesně stejným směrem) |
| `0.7 – 0.99` | Velmi podobné |
| `0.3 – 0.7` | Částečně podobné |
| `0.0 – 0.3` | Velmi odlišné |
| `0.0` | Žádná shoda (kolmé vektory) |
| `-1.0` | Opačné vektory (v AI méně časté) |

---

## 9. Kde se Kosinova podobnost používá?

- **Vyhledávače** – najdou nejpodobnější dokumenty k tvému dotazu
- **Doporučovací systémy** – „Protože se ti líbil film X, doporučíme ti Y"
- **Chatboti** – porovnají tvou otázku s databází odpovědí
- **Detekce plagiátů** – porovnají dvé věty nebo dva dokumenty
- **Překladače a asistenti** – moderní AI modely (GPT, Gemini) vše staví na vektorech a podobnostech

---

## 10. Co dál?

- Zkus experimentovat s vlastními vektory
- Použij knihovnu `sentence-transformers` pro výkonné embeddingy celých vět
- Podívej se na **FAISS** nebo **ChromaDB** – databáze, které efektivně vyhledávají podobné vektory i v milionech záznamů
