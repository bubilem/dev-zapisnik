# Markdown - Základní manuál a tahák

Markdown je odlehčený značkovací jazyk s jednoduchou syntaxí, který umožňuje formátovat text pro web (HTML), dokumentaci, README soubory a další.

## 1. Nadpisy (Headers)
Nadpisy se tvoří pomocí křížků `#`. Počet křížků určuje úroveň nadpisu.

```markdown
# Nadpis H1 (Hlavní nadpis)
## Nadpis H2
### Nadpis H3
#### Nadpis H4
##### Nadpis H5
###### Nadpis H6
```

---

## 2. Zvýraznění textu (Emphasis)

| Styl | Syntax | Příklad | Výsledek |
| :--- | :--- | :--- | :--- |
| **Tučné** | `**text**` nebo `__text__` | `**Důležité**` | **Důležité** |
| *Kurzíva* | `*text*` nebo `_text_` | `*Poznámka*` | *Poznámka* |
| ***Tučná kurzíva*** | `***text***` | `***Pozor***` | ***Pozor*** |
| ~~Přeškrtnuté~~ | `~~text~~` | `~~Chyba~~` | ~~Chyba~~ |

---

## 3. Seznamy (Lists)

### Odrážkový seznam (Unordered)
Používá se `-`, `*` nebo `+`.

```markdown
- Položka 1
- Položka 2
  - Vnořená položka 2.1
  - Vnořená položka 2.2
* Alternativní odrážka
```

### Číslovaný seznam (Ordered)
Používá se číslo následované tečkou. Čísla nemusí jít popořadě (Markdown si je seřadí sám), ale je dobrým zvykem začít jedničkou.

```markdown
1. První krok
2. Druhý krok
3. Třetí krok
```

---

## 4. Odkazy a Obrázky

### Odkazy (Links)
`[Text odkazu](URL adresa)`

```markdown
[Google](https://www.google.com)
```
Výsledek: [Google](https://www.google.com)

### Obrázky (Images)
`![Alternativní text](URL obrázku)`

```markdown
![GitHub](https://www.bubilek.cz/www/img/github.webp)
```
Například: ![GitHub](https://www.bubilek.cz/www/img/github.webp)

---

## 5. Citace (Blockquotes)
Používá se znak `>` na začátku řádku.

```markdown
> Toto je citace.
> Může být na více řádků.
```
> Toto je citace.
> Může být na více řádků.

---

## 6. Kód (Code)

### Řádkový kód (Inline code)
Obalení textu zpětnými apostrofy `` ` ``.

```markdown
Použijte funkci `print()` pro výpis.
```
Výsledek: Použijte funkci `print()` pro výpis.

### Blok kódu (Code blocks)
Tři zpětné apostrofy ``` na začátku a na konci. Lze specifikovat i jazyk pro zvýraznění syntaxe.

<pre>
```python
def hello():
    print("Hello World")
```
</pre>
Například:
```python
def hello():
    print("Hello World")
```
nebo:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Stránka</title>
</head>
<body>
    <h1>Nadpis</h1>
    <p>Odstavec</p>
</body>
</html>
```


---

## 7. Tabulky (Tables)
Sloupce se oddělují svislítkem `|` a záhlaví od těla pomlčkami `-`. Dvojtečky určují zarovnání.

```markdown
| Zarovnání vlevo | Zarovnání na střed | Zarovnání vpravo |
| :--- | :---: | ---: |
| Text | Text | Text |
| Další řádek | Data | 100 Kč |
```

| Zarovnání vlevo | Zarovnání na střed | Zarovnání vpravo |
| :--- | :---: | ---: |
| Text | Text | Text |
| Další řádek | Data | 100 Kč |

---

## 8. Oddělovač (Horizontal Rule)
Tři pomlčky `---`, hvězdičky `***` nebo podtržítka `___`.

```markdown
---
```

---

## 9. Úkoly (Task Lists)
Používá se v GitHub/GitLab markdownu.

```markdown
- [x] Splněný úkol
- [ ] Nesplněný úkol
```
- [x] Splněný úkol
- [ ] Nesplněný úkol
