# Layoutování v CSS

[Zpět na README.md](../README.md)

Layoutování je kritický krok, kdy žák přestává skládat prvky pod sebe a začíná tvořit skutečný design webu. Je to bod, kde se nejčastěji "bojuje" s CSS. Aby žák pochopil layout, musí přestat vnímat web jako textový dokument a začít ho vidět jako **systém pružných kontejnerů**.

Zde jsou základní kompetence pro layoutování:

## 1. Koncepce toku dokumentu (Document Flow)

Dříve než začne prvky posouvat, musí rozumět jejich přirozenému chování:

- **Block vs. Inline:** Rozdíl mezi prvky, které zabírají celou šířku (`div`, `h1`, `p`), a těmi, které se řadí vedle sebe (`span`, `a`, `img`).
- **Box-sizing (Klíčová dovednost):** Pochopení, proč by měl vždy nastavit `box-sizing: border-box;`, aby `padding` a `border` nezvětšovaly definovanou šířku prvku.

## 2. Flexbox (Standard pro moderní layout)

Dnes naprostý základ. Žák by měl umět pracovat s osami:

- **Flex kontejner vs. položka:** Rozlišení, které vlastnosti patří rodiči (`display: flex`) a které potomkům.
- **Hlavní a příčná osa:** Pochopení směrů `row` (řádek) a `column` (sloupec).
- **Zarovnávání:** \* `justify-content`: Rozmístění prvků na hlavní ose (start, center, space-between).
- `align-items`: Centrování na příčné ose.

- **Flex-wrap:** Schopnost nechat prvky spadnout na další řádek, pokud se nevejdou.

## 3. CSS Grid (Pro komplexní mřížky)

Zatímco Flexbox je na řádky, Grid je na celé plochy:

- **Definice mřížky:** `grid-template-columns` a `grid-template-rows`.
- **Jednotka `fr`:** Práce s flexibilním zlomkem volného prostoru.
- **Mezery:** Používání vlastnosti `gap` (která dnes funguje i ve Flexboxu).

## 4. Pozicování (Positioning)

Vědět, jak prvek "vytrhnout" z běžného toku:

- **Relative:** Posun prvku vzhledem k jeho původnímu místu.
- **Absolute:** Umístění prvku přesně na souřadnice vzhledem k nejbližšímu `relative` rodiči.
- **Fixed:** Přichycení prvku k oknu prohlížeče (např. fixní menu).
- **Z-index:** Pochopení vrstev (co je "nad" čím).

## 5. Responzivita (Responsive Design)

Web musí fungovat na mobilu i desktopu:

- **Viewport meta tag:** Vědět, že v HTML musí být `<meta name="viewport" ...>`, jinak CSS na mobilu nebude fungovat správně.
- **Media Queries:** Schopnost napsat pravidlo `@media`, které změní layout při určité šířce obrazovky (např. pod 768px).
- **Mobile First přístup:** Koncepce, kdy se nejprve styluje pro mobil a pak se přidávají pravidla pro větší obrazovky.

<br>
<br>
<br>

# Cvičení: Layout a Flexbox

## Část 1: Flexbox v teorii

Máš kontejner se třemi tlačítky. Chceš, aby byla vodorovně, uprostřed kontejneru a s rovnoměrnými mezerami mezi nimi.
**Doplň chybějící hodnoty:**

```css
.container {
  display: __________;
  flex-direction: __________;
  justify-content: __________;
}
```

## Část 2: Pozicování

Máš obrázek v kartě a chceš do pravého horního rohu obrázku umístit ikonku "Srdíčko". Jaké pozicování použiješ?

- Pro kartu (obal): `position: __________;`
- Pro ikonku (srdíčko): `position: __________;` a vlastnosti `top: 0; right: 0;`

## Část 3: Media Queries

Napiš základní strukturu Media Query, která skryje prvek s třídou `.sidebar`, pokud je šířka obrazovky **menší než 600px**:

```css
@media (__________: __________) {
  .sidebar {
    display: __________;
  }
}
```

<br>
<br>
<br>


# Klíč k řešení

### Část 1: Flexbox

- `display: flex;`
- `flex-direction: row;` (výchozí hodnota, ale pro jistotu)
- `justify-content: space-around;` (nebo `space-between` / `space-evenly`)

### Část 2: Pozicování

- Karta: `position: relative;` (vytvoří kotevní bod)
- Ikonka: `position: absolute;` (vztahuje se k té relativní kartě)

### Část 3: Media Queries

```css
@media (max-width: 600px) {
  .sidebar {
    display: none;
  }
}
```
