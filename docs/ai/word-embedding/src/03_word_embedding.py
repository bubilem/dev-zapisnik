# =============================================================================
#  AI FUNDAMENTALS – Příklad č. 3: Word Embedding s Gensim (Word2Vec)
#  Nauč se, jak AI sama zjistí, která slova jsou si podobná.
# =============================================================================
#
#  Co potřebuješ nainstalovat (jednou):
#    pip install gensim matplotlib scikit-learn
#
#  Spuštění:
#    python 03_word_embedding.py
# =============================================================================

# Naimportuj potřebné knihovny
from gensim.models import Word2Vec   # Word2Vec algoritmus
import matplotlib.pyplot as plt      # Kreslení grafů
from sklearn.decomposition import PCA  # Redukce dimenzí pro graf


# =====================================================================
# KROK 1: Příprava trénovacích dat
# =====================================================================
#
#  Word2Vec potřebuje jako vstup seznam vět,
#  kde každá věta je seznam slov (ne jeden řetězec).
# =====================================================================

print("=" * 55)
print("  WORD EMBEDDING – Word2Vec")
print("=" * 55)

# Trénovací věty – čím více dat, tím lepší výsledky!
# Pro ukázku používáme malý corpus (v praxi miliony vět).
sentences = [
    # Zvířata – domácí mazlíčci
    ["I", "love", "my", "cat"],
    ["I", "love", "my", "dog"],
    ["she", "has", "a", "cat"],
    ["he", "has", "a", "dog"],
    ["cats", "and", "dogs", "are", "popular", "pets"],
    ["my", "cat", "and", "dog", "are", "friends"],
    ["the", "cat", "sat", "on", "the", "mat"],
    ["the", "dog", "ran", "in", "the", "park"],
    ["pets", "like", "cats", "and", "dogs", "need", "care"],

    # Dopravní prostředky
    ["I", "drive", "a", "car"],
    ["she", "drives", "a", "bus"],
    ["he", "rides", "a", "bike"],
    ["cars", "and", "buses", "are", "vehicles"],
    ["bikes", "and", "cars", "are", "common", "vehicles"],
    ["the", "car", "is", "fast"],
    ["buses", "carry", "many", "people"],
    ["cars", "need", "fuel", "to", "drive"],
]

print(f"\nPočet trénovacích vět: {len(sentences)}")
print("Ukázkové věty:")
for s in sentences[:3]:
    print(f"  {s}")
print("  ...")


# =====================================================================
# KROK 2: Trénování Word2Vec modelu
# =====================================================================
#
#  Důležité parametry:
#    vector_size – délka výsledného vektoru (10 = malý, realně 100-300)
#    window      – kolik slov vlevo a vpravo tvoří "kontext"
#    min_count   – minimální počet výskytů slova (ignoruj vzácná)
#    epochs      – kolikrát projde model přes celá data
# =====================================================================

print("\n-- Trénuji model... --")

model = Word2Vec(
    sentences,
    vector_size = 10,    # délka vektoru každého slova
    window      = 3,     # kontextové okno ±3 slova
    min_count   = 1,     # zahrň i slova s jen 1 výskytem
    epochs      = 500,   # 500 průchodů = lépe se naučí
    seed        = 42,    # fixní náhoda → opakovatelné výsledky
    workers     = 1,     # 1 vlákno (pro opakovatelnost)
)

print("  ✅ Hotovo!\n")

# Kolik slov se model naučil?
vocab = list(model.wv.index_to_key)
print(f"Naučená slova ({len(vocab)}): {vocab}")


# =====================================================================
# KROK 3: Zjisti vektor pro konkrétní slovo
# =====================================================================

print("\n" + "=" * 55)
print("  KROK 3: Vektory slov")
print("=" * 55)

for word in ["cat", "dog", "car", "bus"]:
    vec = model.wv[word]
    # Zaokrouhlíme, aby byl výstup čitelný
    vec_rounded = [round(v, 3) for v in vec]
    print(f"\n  Vektor '{word}':")
    print(f"    {vec_rounded}")

print("\n  Všimni si: 'cat' a 'dog' mají podobné hodnoty,")
print("  'car' a 'bus' mají podobné hodnoty mezi sebou,")
print("  ale 'cat' a 'car' mají hodnoty velmi odlišné.")


