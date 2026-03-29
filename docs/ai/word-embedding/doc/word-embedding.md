# Word Embedding – Jak se slova mění na čísla, která dávají smysl

> **Co se naučíš:** Jak AI „rozumí" slovům. Krok za krokem si ukážeme, jak funguje převod slov na vektory (seznamy čísel), proč to dělá smysl a jak to sám naprogramuješ v Pythonu.

---

## Krok 0 – Proč vůbec potřebujeme vektory?

Počítač nedokáže pracovat se slovy jako takovými. Nerozumí tomu, že „pes" a „kočka" jsou si nějak blízká, zatímco „pes" a „letadlo" ne. Počítač umí jen **počítat s čísly**.

> **Cíl word embeddingu:** Převést každé slovo na seznam čísel (= vektor) tak, aby **podobná slova měla podobné vektory**.

### Co je vektor?

Vektor je jednoduše **uspořádaný seznam čísel**:

```
"pes"   →  [0.85, 0.12, 0.61, -0.44]
"kočka" →  [0.79, 0.18, 0.55, -0.38]   ← podobné čísla jako "pes"!
"auto"  →  [-0.21, 0.90, -0.33, 0.71]  ← úplně jiná čísla
```

Tato čísla si nevymýšlíme ručně – AI se je sama **naučí** z obrovského množství textu.

---

## Krok 1 – Jak AI „čte" texty?

Představ si, že AI dostane miliony vět v angličtině. Pozoruje, **která slova se vyskytují vedle sebe**. Tohle je klíčová myšlenka:

> **„Řekni mi, s kým se stýkáš, a já ti řeknu, kdo jsi."**

Jinými slovy: slova, která se opakovaně vyskytují ve stejném okolí (kontextu), budou mít podobný embedding.

### Příklad kontextu

Vezmi tyto věty:
```
"I petted the dog in the park."
"I petted the cat in the garden."
"She drove the car on the highway."
```

Slova `dog` a `cat` se oba vyskytují za slovem `the` a před slovem `in`. Mají tedy **podobný kontext** → AI je automaticky přiřadí blízko sebe ve vektorovém prostoru.

`car` se vyskytuje v úplně jiném kontextu → dostane odlišný vektor.

---

## Krok 2 – Příprava dat: Vytvoření slovníku a číselného kódování

Než začneme trénovat, musíme každé slovo zakódovat jako číslo (index). Jde o základní krok – počítač potřebuje pracovat s indexy.

```python
# Naše trénovací věty (corpus)
corpus = [
    "I love cats",
    "I love dogs",
    "cats and dogs are pets",
    "I drive a car",
    "cars and buses are vehicles",
]

# Krok 1: Rozděl věty na slova a vytvoř slovník
all_words = []
for sentence in corpus:
    for word in sentence.lower().split():
        if word not in all_words:
            all_words.append(word)

print("Slovník:", all_words)
# ['i', 'love', 'cats', 'dogs', 'and', 'are', 'pets', 'drive', 'a', 'car', 'cars', 'buses', 'vehicles']

# Krok 2: Přiřaď každému slovu číslo (index)
word_to_index = {word: idx for idx, word in enumerate(all_words)}
index_to_word = {idx: word for word, idx in word_to_index.items()}

print("\nSlovník s indexy:")
for word, idx in word_to_index.items():
    print(f"  '{word}' → {idx}")
```

**Výstup:**
```
Slovník s indexy:
  'i'        → 0
  'love'     → 1
  'cats'     → 2
  'dogs'     → 3
  'and'      → 4
  'are'      → 5
  'pets'     → 6
  'drive'    → 7
  'a'        → 8
  'car'      → 9
  'cars'     → 10
  'buses'    → 11
  'vehicles' → 12
```

---

## Krok 3 – Jak funguje trénování? Metoda „Skip-gram"

Nejznámější algoritmus pro word embedding se jmenuje **Word2Vec** (od Googlu, 2013). Existují dvě varianty; my si ukážeme jednodušší konceptuálně – **Skip-gram**.

### Princip Skip-gramu

Vezmeme jedno sloveso (**centrum**) a snažíme se předpovědět jeho **okolní slova (kontext)**.

Například pro větu `"I love cats"` s oknem velikosti 1:

```
Centrum: "love"  →  Predict: "I", "cats"
Centrum: "I"     →  Predict: "love"
Centrum: "cats"  →  Predict: "love"
```

