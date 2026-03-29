# Převedení textu na čísla (vektorizace)

> Výukový materiál pro pochopení toho, jak umělá inteligence pracuje s textem.  
> Vše je napsáno jednoduše – zvládne to každý, kdo umí trochu Python.

---

## Jak začít

### 1. Klonování (nebo stažení) repozitáře

```bash
git clone https://github.com/bubilem/dev-zapisnik.git
cd dev-zapisnik/docs/ai/word-embeding
```

### 2. Instalace závislostí

Pro příklady **01**, **02** a **04** nejsou potřeba žádné knihovny (čistý Python 3).

Pro příklad **03** (Word2Vec + vizualizace) je potřeba nainstalovat:

```bash
pip install gensim matplotlib scikit-learn
```

### 3. Spuštění příkladů

```bash
# Přejdi do složky s příklady
cd src

# Spusť postupně:
python 01_one_hot_encoding.py
python 02_bag_of_words_tfidf.py
python 03_word_embedding.py       # vyžaduje: gensim, matplotlib, scikit-learn
python 04_cosine_similarity.py
```

---

## Doporučené pořadí studia

| Krok | Soubor | Co se naučíš |
|------|--------|--------------|
| 1 | [word-to-vector.md](doc/word-to-vector.md) | Proč AI potřebuje čísla, základní metody převodu |
| 2 | [01_one_hot_encoding.py](src/01_one_hot_encoding.py) | One-Hot Encoding v praxi |
| 3 | [02_bag_of_words_tfidf.py](src/02_bag_of_words_tfidf.py) | Bag of Words a TF-IDF v praxi |
| 4 | [word-embedding.md](doc/word-embedding.md) | Jak funguje Word2Vec (teorie) |
| 5 | [03_word_embedding.py](src/03_word_embedding.py) | Word2Vec trénování a vizualizace |
| 6 | [cosine-similarity.md](doc/cosine-similarity.md) | Jak měřit podobnost vektorů (teorie) |
| 7 | [04_cosine_similarity.py](src/04_cosine_similarity.py) | Kosinova podobnost + mini vyhledávač |

---

## Přehled metod

| Metoda | Co dělá | Zachycuje smysl slov? |
|--------|---------|----------------------|
| **One-Hot Encoding** | Každé slovo = jeden 1 v dlouhém seznamu nul | Ne |
| **Bag of Words** | Text = počty výskytů slov | Ne |
| **TF-IDF** | Jako BoW, ale vzácná slova mají vyšší váhu | Ne |
| **Word Embedding** | Slovo = krátký hustý vektor naučený z dat | Ano |
| **Kosinova podobnost** | Měří úhel mezi dvěma vektory (0 = různé, 1 = stejné) | — |

---

## Použité technologie

- **Python 3.x** – základní příklady (bez instalace)
- **[Gensim](https://radimrehurek.com/gensim/)** – Word2Vec trénování
- **[Matplotlib](https://matplotlib.org/)** – vizualizace grafů
- **[scikit-learn](https://scikit-learn.org/)** – PCA redukce dimenzí

---

## Tipy pro učitele

- Příklady **01** a **02** lze spustit i v online Python interpretu (např. [repl.it](https://replit.com/)) bez instalace.
- Příklad **03** vytvoří soubor `word2vec_plot.png` – studenti ho mohou porovnat a diskutovat o tom, proč jsou slova rozmístěna tak, jak jsou.
- Doporučujeme začít s malým corpusem (jako v ukázkách) a pak experimentovat s přidáváním vlastních vět.
