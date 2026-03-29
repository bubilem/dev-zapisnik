# =============================================================================
#  AI FUNDAMENTALS – Příklad č. 1: One-Hot Encoding
#  Nauč se, jak slova převést na vektory metodou "jednoho horkého bitu".
# =============================================================================
#
#  Co potřebuješ:
#    - Python 3.x (žádné další knihovny)
#
#  Spuštění:
#    python 01_one_hot_encoding.py
# =============================================================================

# ------------------------------------------------------------
# KROK 1: Definice slovníku
# Slovník = množina všech slov, se kterými pracujeme.
# ------------------------------------------------------------

vocabulary = ["cat", "dog", "fish", "bird", "ant"]

print("=" * 50)
print("  ONE-HOT ENCODING")
print("=" * 50)
print(f"\nNáš slovník: {vocabulary}")
print(f"Počet slov:  {len(vocabulary)}\n")


# ------------------------------------------------------------
# KROK 2: Funkce pro převod slova na one-hot vektor
#
# Princip:
#   - Vytvoříme seznam nul o délce rovné počtu slov ve slovníku.
#   - Na pozici, kde se nachází naše slovo, místo 0 napíšeme 1.
# ------------------------------------------------------------

def one_hot(word, vocabulary):
    """
    Převede slovo na one-hot vektor.

    Args:
        word:       Slovo, které chceme zakódovat.
        vocabulary: Seznam všech slov (slovník).

    Returns:
        Seznam čísel (0 nebo 1) – vektor daného slova.
    """
    # Začneme s vektorem samých nul
    vector = [0] * len(vocabulary)

    if word in vocabulary:
        index = vocabulary.index(word)  # najdi pozici slova
        vector[index] = 1               # na té pozici dej 1
    else:
        print(f"  ⚠️  Slovo '{word}' není ve slovníku!")

    return vector


# ------------------------------------------------------------
# KROK 3: Převod každého slova a výpis výsledku
# ------------------------------------------------------------

print("-" * 50)
print(f"{'Slovo':<10} | Vektor")
print("-" * 50)

for word in vocabulary:
    vec = one_hot(word, vocabulary)
    print(f"  {word:<8} | {vec}")

print("-" * 50)


# ------------------------------------------------------------
# KROK 4: Zkus slovo, které ve slovníku NENÍ
# ------------------------------------------------------------

print("\n-- Test slova mimo slovník --")
unknown = "elephant"
vec = one_hot(unknown, vocabulary)
print(f"  Výsledek pro '{unknown}': {vec}")


# ------------------------------------------------------------
# KROK 5: Proč je one-hot encoding omezený?
#
# Zkus porovnat vektory "cat" a "dog" – jsou stejně "vzdálené"
# jako "cat" a "ant", přestože kočka a pes jsou si podobnější.
# ------------------------------------------------------------

print("\n-- Porovnání vzdáleností vektorů --")

vec_cat  = one_hot("cat",  vocabulary)
vec_dog  = one_hot("dog",  vocabulary)
vec_ant  = one_hot("ant",  vocabulary)

# Vzdálenost = počet pozic, kde se vektory liší
def hamming_distance(a, b):
    """Spočítá Hammingovu vzdálenost dvou vektorů (počet rozdílných pozic)."""
    return sum(1 for x, y in zip(a, b) if x != y)

dist_cat_dog = hamming_distance(vec_cat, vec_dog)
dist_cat_ant = hamming_distance(vec_cat, vec_ant)

print(f"  Vzdálenost 'cat' a 'dog': {dist_cat_dog}")  # 2 – stejně!
print(f"  Vzdálenost 'cat' a 'ant': {dist_cat_ant}")  # 2 – stejně!
print()
print("  ❌ One-Hot neví, že kočka a pes jsou si blíže než kočka a mravenec.")
print("  ✅ Tímto problémem se zabývá Word Embedding (viz příklad 03).")
print()
