# =============================================================================
#  AI FUNDAMENTALS – Příklad č. 4: Kosinova podobnost
#  Nauč se měřit, jak moc jsou si dva vektory (= dvě slova) podobné.
# =============================================================================
#
#  Co potřebuješ:
#    - Python 3.x (žádné další knihovny)
#
#  Spuštění:
#    python 04_cosine_similarity.py
# =============================================================================

import math


# =====================================================================
# KROK 1: Co je Kosinova podobnost?
# =====================================================================
#
#  Místo počítání "vzdálenosti" počítáme "úhel" mezi vektory.
#
#  Vzorec:
#
#          A · B
#  cos θ = ——————————
#          |A| × |B|
#
#  Kde:
#    A · B  = skalární součin (dot product)
#    |A|    = délka vektoru A
#    |B|    = délka vektoru B
#
#  Výsledek:
#    ~1.0   → vektory míří stejným směrem → PODOBNÉ
#    ~0.0   → vektory jsou kolmé → ZCELA ODLIŠNÉ
#    ~-1.0  → vektory míří opačně → PROTIKLADNÉ
# =====================================================================

print("=" * 60)
print("  KOSINOVA PODOBNOST VEKTORŮ")
print("=" * 60)


# ------------------------------------------------------------
# Pomocné matematické funkce (bez knihoven)
# ------------------------------------------------------------

def dot_product(a, b):
    """
    Skalární součin: vynásobí odpovídající prvky a sečte výsledky.

    Příklad:
        a = [1, 2, 3]
        b = [4, 5, 6]
        dot = 1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32
    """
    return sum(x * y for x, y in zip(a, b))


def vector_length(v):
    """
    Délka (norma) vektoru = odmocnina ze součtu čtverců.

    Příklad:
        v = [3, 4]
        |v| = √(3² + 4²) = √(9 + 16) = √25 = 5
    """
    return math.sqrt(sum(x ** 2 for x in v))


def cosine_similarity(a, b):
    """
    Kosinova podobnost dvou vektorů.

    Args:
        a, b: seznamy čísel (vektory) stejné délky

    Returns:
        Číslo od -1.0 do 1.0
    """
    dot   = dot_product(a, b)
    len_a = vector_length(a)
    len_b = vector_length(b)

    # Ochrana před dělením nulou
    if len_a == 0 or len_b == 0:
        return 0.0

    return dot / (len_a * len_b)


# =====================================================================
# KROK 2: Ruční výpočet na jednoduchém příkladu
# =====================================================================

print("\n-- Ruční výpočet pro 2D vektory --\n")

# Představme si 2 dimenze:
#   dimenze 0 = "jak moc je slovo zvíře" (0 = vůbec, 1 = velmi)
#   dimenze 1 = "jak moc je slovo dopravní prostředek"

cat = [0.9, 0.1]   # hodně zvíře, málo dopravní prostředek
dog = [0.8, 0.2]   # hodně zvíře, trochu dopravní prostředek
car = [0.1, 0.9]   # málo zvíře, hodně dopravní prostředek

print(f"  cat = {cat}  (zvíře)")
print(f"  dog = {dog}  (zvíře)")
print(f"  car = {car}  (vozidlo)")
print()

# Vypočítejme krok za krokem pro cat vs dog
print("  Výpočet: cat vs dog")
dp  = dot_product(cat, dog)
la  = vector_length(cat)
lb  = vector_length(dog)
sim = dp / (la * lb)
print(f"    skalární součin:  {dp:.4f}")
print(f"    délka(cat):       {la:.4f}")
print(f"    délka(dog):       {lb:.4f}")
print(f"    podobnost:        {sim:.4f}  ← velmi podobné!\n")

# A pro cat vs car
print("  Výpočet: cat vs car")
dp  = dot_product(cat, car)
la  = vector_length(cat)
lb  = vector_length(car)
sim = dp / (la * lb)
print(f"    skalární součin:  {dp:.4f}")
print(f"    délka(cat):       {la:.4f}")
print(f"    délka(car):       {lb:.4f}")
print(f"    podobnost:        {sim:.4f}  ← velmi odlišné!")


# =====================================================================
# KROK 3: Porovnání sady slov (5D vektory)
# =====================================================================

print("\n" + "=" * 60)
print("  KROK 3: Porovnání 5D word embeddingů")
print("=" * 60)
print("""
  Tato čísla jsou ZJEDNODUŠENÉ příklady embeddingů.
  V reálném Word2Vec modelu by je AI natrénovala sama.
""")

word_vectors = {
    #           dim0   dim1   dim2   dim3   dim4
    "cat":  [ 0.21, -0.45,  0.87,  0.12, -0.33],
    "dog":  [ 0.19, -0.41,  0.84,  0.15, -0.30],
    "fish": [ 0.05, -0.22,  0.61,  0.08, -0.19],
    "car":  [-0.52,  0.88,  0.14, -0.71,  0.23],
    "bus":  [-0.48,  0.84,  0.11, -0.68,  0.27],
}

words = list(word_vectors.keys())

# Vytvoř tabulku podobností
print(f"\n  {'Dvojice':<20} | {'Podobnost':>10} | Interpretace")
print("  " + "-" * 60)

for i in range(len(words)):
    for j in range(i + 1, len(words)):
        w1  = words[i]
        w2  = words[j]
        sim = cosine_similarity(word_vectors[w1], word_vectors[w2])

        # Textová interpretace výsledku
        if sim > 0.95:
            note = "🟢 Téměř identické"
        elif sim > 0.70:
            note = "🟡 Dost podobné"
        elif sim > 0.40:
            note = "🟠 Trochu podobné"
        else:
            note = "🔴 Velmi odlišné"

        print(f"  {w1} vs {w2:<14} | {sim:>10.4f} | {note}")


# =====================================================================
# KROK 4: Prohledávání databáze podobných vět
# =====================================================================

print("\n" + "=" * 60)
print("  KROK 4: Vyhledávací systém – nejpodobnější věty")
print("=" * 60)
print("""
  Simulujeme jednoduchý sémantický vyhledávač.
  Zadáme dotaz, systém najde nejpodobnější větu z databáze.
  Vektory vět = Bag of Words.
""")

# Databáze vět
database = [
    "I love cats and dogs",
    "My cat is very cute",
    "Dogs are loyal animals",
    "I drive a fast car",
    "Cars and buses use fuel",
    "Pets are wonderful companions",
]

# Sestavení slovníku
all_words_set = set()
for s in database:
    all_words_set.update(s.lower().split())
vocab = sorted(all_words_set)


def sentence_to_bow_vector(sentence, vocabulary):
    """Převede větu na Bag of Words vektor."""
    words = sentence.lower().split()
    return [words.count(w) for w in vocabulary]


# Předpočítej vektory databáze
db_vectors = [sentence_to_bow_vector(s, vocab) for s in database]

# Dotaz uživatele
query = "I have a friendly dog"
print(f"  Dotaz: \"{query}\"\n")

query_vec = sentence_to_bow_vector(query, vocab)

# Porovnej s každou větou v databázi
results = []
for i, sentence in enumerate(database):
    sim = cosine_similarity(query_vec, db_vectors[i])
    results.append((sim, sentence))

results.sort(reverse=True)   # nejpodobnější první

print(f"  {'Podobnost':>10} | Věta")
print("  " + "-" * 55)
for sim, sent in results:
    bar = "█" * int(sim * 16)
    print(f"  {sim:>10.4f}  | {sent}")
    print(f"              | {bar}")

print()
print(f"  ✅ Nejpodobnější věta: \"{results[0][1]}\"")
print()
