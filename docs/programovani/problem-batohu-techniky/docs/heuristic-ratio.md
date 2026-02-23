# Heuristika – Poměr cena/výkon (Heuristic Ratio)

## Princip algoritmu
Tento algoritmus je "chytřejší bratr" hladového algoritmu. Předtím, než začne batoh plnit, si předměty seřadí podle jejich výhodnosti.

1.  Pro každý předmět vypočítá tzv. **měrnou hodnotu** (efektivitu):
    $$ \text{ratio} = \frac{\text{cena}}{\text{váha}} $$
2.  Seřadí všechny předměty podle tohoto poměru od největšího po nejmenší.
3.  Prochází seřazený seznam a bere vše, co se vejde.

## Klíčové vlastnosti
*   **Kvalita:** Často najde velmi dobré, někdy i optimální řešení. Je mnohem spolehlivější než naivní hladový algoritmus.
*   **Složitost:** Hlavní brzdou je řazení (sort), které má složitost **$O(n \log n)$**. I tak je to ale velmi rychlé (mnohem rychlejší než hrubá síla).
*   **Nevýhoda:** Stále je to jen heuristika. Může se stát, že "hltavě" zaplní batoh něčím výhodným, ale zbyde malé hluché místo, které by se dalo využít lépe jinou kombinací méně výhodných předmětů.

## Příklad kódu (JavaScript)
```javascript
// Seřazení podle poměru
items.sort((a, b) => (b.cena / b.vaha) - (a.cena / a.vaha));

// Hladový výběr
for (const item of items) {
   if (vejdeSe(item)) pridej(item);
}
```
