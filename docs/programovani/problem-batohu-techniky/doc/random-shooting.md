# Náhodný výběr (Random Shooting)

## Princip algoritmu
Tento algoritmus se nesnaží o žádné "chytré" rozhodování. Funguje čistě na principu náhody (metoda Monte Carlo).

1.  Určíme si počet pokusů (např. 100 nebo 1000 iterací).
2.  V každém pokusu projdeme seznam předmětů a u každého si "hodíme mincí" (náhodně rozhodneme s pravděpodobností 50:50), zda ho dáme do batohu.
3.  Zkontrolujeme, zda se vygenerovaná kombinace vejde do batohu.
4.  Pokud ano a má větší cenu než dosud nejlepší nalezená, uložíme si ji.

## Klíčové vlastnosti
*   **Nejistota:** Algoritmus **nezaručuje** nalezení optimálního řešení. Může se stát, že nejlepší kombinaci prostě "netrefí".
*   **Rychlost:** Velmi rychlý. Počet operací závisí čistě na počtu iterací, který si sami zvolíme.
*   **Kvalita:** Čím více pokusů, tím větší šance na lepší výsledek. U malých problémů (málo předmětů) často najde optimum, u velkých selhává.
*   **Použití:** Hodí se tam, kde je prostor možností tak obrovský, že nelze použít hrubou sílu, a kde stačí "dostatečně dobré" řešení.

## Příklad kódu (JavaScript)
```javascript
for (let i = 0; i < pocet_iteraci; i++) {
   // Vygeneruj náhodnou kombinaci
   // Pokud je validní a lepší -> ulož
}
```
