# Další datové modely

Relační model dat (RMD) je sice nejrozšířenější, ale zdaleka ne jediný způsob, jak data organizovat. S růstem internetu, sociálních sítí a potřebou zpracovávat obrovské objemy různorodých dat vznikla celá řada alternativních přístupů, souhrnně označovaných jako **NoSQL** (*Not Only SQL*).

Každý model se hodí pro jiný typ problému – klíč je vybrat správný nástroj na správnou práci.

---

## 1. Objektový model (OODBMS)

### Princip

Data jsou ukládána jako **objekty** přesně tak, jak jsou definovány v objektově orientovaném programovacím jazyce. Objekt má atributy (data) i metody (chování). Objekty mohou být v relaci dědičnosti.

```
Třída: Osoba
  ├── jmeno: String
  ├── vek: Int
  └── metoda: pozdrav() → "Ahoj, jsem Jan"

Třída: Zamestnanec extends Osoba
  ├── plat: Decimal
  └── oddeleni: Oddeleni  ← přímá reference na objekt, ne FK
```

### Výhody a nevýhody

| Výhody                                          | Nevýhody                                |
|----------------------------------------------------|--------------------------------------------|
| Přirozené mapování na OOP jazyky (Java, C#, Python)| Malá rozšířenost, niche trh               |
| Podpora dědičnosti a polymorfismu                 | Absence standardizovaného dotazovacího jazyka |
| Není potřeba ORM (Object-Relational Mapping)      | Horší interoperabilita                    |

### Příklady systémů
`ObjectDB`, `db4o`, `Versant`

### V praxi dnes
Čistý OODBMS se masově neuchytil. Místo toho se používají:
- **ORM frameworky** (Hibernate, Doctrine, Entity Framework) – mapují objekty z kódu do relačních tabulek automaticky.
- **Objektově-relační DBMS (ORDBMS)** – hybridní přístup. PostgreSQL například podporuje vlastní typy, dědičnost tabulek a metody.

---

## 2. Dokumentový model

### Princip

Data jsou uložena jako **dokumenty** – typicky ve formátu **JSON** nebo **BSON** (binární JSON). Každý dokument je samostatný a může mít jiné pole (flexibilní schéma). Dokumenty jsou organizovány do **kolekcí** (obdoba tabulek v RMD).

### Srovnání s relačním modelem

| Relační model        | Dokumentový model          |
|----------------------|---------------------------|
| Tabulka              | Kolekce (Collection)      |
| Řádek (záznam)       | Dokument                  |
| Sloupec              | Pole (Field)              |
| JOIN přes FK         | Vnoření (embedding)       |
| Pevné schéma         | Flexibilní schéma         |

### Příklad dokumentu (MongoDB)

```json
{
  "_id": "a3b8d1b6",
  "jmeno": "Tomáš",
  "prijmeni": "Novák",
  "email": "novak@skola.cz",
  "adresa": {
    "ulice": "Hlavní 12",
    "mesto": "Praha",
    "psc": "11000"
  },
  "predmety": [
    { "nazev": "Matematika", "kredity": 5 },
    { "nazev": "Databaze",   "kredity": 4 }
  ],
  "je_aktivni": true
}
```

Všimněte si klíčových rozdílů oproti SQL:
- **Adresa je vnořený objekt** – v SQL by to byla separátní tabulka `adresa` s FK.
- **Předměty jsou pole objektů** – v SQL by to byl vztah M:N přes vazební tabulku.
- Každý dokument v kolekci může mít **jiná pole** – jeden student může mít `stipendium`, jiný ne.

### Dotazování (MongoDB)

```js
// Najdi všechny studenty z Prahy s více než 3 kredity z Databází
db.student.find({
  "adresa.mesto": "Praha",
  "predmety": {
    $elemMatch: { "nazev": "Databaze", "kredity": { $gt: 3 } }
  }
})
```

### Výhody a nevýhody

| Výhody                                          | Nevýhody                                       |
|----------------------------------------------------|---------------------------------------------------|
| Flexibilní schéma – snadná evoluce dat            | Duplikace dat (denormalizace)                    |
| Přirozené pro JSON API a webové aplikace          | Slabší konzistence při distribuovaném prostředí  |
| Horizontální škálovatelnost                       | Chybí JOIN (musí se řešit aplikačně nebo agregacemi) |
| Rychlé čtení – data jsou pohromadě v dokumentu   | Složitější transakce přes více kolekcí           |

### Příklady systémů
**MongoDB**, CouchDB, Amazon DynamoDB (částečně), Firestore (Google)

---

## 3. Model klíč–hodnota (Key-Value)

### Princip

Nejjednodušší NoSQL model. Data jsou uložena jako páry **klíč → hodnota**. Klíč je unikátní identifikátor, hodnota může být cokoliv – číslo, text, JSON, binární data.

```
"session:user:42"  →  "{ token: 'abc123', expires: 1710504000 }"
"produkt:cena:101" →  "299.90"
"online_uzivatele" →  42
```

### Výhody a nevýhody

| Výhody                                  | Nevýhody                                       |
|--------------------------------------------|---------------------------------------------------|
| Extrémně rychlé čtení i zápis (sub-ms)   | Nelze efektivně dotazovat podle hodnoty           |
| Jednoduchost, snadná škálovatelnost        | Bez struktury – veškerá logika je v aplikaci     |
| Ideální pro caching a session management  | Nevhodné pro komplexní data a vztahy             |

### Příklady systémů
**Redis**, Amazon DynamoDB, Memcached, etcd

### Typické použití
- **Session management** – přihlašovací tokeny, nákupní košíky
- **Caching** – mezipaměť výsledků databázových dotazů
- **Rate limiting** – počítadla požadavků
- **Leaderboardy** – žebříčky v hrách (Redis Sorted Sets)

---

## 4. Sloupcový model (Column-Family / Wide-Column)

### Princip

Data jsou organizována **po sloupcích**, nikoliv po řádcích jako v SQL. Každý řádek může mít jiné sloupce a tabulky mohou mít statisíce sloupců. Extrémně efektivní pro analytické dotazy, které čtou jen určité sloupce z miliard řádků.

### Srovnání uložení dat

**Řádkové (SQL)** – na disku jsou za sebou celé řádky:
```
[1, Novák, Praha, 1990] [2, Dvořák, Brno, 1985] [3, Svoboda, Praha, 1992]
```

**Sloupcové** – na disku jsou za sebou hodnoty jednoho sloupce:
```
[1, 2, 3]               ← id
[Novák, Dvořák, Svoboda] ← prijmeni
[Praha, Brno, Praha]    ← mesto
[1990, 1985, 1992]      ← rok_narozeni
```

Pokud chceme průměrný věk 10 miliónů uživatelů, přečteme pouze sloupec `rok_narozeni` – ostatní sloupce se vůbec nedotkneme.

### Výhody a nevýhody

| Výhody                                         | Nevýhody                                      |
|---------------------------------------------------|--------------------------------------------------|
| Vynikající výkon pro analytické (OLAP) dotazy    | Nevhodné pro časté zápisy a aktualizace řádků  |
| Velmi efektivní komprese dat v sloupci           | Složitá správa a konfigurace                   |
| Lineární škálovatelnost na tisíce uzlů           | Učební křivka – jiný myšlenkový model          |

### Příklady systémů
**Apache Cassandra**, Apache HBase, Google Bigtable, Amazon Redshift

---

## 5. Grafový model

### Princip

Data jsou reprezentována jako **uzly** (entities) a **hrany** (vztahy mezi nimi). Každý uzel i hrana mohou mít vlastní vlastnosti (atributy). Ideální pro data, kde jsou **vztahy stejně důležité jako samotná data**.

```
(Tomáš)-[:ZNA]->(Jana)
(Tomáš)-[:PRACUJE_V]->(Firma ACME)
(Jana)-[:ZNA]->(Petr)
(Petr)-[:PRACUJE_V]->(Firma ACME)
```

### Typický dotaz (Cypher – dotazovací jazyk Neo4j)

```cypher
-- Najdi všechny kolegy Tomáše (lidi, kteří znají někoho ze stejné firmy)
MATCH (tomas:Osoba {jmeno: "Tomáš"})-[:PRACUJE_V]->(firma)<-[:PRACUJE_V]-(kolega)
RETURN kolega.jmeno
```

Stejný dotaz v SQL by vyžadoval složité JOINy přes více tabulek – v grafové databázi je přirozený a rychlý.

### Výhody a nevýhody

| Výhody                                              | Nevýhody                                     |
|--------------------------------------------------------|-------------------------------------------------|
| Přirozené modelování komplexních vztahů               | Nevhodné pro jednoduchá tabulková data         |
| Velmi rychlé procházení vztahů (traversal)            | Méně rozšířené, menší komunita               |
| Intuitivní pro sociální sítě, doporučovací systémy   | Obtížná horizontální škálovatelnost           |

### Příklady systémů
**Neo4j**, Amazon Neptune, ArangoDB, JanusGraph

### Typické použití
- Sociální sítě (přátelé přátel, doporučení lidí)
- Doporučovací systémy (Netflix, Spotify)
- Detekce podvodů (fraud detection) – odhalení sítí podvodných transakcí
- Znalostní grafy (Wikipedia, Google Knowledge Graph)
- Správa závislostí (kdo závisí na čem v systému)

---

## 6. Časové řady (Time-Series)

### Princip

Specializované databáze optimalizované pro data, která jsou **sekvencí hodnot v čase** – typicky senzory, metriky, logy. Klíčem je vždy **čas** a data jsou automaticky komprimována a agregována.

```
2024-03-15 10:00:00  |  teplota=22.3, vlhkost=55, tlak=1013
2024-03-15 10:00:01  |  teplota=22.4, vlhkost=55, tlak=1013
2024-03-15 10:00:02  |  teplota=22.3, vlhkost=54, tlak=1013
```

Tradiční SQL je pro takový zápis (tisíce řádků za sekundu) neefektivní.

### Výhody a nevýhody

| Výhody                                            | Nevýhody                             |
|------------------------------------------------------|----------------------------------------|
| Extrémní výkon při zápisu a čtení časových dat     | Úzce specializované – jen pro TS data |
| Automatická komprese a agregace (downsampling)      | Nevhodné pro obecná relační data      |
| Nativní funkce pro okna, průměry, trendy            |                                        |

### Příklady systémů
**InfluxDB**, TimescaleDB (nadstavba nad PostgreSQL), Prometheus, OpenTSDB

### Typické použití
- Monitoring serverů a aplikací (CPU, RAM, latence)
- IoT senzory (teplota, tlak, průtok)
- Finanční data (burzovní kurzy – tick data)
- Logy a telemetrie

---

## 7. Big Data

### Co jsou Big Data?

Termín **Big Data** označuje datové sady, které jsou tak velké nebo komplexní, že je tradiční databázové nástroje nedokáží efektivně zpracovat. Definuje se pomocí tzv. **3V** (někdy rozšířeno na 5V):

| Dimenze      | Anglicky  | Popis                                                                 |
|:------------:|-----------|-----------------------------------------------------------------------|
| **Objem**    | Volume    | Petabajty (PB) dat – záznamy senzorů, logy, transakce globálních platforem |
| **Rychlost** | Velocity  | Data přicházejí kontinuálně v reálném čase (Twitter: 500 mil. tweetů/den) |
| **Různorodost** | Variety | Strukturovaná (tabulky), semistrukturovaná (JSON, XML) i nestrukturovaná data (videa, texty, obrázky) |
| **Věrohodnost** | Veracity | Kvalita a spolehlivost dat – data bývají neúplná, chybná, duplicitní |
| **Hodnota**  | Value     | Finální cíl – z dat extrahovat užitečné poznatky (analýzy, ML modely) |

### Architektura Big Data systémů

Big Data se nezpracovává v jedné databázi, ale v celém **ekosystému nástrojů**. Základní vzor je tzv. **Lambda architektura**:

```
Zdroje dat
(senzory, logy, API, kliknutí uživatelů)
        │
        ▼
┌───────────────────────────────────────┐
│           Ingestion vrstva            │
│   Apache Kafka · Apache Flume · Sqoop │
│   (příjem a přenos datových proudů)   │
└───────────────┬───────────────────────┘
                │
        ┌───────┴───────┐
        ▼               ▼
  Batch vrstva    Speed vrstva
  (historická     (real-time
   data)          proudy)
  Hadoop HDFS     Apache Spark
  Apache Hive     Apache Flink
        │               │
        └───────┬───────┘
                ▼
       Serving vrstva
    (výsledky dotazů)
   HBase · Cassandra · BigQuery
                │
                ▼
     Vizualizace / ML
  Tableau · Grafana · TensorFlow
```

### Klíčové technologie

#### Hadoop Ecosystem
**Apache Hadoop** je open-source framework pro distribuované ukládání a zpracování velkých dat.

*   **HDFS (Hadoop Distributed File System)** – distribuovaný souborový systém. Soubor se rozseká na bloky (typicky 128 MB) a uloží redundantně na více uzlů. Výpadek jednoho uzlu nezpůsobí ztrátu dat.
*   **MapReduce** – programovací model pro paralelní zpracování. Data se nejprve rozdělí na části (**Map** fáze), každá část se zpracuje paralelně, výsledky se sloučí (**Reduce** fáze).
*   **YARN** – správce zdrojů clusteru (kdo dostane kolik CPU a RAM).
*   **Apache Hive** – vrstva nad HDFS, která umožňuje psát SQL-like dotazy (HiveQL) místo MapReduce kódu.

```
Příklad MapReduce – počítání slov v miliardách dokumentů:

MAP:    "ahoj světe" → [("ahoj", 1), ("světe", 1)]
        "ahoj databáze" → [("ahoj", 1), ("databáze", 1)]

REDUCE: [("ahoj", [1,1])] → ("ahoj", 2)
        [("světe", [1])]  → ("světe", 1)
```

#### Apache Spark
Nástupce MapReduce – až **100× rychlejší**, protože zpracovává data **v paměti (in-memory)** místo průběžného zápisu na disk.

*   Podporuje dávkové i real-time zpracování.
*   Má API pro Python (PySpark), Scala, Java, R.
*   Obsahuje knihovny pro ML (MLlib), grafové výpočty (GraphX) a SQL (Spark SQL).

```python
# PySpark příklad – průměrný věk uživatelů ze souboru
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("analyza").getOrCreate()
df = spark.read.csv("hdfs:///data/uzivatele.csv", header=True)
df.groupBy("mesto").avg("vek").show()
```

#### Data Lake vs. Data Warehouse

| Vlastnost          | Data Lake                          | Data Warehouse                    |
|--------------------|------------------------------------|-----------------------------------|
| Data               | Surová, nestrukturovaná i strukturovaná | Vyčištěná, strukturovaná      |
| Schéma             | Schema-on-read (schéma při čtení)  | Schema-on-write (schéma při zápisu) |
| Uživatelé          | Datoví vědci, ML inženýři         | Business analytici                |
| Příklady           | AWS S3, Azure Data Lake, HDFS      | Google BigQuery, Snowflake, Redshift |
| Cena               | Levné úložiště                     | Dražší, ale optimalizované        |

> **Data Lake** je jako obrovský sklad bez polic – vhodí se všechno a teprve při čtení se data interpretují. **Data Warehouse** je jako precizně uspořádaná knihovna – vše má své místo a je připraveno k dotazování.

#### Apache Kafka – proudové zpracování dat

Kafka je **distribuovaná fronta zpráv** (message broker) – přijímá datové proudy z tisíců zdrojů a spolehlivě je předává spotřebitelům.

```
Producenti                  Kafka                    Konzumenti
(senzory, API, DB) → [Topic: objednavky] → (analytika, ML, DB zápis)
(kliknutí webu)  → [Topic: kliknutí]   → (doporučovací systém)
```

*   Garantuje pořadí zpráv a jejich uchování (i po přečtení – lze zpětně číst).
*   Zvládne miliony zpráv za sekundu.
*   Použití: LinkedIn, Uber, Netflix – přenos událostí v reálném čase.

### Kdy sáhnout po Big Data technologiích?

Big Data nástroje jsou komplexní a drahé na provoz. **Nepotřebujete je**, pokud:
- Vaše data se vejdou do desítek GB a rostou pomalu.
- Zpracování trvá minuty, ne hodiny nebo dny.
- Máte tým 1–3 lidí a PostgreSQL stačí.

**Potřebujete je**, pokud:
- Zpracováváte TB nebo PB dat denně.
- Data přicházejí kontinuálně z tisíců zdrojů.
- Potřebujete škálovat na tisíce paralelních uzlů.
- Trénujete ML modely na miliardách příkladů.

---

## 8. Přehledné srovnání všech modelů

| Model              | Ukládá                       | Silná stránka                          | Slabá stránka                      | Příklady systémů                 |
|--------------------|------------------------------|----------------------------------------|------------------------------------|----------------------------------|
| **Relační (SQL)**  | Tabulky, řádky, sloupce      | Konzistence, JOIN, transakce (ACID)   | Škálovatelnost, flexibilita schématu | MySQL, PostgreSQL, Oracle       |
| **Dokumentový**    | JSON/BSON dokumenty          | Flexibilní schéma, webové API         | Duplicita dat, slabší konzistence  | MongoDB, Firestore, CouchDB     |
| **Klíč–hodnota**   | Páry klíč → hodnota          | Rychlost, caching                      | Bez struktury, nelze dotazovat    | Redis, DynamoDB, Memcached      |
| **Sloupcový**      | Sloupce místo řádků          | Analytika velkých dat (OLAP)          | Složitá správa, zápis             | Cassandra, HBase, Bigtable      |
| **Grafový**        | Uzly a hrany                 | Komplexní vztahy, traversal            | Škálovatelnost, niche             | Neo4j, Neptune, ArangoDB        |
| **Časové řady**    | Hodnota + timestamp          | Senzory, metriky, monitoring          | Pouze TS data                     | InfluxDB, TimescaleDB           |
| **Objektový**      | Objekty z OOP                | Přirozené pro OOP jazyky              | Niche, bez standardu              | ObjectDB, db4o                  |
| **Big Data**       | Distribuované soubory/proudy | Petabytové škálování, ML              | Komplexita, cena, provoz          | Hadoop, Spark, Kafka, BigQuery  |

---

## 9. Jak vybrat správný model?

```
Potřebuji JOIN přes tabulky, transakce, přesná data?
  → Relační databáze (MySQL, PostgreSQL)

Data mají proměnlivou strukturu nebo jsou to JSON dokumenty?
  → Dokumentová databáze (MongoDB)

Potřebuji extrémně rychlý caching nebo session storage?
  → Key-Value (Redis)

Analyzuji miliardy řádků a čtu jen pár sloupců?
  → Sloupcová databáze (Cassandra, BigQuery)

Vztahy jsou stejně důležité jako data samotná?
  → Grafová databáze (Neo4j)

Sbírám data ze senzorů nebo metriky v čase?
  → Time-Series databáze (InfluxDB, TimescaleDB)

Pracuji s petabajty dat z tisíců zdrojů, trénuji ML modely?
  → Big Data ekosystém (Hadoop, Spark, Kafka)
```

> **V praxi** moderní aplikace často kombinují více modelů najednou – relační DB pro transakční data, Redis pro cache, Elasticsearch pro fulltext vyhledávání. Tomuto přístupu se říká **Polyglot Persistence** (vícejazyčná persistence).

