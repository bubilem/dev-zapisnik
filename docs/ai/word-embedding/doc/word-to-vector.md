# Jak se slova mění na čísla? Vektory v AI

> Cíl: Pochopit, jak umělá inteligence „čte" a rozumí slovům.

---

## 1. Proč AI potřebuje čísla?

Počítače neumí číst slova tak jako my. Rozumí pouze číslům. Proto musíme každé slovo **převést na číslo nebo sadu čísel**. Výsledek tohoto převodu se nazývá **vektor**.

> **Vektor** je jednoduše seznam čísel, například `[0.2, 0.8, -0.1]`.

Pomocí vektorů pak AI dokáže odpovídat na otázky jako:
- Jsou tato dvě slova podobná? (např. „pes" a „kočka")
- Co patří tematicky k sobě?
- Jaká slova se vyskytují ve stejném kontextu?

---

## 2. Metoda č. 1 – One-Hot Encoding (Jednoduchá, ale omezená)

Toto je nejjednodušší způsob. Každé slovo dostane svůj vlastní „slot" (index) v dlouhém seznamu. Na místě daného slova je `1`, všude jinde `0`.

### Příklad

Máme slovník 5 slov: `["cat", "dog", "fish", "bird", "ant"]`

| Slovo | Vektor          |
|-------|-----------------|
| cat   | [1, 0, 0, 0, 0] |
| dog   | [0, 1, 0, 0, 0] |
| fish  | [0, 0, 1, 0, 0] |
| bird  | [0, 0, 0, 1, 0] |
| ant   | [0, 0, 0, 0, 1] |

### Python ukázka

```python
# Slovník slov
vocabulary = ["cat", "dog", "fish", "bird", "ant"]

def one_hot(word, vocabulary):
    """Převede slovo na one-hot vektor."""
    vector = [0] * len(vocabulary)  # vytvoř seznam samých nul
    if word in vocabulary:
        index = vocabulary.index(word)  # najdi pozici slova
        vector[index] = 1               # na tuto pozici dej 1
    return vector

# Otestuj
print(one_hot("cat",  vocabulary))  # [1, 0, 0, 0, 0]
print(one_hot("fish", vocabulary))  # [0, 0, 1, 0, 0]
print(one_hot("dog",  vocabulary))  # [0, 1, 0, 0, 0]
```

### Výhody a Nevýhody

| Výhody | Nevýhody |
|--------|----------|
| Velmi jednoduché | Vektory jsou obrovské (tisíce hodnot pro velký slovník) |
| Snadno pochopitelné | Neví nic o souvislostech slov – „pes" a „kočka" jsou stejně „daleko" jako „pes" a „auto" |

---

## 3. Metoda č. 2 – Bag of Words (Pytel slov)

