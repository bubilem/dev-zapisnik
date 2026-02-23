# Úvod do UI/UX a Designu

[Zpět na README.md](../README.md)

Programátor, který umí kódovat, ale nerozumí designu, tvoří funkční, ale "ošklivé" aplikace. Proč některé weby působí důvěryhodně a jiné jako z roku 1990? Odpověď je v pravidlech designu.

## 1. UX vs. UI

- **UX (User Experience):** Jak se web *používá*. Je tlačítko tam, kde ho uživatel čeká? Je proces nákupu jednoduchý? Řešíme *logiku a pocity*.
- **UI (User Interface):** Jak web *vypadá*. Barvy, typografie, stíny, tvary. Řešíme *vizuál*.

> *"UI je sedlo, třmeny a otěže. UX je pocit, že ovládáte koně."*

## 2. Typografie a Hierarchie

Základem designu není barva, ale text.
- **Hierarchie:** Nadpis musí být výrazně větší než text. Uživatel nečte, ale skenuje. Veďte jeho oko.
- **Line-height:** Text nesmí být namačkaný (výchozí hodnota je většinou malá). Nastavte `line-height: 1.5` nebo `1.6`.
- **Délka řádku:** Příliš dlouhé řádky se špatně čtou. Ideál je 45–75 znaků na řádek (cca `max-width: 60ch`).

## 3. Whitespace (Bílý prostor)

Nejčastější chyba začátečníků: všechno na sebe nalepit.
- **Prostor dýchá:** Nebojte se velkých marginů a paddingů.
- **Oddělování:** Pokud dvě věci spolu nesouvisí, dejte mezi ně mezeru. Pokud souvisí, dejte je k sobě. Bílý prostor funguje lépe než čáry a rámečky.

## 4. Barvy a Kontrast

- **Pravidlo 60-30-10:**
    - 60 % primární barva (neutrální, např. bílá/šedá pozadí).
    - 30 % sekundární barva (např. tmavě modrá pro karty/lišty).
    - 10 % akcentní barva (výrazná, např. oranžová pro tlačítka "Koupit").
- **Kontrast:** Text musí být čitelný. Šedý text na šedém pozadí je zločin proti přístupnosti (a čitelnosti na slunci).

<br>
<br>
<br>

# Cvičení: Design check

## Část 1: Analýza chyby

Podívejte se na následující CSS kód pro tlačítko. Co je na něm z pohledu UI/UX špatně?

```css
.btn {
    background-color: blue;
    color: black; 
    padding: 2px; 
    cursor: auto; 
}
```

Najděte alespoň **3 chyby**:
1. `__________`
2. `__________`
3. `__________`

## Část 2: Typografie

Máte odstavec textu na blogu. Které nastavení bude pro čtenáře nejpříjemnější?

A) `font-size: 10px; line-height: 1; width: 100%;`
B) `font-size: 12px; line-height: 2; width: 200px;`
C) `font-size: 16px (nebo 1rem); line-height: 1.6; max-width: 70ch;`

Odpověď: `__________`

<br>
<br>
<br>

# Klíč k řešení

### Část 1: Chyby

1. **Špatný kontrast:** Černá na tmavě modré je nečitelná. (Měla by být bílá).
2. **Malý klikací prostor:** `padding: 2px` je málo. Uživatel na mobilu se netrefí prstem.
3. **Chybějící feedback:** `cursor: auto` nenapoví uživateli, že jde o odkaz/tlačítko. (Mělo by být `pointer`).

### Část 2: Typografie

**C** je správně.
- Velikost písma 16px je standard pro čitelnost.
- `line-height: 1.6` zajišťuje, že se řádky neslévají.
- `max-width: 70ch` zajišťuje, že uživatel nemusí kroutit hlavou zleva doprava na širokém monitoru.