AI se trénuje tak, aby tyhle předpovědi dělala co nejlépe. V průběhu trénování se upravují čísla v embeddingové matici tak, aby slova se stejným kontextem dostávala podobné vektory.

### Generování trénovacích párů v Pythonu

```python
def generate_skipgram_pairs(corpus, window_size=1):
    """
    Projde každou větu a vytvoří dvojice (centrum, kontext).
    Vrátí seznam párů (center_index, context_index).
    """
    pairs = []

    for sentence in corpus:
        words = sentence.lower().split()
        indices = [word_to_index[w] for w in words]  # převeď slova na indexy

        for center_pos, center_idx in enumerate(indices):
            # Okno kolem centrum slova
            left  = max(0, center_pos - window_size)
            right = min(len(indices), center_pos + window_size + 1)

            for context_pos in range(left, right):
                if context_pos != center_pos:       # přeskoč samotné centrum
                    context_idx = indices[context_pos]
                    pairs.append((center_idx, context_idx))

    return pairs


pairs = generate_skipgram_pairs(corpus, window_size=1)

print("Ukázkové trénovací páry (centrum → kontext):")
for center, context in pairs[:10]:
    print(f"  '{index_to_word[center]}' → '{index_to_word[context]}'")
```

**Výstup:**
```
Ukázkové trénovací páry (centrum → kontext):
  'i'    → 'love'
  'love' → 'i'
  'love' → 'cats'
  'cats' → 'love'
  'i'    → 'love'
  'love' → 'i'
  'love' → 'dogs'
  'dogs' → 'love'
  ...
```

---

## Krok 4 – Embeddingová matice: Kde se uchovávají vektory?

Vektory všech slov jsou uloženy v jedné velké tabulce, které se říká **embeddingová matice** (embedding matrix).

```
Pokud máme:
- 13 slov ve slovníku
- embedding_size = 3 (každé slovo reprezentujeme 3 čísly)

Embeddingová matice má rozměry: 13 × 3

       dim0   dim1   dim2
i     [ 0.21,  0.44, -0.12]
love  [ 0.58, -0.31,  0.77]
cats  [ 0.83,  0.15,  0.62]
dogs  [ 0.79,  0.19,  0.58]
...
```

Na začátku trénování jsou čísla **náhodná**. Trénováním se postupně opravují tak, aby předpovědi (centrum → kontext) byly co nejpřesnější.

```python
import random

VOCAB_SIZE     = len(word_to_index)   # počet slov
EMBEDDING_SIZE = 3                    # délka vektoru každého slova

# Inicializuj matici náhodnými malými čísly
random.seed(42)
embedding_matrix = [
    [random.uniform(-0.5, 0.5) for _ in range(EMBEDDING_SIZE)]
    for _ in range(VOCAB_SIZE)
]

# Jak získat vektor pro slovo "cats"?
word = "cats"
idx  = word_to_index[word]
vec  = embedding_matrix[idx]
print(f"Vektor pro '{word}': {[round(x, 4) for x in vec]}")
# Například: [0.0742, -0.2312, 0.4891]  ← zatím náhodné, po trénování bude smysluplné
```

---

## Krok 5 – Trénování v praxi: Hotová knihovna Gensim

Implementovat Word2Vec od nuly by zabralo stovky řádků. V praxi používáme hotovou knihovnu **Gensim**, která vše udělá za nás.

```python
# Instalace (jednou v terminálu):
# pip install gensim

from gensim.models import Word2Vec

# Příprava dat: seznam seznamů slov
sentences = [sentence.lower().split() for sentence in corpus]
print("Trénovací věty:", sentences)

# Trénování modelu
model = Word2Vec(
    sentences,
    vector_size = 10,    # délka embeddingového vektoru
    window      = 2,     # velikost kontextového okna (±2 slova)
    min_count   = 1,     # zahrň i slova s výskytem >= 1
    epochs      = 500,   # počet průchodů přes data
    seed        = 42,    # pro opakovatelné výsledky
)

# Získání vektoru pro slovo "cats"
print("\nVektor pro 'cats':")
print(model.wv["cats"])

# Nejpodobnější slova k "cats"
print("\nNejpodobnější slova k 'cats':")
similar = model.wv.most_similar("cats", topn=5)
for word, score in similar:
    print(f"  {word:<12} podobnost: {score:.4f}")
```

**Ukázkový výstup:**
```
Nejpodobnější slova k 'cats':
  dogs         podobnost: 0.9743
  pets         podobnost: 0.8821
  love         podobnost: 0.7512
  i            podobnost: 0.6230
  vehicles     podobnost: 0.1041
```