# =====================================================================
# KROK 4: Najdi nejpodobnější slova
# =====================================================================

print("\n" + "=" * 55)
print("  KROK 4: Nejpodobnější slova")
print("=" * 55)

test_words = ["cat", "car", "pets"]

for word in test_words:
    print(f"\n  Slova nejpodobnější k '{word}':")
    similar = model.wv.most_similar(word, topn=4)
    for similar_word, score in similar:
        bar = "█" * int(score * 20)   # vizuální ukazatel podobnosti
        print(f"    {similar_word:<12} {score:.4f}  {bar}")


# =====================================================================
# KROK 5: Vektorová aritmetika – analogie
# =====================================================================

print("\n" + "=" * 55)
print("  KROK 5: Vektorová matematika (analogie)")
print("=" * 55)
print("""
  Pokud AI pochopila vztahy mezi slovy,
  mělo by platit:
    'dogs' - 'dog' + 'cat' ≈ 'cats'

  Nebo obecněji: plurál  - jednotné + jiné ≈ plurál jiného
""")

try:
    result = model.wv.most_similar(
        positive=["dogs", "cat"],   # přičti tyto vektory
        negative=["dog"],            # odečti tento vektor
        topn=3
    )
    print("  dogs - dog + cat ≈ ?")
    for word, score in result:
        print(f"    {word:<12} {score:.4f}")
except KeyError as e:
    print(f"  ⚠️  Slovo {e} není ve slovníku (malý corpus).")


# =====================================================================
# KROK 6: Vizualizace embeddingů pomocí PCA
# =====================================================================
#
#  Reálné vektory mají 10 dimenzí (nebo 300).
#  Nelze je nakreslit přímo – použijeme PCA,
#  která zredukuje dimenze na 2 (pro osy X a Y).
# =====================================================================

print("\n" + "=" * 55)
print("  KROK 6: Vizualizace (uložení do word2vec_plot.png)")
print("=" * 55)

# Zajímavá slova pro vizualizaci
interesting = ["cat", "cats", "dog", "dogs", "pets",
               "car", "cars", "bus", "buses", "vehicles"]

# Filtruj jen ta, která model zná
known = [w for w in interesting if w in model.wv]
vectors = [model.wv[w] for w in known]

# PCA: zredukuj 10D → 2D
pca = PCA(n_components=2)
coords = pca.fit_transform(vectors)

# Skupiny pro barevné odlišení
animal_words  = {"cat", "cats", "dog", "dogs", "pets"}
vehicle_words = {"car", "cars", "bus", "buses", "vehicles"}

# Nakresli graf
fig, ax = plt.subplots(figsize=(10, 7))

for i, word in enumerate(known):
    x, y = coords[i]

    # Barva podle kategorie
    if word in animal_words:
        color = "#2196F3"   # modrá = zvířata
        marker = "o"
    else:
        color = "#FF5722"   # červená = vozidla
        marker = "s"

    ax.scatter(x, y, color=color, s=150, marker=marker, zorder=3)
    ax.annotate(
        word,
        xy     = (x, y),
        xytext = (8, 5),
        textcoords = "offset points",
        fontsize   = 13,
        fontweight = "bold",
        color      = color,
    )

# Legenda a popis
ax.set_title("Word Embedding – vizualizace Word2Vec (PCA)", fontsize=14)
ax.set_xlabel("Dimenze 1 (PCA)", fontsize=11)
ax.set_ylabel("Dimenze 2 (PCA)", fontsize=11)
ax.grid(True, linestyle="--", alpha=0.4)
ax.axhline(0, color="gray", linewidth=0.5)
ax.axvline(0, color="gray", linewidth=0.5)

# Manuální legenda
from matplotlib.lines import Line2D
legend_elements = [
    Line2D([0], [0], marker="o", color="w", markerfacecolor="#2196F3",
           markersize=12, label="Zvířata / mazlíčci"),
    Line2D([0], [0], marker="s", color="w", markerfacecolor="#FF5722",
           markersize=12, label="Dopravní prostředky"),
]
ax.legend(handles=legend_elements, fontsize=11, loc="best")

plt.tight_layout()

output_file = "word2vec_plot.png"
plt.savefig(output_file, dpi=150)
print(f"\n  ✅ Graf uložen do: {output_file}")
print("     Otevři soubor a podívej se, jak jsou slova seskupena!\n")

plt.show()
