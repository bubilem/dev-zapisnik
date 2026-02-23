# Naivní Hladový Algoritmus (Naive Greedy)

## Princip algoritmu
Jedná se o nejjednodušší možný deterministický přístup. Algoritmus "hltavě" bere vše, co se mu vejde pod ruku, bez jakéhokoliv rozmýšlení.

1.  Algoritmus prochází seznam předmětů přesně v tom pořadí, v jakém jsou zadány (např. v databázi nebo poli).
2.  Vezme první předmět. Vejde se? Šup tam s ním. Nevejde? Jdeme dál.
3.  Vezme druhý předmět. Vejde se (k tomu prvnímu)? Šup tam s ním.
4.  Atd.

## Klíčové vlastnosti
*   **Rychlost:** Extrémně rychlý. Jeho složitost je **$O(n)$** – stačí jeden jediný průchod seznamem.
*   **Kvalita:** Obvykle **velmi špatná**.
    *   Algoritmus ignoruje cenu i váhu předmětů.
    *   Výsledek závisí čistě na **náhodě** (v jakém pořadí jsou data seřazena na vstupu).
*   **Riziko:** Může se stát, že jako první vezme velký, těžký a levný předmět, který zaplní batoh a znemožní vložení menších a cennějších věcí.

## Příklad kódu (JavaScript)
```javascript
for (const item of items) {
   if (aktualni_vaha + item.weight <= kapacita) {
      pridejDoBatohu(item);
   }
}
```