> `cats` a `dogs` mají podobnost téměř 1.0 – správně! Oba jsou mazlíčci.
> `vehicles` má podobnost jen 0.10 – je v jiném kontextu.

---

## Krok 6 – Vizualizace: Jak embeddingy vypadají?

Reálné vektory mají desítky nebo stovky dimenzí. Nelze je nakreslit přímo. Používáme proto metodu **PCA** nebo **t-SNE**, která dimenze zredukuje na 2 (pro graf).

```python
# pip install matplotlib scikit-learn

import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

# Získej vektory pro všechna slova
words   = list(model.wv.index_to_key)
vectors = [model.wv[word] for word in words]

# Zredukuj na 2 dimenze pomocí PCA
pca    = PCA(n_components=2)
coords = pca.fit_transform(vectors)

# Nakresli graf
plt.figure(figsize=(10, 7))
plt.scatter(coords[:, 0], coords[:, 1], color="steelblue", s=100)

for i, word in enumerate(words):
    plt.annotate(
        word,
        xy     = (coords[i, 0], coords[i, 1]),
        xytext = (5, 5),
        textcoords = "offset points",
        fontsize   = 12,
    )

plt.title("Vizualizace word embeddingů (PCA)")
plt.xlabel("Dimenze 1")
plt.ylabel("Dimenze 2")
plt.grid(True, linestyle="--", alpha=0.5)
plt.tight_layout()
plt.savefig("word_embeddings.png", dpi=150)
plt.show()
```

Ve výsledném grafu uvidíš, že:
- `cats`, `dogs`, `pets` budou **blízko u sebe**
- `cars`, `buses`, `vehicles` budou **blízko u sebe**
- Obě skupiny budou **daleko od sebe navzájem**

---

## Krok 7 – Magické výpočty s vektory

Když jsou slova jako vektory, lze s nimi dělat **matematické operace** a výsledky dávají smysl!

### Analogie: A je k B jako C je k ?

```
king - man + woman = ?
```

Vezmeme vektor pro „king", odečteme „man" a přičteme „woman". Výsledný vektor bude nejblíže k „queen"!

```python
# Pro náš malý corpus to nebude fungovat dobře (málo dat),
# ale s velkým modelem (Word2Vec od Googlu) to funguje skvěle.

# Příklad s větším modelem:
# result = model.wv.most_similar(
#     positive=["king", "woman"],
#     negative=["man"]
# )
# print(result)  →  [("queen", 0.85), ...]

# S naším malým corpusem zkusíme:
result = model.wv.most_similar(
    positive=["cats", "vehicles"],
    negative=["pets"],
    topn=3
)
print("cats - pets + vehicles ≈ ?")
for word, score in result:
    print(f"  {word}: {score:.4f}")
```

---

## Shrnutí – celý postup na jednom místě

```
1. Shromáždíme velké množství textu
          ↓
2. Rozdělíme texty na slova, sestavíme slovník
          ↓
3. Každé slovo dostane číslo (index)
          ↓
4. Vytvoříme trénovací páry: (centrum, kontext)
          ↓
5. Inicializujeme embeddingovou matici náhodně
          ↓
6. Trénováním (stovky průchodů) upravujeme matici tak,
   aby centrum co nejlépe předpovídalo kontext
          ↓
7. Výsledek: každé slovo má vektor,
   kde PODOBNÁ SLOVA mají PODOBNÉ VEKTORY
```

---

## Slovníček pojmů

| Pojem | Vysvětlení |
|-------|-----------|
| **Vektor** | Seznam čísel, např. `[0.2, -0.4, 0.8]` |
| **Embedding** | Vektor reprezentující slovo v N-dimenzionálním prostoru |
| **Corpus** | Trénovací texty (= sada vět nebo dokumentů) |
| **Slovník (vocabulary)** | Množina všech unikátních slov v corpusu |
| **Kontextové okno (window)** | Kolik slov vlevo a vpravo od centra považujeme za kontext |
| **Word2Vec** | Algoritmus od Googlu (2013) pro trénování embeddingů |
| **Skip-gram** | Varianta Word2Vec: centrum → předpovídá kontext |
| **CBOW** | Druhá varianta Word2Vec: kontext → předpovídá centrum |
| **PCA / t-SNE** | Metody pro zmenšení dimenzionality (pro vizualizaci) |
| **Embeddingová matice** | Tabulka, kde každý řádek je vektor jednoho slova |