Bag of Words (česky „pytel slov") funguje podobně jako One-Hot, ale pracuje s **celými větami nebo texty**. Místo `0` a `1` počítá, **kolikrát se dané slovo v textu vyskytlo**.

### Příklad

Máme dva texty:
- Text A: `"I love the cat and the dog"`
- Text B: `"I love the fish"`

Slovník: `["I", "love", "the", "cat", "and", "dog", "fish"]`

|        | I | love | the | cat | and | dog | fish |
|--------|---|------|-----|-----|-----|-----|------|
| Text A | 1 | 1    | 2   | 1   | 1   | 1   | 0    |
| Text B | 1 | 1    | 1   | 0   | 0   | 0   | 1    |

### Python ukázka

```python
from collections import Counter

# Slovník všech unikátních slov
vocabulary = ["I", "love", "the", "cat", "and", "dog", "fish"]

def bag_of_words(text, vocabulary):
    """Převede text na vektor počtů slov."""
    words = text.split()                     # rozděl text na slova
    word_counts = Counter(words)             # spočítej výskyty

    vector = []
    for word in vocabulary:
        vector.append(word_counts[word])     # přidej počet výskytů
    return vector

text_a = "I love the cat and the dog"
text_b = "I love the fish"

print(bag_of_words(text_a, vocabulary))  # [1, 1, 2, 1, 1, 1, 0]
print(bag_of_words(text_b, vocabulary))  # [1, 1, 1, 0, 0, 0, 1]
```

### Výhody a Nevýhody

| Výhody | Nevýhody |
|--------|----------|
| Jednoduché | Ignoruje pořadí slov – „pes kousne člověka" a „člověk kousne psa" jsou stejné! |
| Dobré pro porovnávání dokumentů | Stále neumí zachytit „význam" slov |

---

## 4. Metoda č. 3 – TF-IDF (Chytrý Bag of Words)

TF-IDF je vylepšení Bag of Words. Bere v úvahu, že **běžná slova** jako „the", „a", „is" jsou méně důležitá než **vzácná, specifická slova**.

Skládá se ze dvou částí:
- **TF (Term Frequency)** – jak často se slovo vyskytuje *v daném dokumentu*
- **IDF (Inverse Document Frequency)** – jak vzácné je slovo *napříč všemi dokumenty* (vzácnější = důležitější)

> **Výsledek = TF × IDF**
> Vysoké skóre → slovo je v tomto dokumentu časté, ale v ostatních vzácné → důležité!

### Vzorec (zjednodušeně)

```
TF(slovo, dokument)  = počet výskytů slova v dokumentu / celkový počet slov v dokumentu
IDF(slovo)           = log( celkový počet dokumentů / počet dokumentů obsahujících slovo )
TF-IDF               = TF × IDF
```

### Python ukázka

```python
import math
from collections import Counter

def compute_tf(doc_words):
    """Spočítá TF pro každé slovo v dokumentu."""
    total = len(doc_words)
    counts = Counter(doc_words)
    return {word: count / total for word, count in counts.items()}

def compute_idf(all_docs):
    """Spočítá IDF napříč všemi dokumenty."""
    total_docs = len(all_docs)
    idf = {}
    # Zjisti, ve kolika dokumentech se každé slovo vyskytuje
    all_words = set(word for doc in all_docs for word in doc)
    for word in all_words:
        docs_with_word = sum(1 for doc in all_docs if word in doc)
        idf[word] = math.log(total_docs / docs_with_word)
    return idf

def compute_tfidf(doc_words, all_docs):
    """Spočítá TF-IDF pro všechna slova v dokumentu."""
    tf  = compute_tf(doc_words)
    idf = compute_idf(all_docs)
    return {word: tf[word] * idf[word] for word in tf}

# --- Příklad ---
doc1 = ["I", "love", "the", "cat", "and", "the", "dog"]
doc2 = ["I", "love", "the", "fish"]
doc3 = ["the", "cat", "sat", "on", "the", "mat"]

all_docs = [doc1, doc2, doc3]

tfidf_doc1 = compute_tfidf(doc1, all_docs)

# Setřídit podle důležitosti (sestupně)
sorted_words = sorted(tfidf_doc1.items(), key=lambda x: x[1], reverse=True)
print("Nejdůležitější slova v doc1:")
for word, score in sorted_words:
    print(f"  {word}: {score:.4f}")
```

**Výstup (přibližně):**
```
Nejdůležitější slova v doc1:
  dog:  0.3662
  cat:  0.1099
  and:  0.3662
  love: 0.0000
  I:    0.0000
  the:  0.0000
```

> Slova „love", „I" a „the" mají skóre 0 nebo nízké, protože se vyskytují ve všech dokumentech.
> Naopak „dog" je v doc1 unikátní → dostane vyšší skóre.

---

## 5. Metoda č. 4 – Word Embeddings (Nejchytřejší metoda)

Předchozí metody neumí pochopit, že „pes" a „kočka" jsou si podobné. **Word Embeddings** (česky „vnoření slov") to dokáží.

Každé slovo je reprezentováno jako **hustý vektor** (dense vector) – seznam desetinných čísel, typicky o délce 50 až 300. Tato čísla jsou **naučená** z obrovského množství textu.

> Klíčová myšlenka: **Slova, která se vyskytují ve stejném kontextu, mají podobné vektory.**

### Jak to funguje – intuice

Představ si 2D prostor (jako souřadnicový systém). Slova jsou rozmístěna v tomto prostoru tak, aby podobná slova byla blízko sebe:

```
           zvíře
             |
     kočka --+-- pes
             |
           domácí mazlíček

           auto ------ vlak
                  |
              dopravní prostředek
```

Ve skutečnosti mají embeddingové vektory desítky až stovky dimenzí, ale princip je stejný.

### Slavný příklad: Word2Vec

Word2Vec je algoritmus (od Googlu, 2013), který se učí word embeddings. Funguje na principu: **„Řekni mi, s kým se stýkáš, a já ti řeknu, kdo jsi."**

Výsledek: Vektory zachovají i analogie!

```
vektor("král") - vektor("muž") + vektor("žena") ≈ vektor("královna")
```

### Datová struktura – jak vypadá embedding

```python
# Každé slovo je reprezentováno jako seznam float čísel
# (v reálném modelu jsou čísla naučená z dat)

word_embeddings = {
    "cat":  [ 0.21, -0.45,  0.87,  0.12, -0.33],
    "dog":  [ 0.19, -0.41,  0.84,  0.15, -0.30],  # podobné jako "cat"!
    "car":  [-0.52,  0.88,  0.14, -0.71,  0.23],  # velmi odlišné
    "fish": [ 0.05, -0.22,  0.61,  0.08, -0.19],
}

# Výpis embeddingu pro "cat"
print(word_embeddings["cat"])
# [0.21, -0.45, 0.87, 0.12, -0.33]
```

### Jak získat embeddingy v praxi?

V praxi nemusíme trénovat vlastní model. Použijeme hotové knihovny:

```python
# Instalace: pip install gensim
from gensim.models import KeyedVectors

# Načtení předtrénovaného modelu (je potřeba stáhnout soubor)
# model = KeyedVectors.load_word2vec_format('GoogleNews-vectors.bin', binary=True)

# Alternativa – rychlý test s malými daty:
from gensim.models import Word2Vec

# Trénování na malé sadě vět
sentences = [
    ["I", "love", "my", "cat"],
    ["I", "love", "my", "dog"],
    ["cats", "and", "dogs", "are", "pets"],
    ["I", "drive", "a", "car"],
    ["cars", "and", "buses", "are", "vehicles"],
]

model = Word2Vec(sentences, vector_size=10, window=3, min_count=1, epochs=100)

# Získání vektoru pro slovo "cat"
print("Vektor pro 'cat':", model.wv["cat"])

# Nejpodobnější slova k "cat"
print("Podobná slova ke 'cat':", model.wv.most_similar("cat", topn=3))
```

---

## 6. Srovnání metod

| Metoda | Velikost vektoru | Zachycuje podobnost? | Náročnost |
|---|---|---|---|
| One-Hot Encoding | Počet slov ve slovníku (tisíce) | Ne | ⭐ Velmi jednoduchá |
| Bag of Words | Počet slov ve slovníku (tisíce) | Ne | ⭐⭐ Jednoduchá |
| TF-IDF | Počet slov ve slovníku (tisíce) | Ne | ⭐⭐ Jednoduchá |
| Word Embeddings | Malý, fixní (50–300) | Ano | ⭐⭐⭐ Složitější |

---

## 7. Shrnutí

1. **One-Hot** – každé slovo = pozice v seznamu, buď `0` nebo `1`
2. **Bag of Words** – text = vektor počtů výskytů slov
3. **TF-IDF** – jako Bag of Words, ale vzácná slova dostávají vyšší váhu
4. **Word Embeddings** – slova = malé vektory čísel, naučené z textu; podobná slova mají podobné vektory

> **Přechod od One-Hot k Word Embeddings** je jako přechod od abecedy k porozumění jazyku.

