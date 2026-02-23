# Hrubá síla - Iterativní řešení (Brute Force Non-Recursive)

## Princip algoritmu
Stejně jako rekurzivní verze zkouší tento algoritmus **všechny možné kombinace**. Místo rekurze ale využívá chytrou matematickou vlastnost **binárních čísel**.

Pokud máme $N$ předmětů, existuje přesně $2^N$ kombinací. Každé číslo od $0$ do $2^N - 1$ lze převést do dvojkové soustavy (např. 01011...), kde:
*   **0** znamená "předmět na této pozici v batohu **není**".
*   **1** znamená "předmět na této pozici v batohu **je**".

Algoritmus tedy běží v jednom velkém cyklu od 0 do maxima a pro každé číslo "dešifruje", které předměty má do batohu dát.

## Klíčové vlastnosti
*   **Jistota:** Vždy najde **optimální** řešení.
*   **Složitost:** Stejná jako u rekurze, tedy **$O(2^n)$**. Je extrémně pomalý pro větší počet předmětů.
*   **Implementace:** Používá cyklus a **bitové operace** (bitový posun `<<`, `>>` a bitový součin `&`).
*   **Výhoda:** Nehrozí "přetečení zásobníku" (Stack Overflow), které může nastat u rekurze při velkém zanoření.

## Příklad kódu (JavaScript)
```javascript
const totalCombinations = 1 << n; // 2 na N
for (let i = 0; i < totalCombinations; i++) {
   // Zjisti, které bity v čísle 'i' jsou jedničky
   // Pokud je bit 'j' jednička -> dej předmět 'j' do batohu
   // Zkontroluj váhu a cenu
}
```
