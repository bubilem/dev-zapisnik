# =============================================================================
#  AI FUNDAMENTALS – Příklad č. 2: Bag of Words & TF-IDF
#  Nauč se, jak reprezentovat celé věty jako vektory čísel.
# =============================================================================
#
#  Co potřebuješ:
#    - Python 3.x (žádné další knihovny)
#
#  Spuštění:
#    python 02_bag_of_words_tfidf.py
# =============================================================================

import math
from collections import Counter


# =====================================================================
# ČÁST A – BAG OF WORDS
# =====================================================================

print("=" * 60)
print("  ČÁST A: BAG OF WORDS (Pytel slov)")
print("=" * 60)


# ------------------------------------------------------------
# Data: naše trénovací věty (corpus)
# ------------------------------------------------------------

corpus = [
    "I love cats",
    "I love dogs",
    "cats and dogs are pets",
    "I drive a car",
    "cars and buses are vehicles",
]

print("\nNáše věty (corpus):")
for i, sentence in enumerate(corpus, 1):
    print(f"  [{i}] {sentence}")


# ------------------------------------------------------------
# Krok 1: Sestavení slovníku ze všech vět
# ------------------------------------------------------------

all_words_raw = []
for sentence in corpus:
    for word in sentence.lower().split():
        if word not in all_words_raw:
            all_words_raw.append(word)

vocabulary = sorted(all_words_raw)   # seřadíme abecedně pro přehlednost

print(f"\nSlovník ({len(vocabulary)} slov): {vocabulary}")


# ------------------------------------------------------------
# Krok 2: Funkce pro převod věty na Bag of Words vektor
# ------------------------------------------------------------

def bag_of_words(sentence, vocabulary):
    """
    Převede větu na Bag of Words vektor.
    Každá pozice vektoru odpovídá jednomu slovu ze slovníku
    a obsahuje počet výskytů tohoto slova ve větě.

    Args:
        sentence:   Vstupní věta (řetězec).
        vocabulary: Seřazený seznam slov (slovník).

    Returns:
        Seznam celých čísel – vektor věty.
    """
    words = sentence.lower().split()
    word_counts = Counter(words)
    return [word_counts[word] for word in vocabulary]


# ------------------------------------------------------------
# Krok 3: Výpis vektorů pro každou větu
# ------------------------------------------------------------

print("\nBag of Words vektory:")
print(f"\n  {'Věta':<35} | Vektor")
print("  " + "-" * 70)

sentence_vectors = []
for sentence in corpus:
    vec = bag_of_words(sentence, vocabulary)
    sentence_vectors.append(vec)
    print(f"  {sentence:<35} | {vec}")

# Záhlaví – ukazuje, které slovo je na které pozici
header = [f"{w[:4]:<4}" for w in vocabulary]
print(f"\n  (Sloupce odpovídají slovům: {' | '.join(header)})")


# =====================================================================
# ČÁST B – TF-IDF
# =====================================================================

print("\n")
print("=" * 60)
print("  ČÁST B: TF-IDF (Chytrý Bag of Words)")
print("=" * 60)
print("""
  Vzácná, specifická slova dostávají vyšší váhu.
  Běžná slova ('a', 'and', 'are') dostávají váhu nízkou.
""")


# ------------------------------------------------------------
# Pomocné funkce pro výpočet TF a IDF
# ------------------------------------------------------------

def term_frequency(word, doc_words):
    """
    TF = počet výskytů slova / celkový počet slov v dokumentu.
    Normalizuje výskyt slova délkou dokumentu.
    """
    count = doc_words.count(word)
    return count / len(doc_words) if doc_words else 0


def inverse_document_frequency(word, all_docs):
    """
    IDF = log( počet dokumentů / počet dokumentů obsahujících slovo ).
    Penalizuje slova, která se vyskytují ve všech dokumentech.
    """
    docs_with_word = sum(1 for doc in all_docs if word in doc)
    if docs_with_word == 0:
        return 0
    return math.log(len(all_docs) / docs_with_word)


def tfidf_vector(sentence, vocabulary, all_docs):
    """
    Vypočte TF-IDF vektor pro jednu větu.
    Kombinuje TF (lokální důležitost) a IDF (globální vzácnost).
    """
    doc_words = sentence.lower().split()
    idf_cache = {word: inverse_document_frequency(word, all_docs) for word in vocabulary}
    vector = []
    for word in vocabulary:
        tf  = term_frequency(word, doc_words)
        idf = idf_cache[word]
        vector.append(round(tf * idf, 4))
    return vector


# Příprava: každý dokument jako seznam slov
all_docs_words = [s.lower().split() for s in corpus]


# ------------------------------------------------------------
# Výpis TF-IDF vektorů
# ------------------------------------------------------------

print("TF-IDF vektory (zaokrouhleno na 4 desetinná místa):")
print(f"\n  {'Věta':<35} | Vektor")
print("  " + "-" * 90)

tfidf_vectors = []
for sentence in corpus:
    vec = tfidf_vector(sentence, vocabulary, all_docs_words)
    tfidf_vectors.append(vec)
    print(f"  {sentence:<35} | {vec}")


# ------------------------------------------------------------
# Ukázka: Proč TF-IDF upřednostňuje specifická slova?
# ------------------------------------------------------------

print("\n-- Detailní pohled na větu č. 1: 'I love cats' --\n")

doc = corpus[0].lower().split()
print(f"  {'Slovo':<12} | {'TF':>8} | {'IDF':>8} | {'TF-IDF':>10}")
print("  " + "-" * 45)
for word in vocabulary:
    tf  = term_frequency(word, doc)
    idf = inverse_document_frequency(word, all_docs_words)
    score = tf * idf
    note = " ← specifické!" if score > 0.2 else ""
    if tf > 0:  # zobraz jen slova přítomná ve větě
        print(f"  {word:<12} | {tf:>8.4f} | {idf:>8.4f} | {score:>10.4f}{note}")

print()
print("  Závěr: Slova jako 'and', 'are', 'i' mají nízké IDF (jsou běžná).")
print("         Slovo 'cats' má vysoké TF-IDF → je specifické pro tuto větu.")
print()
