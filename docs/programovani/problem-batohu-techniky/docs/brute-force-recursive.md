# Hrubá síla - Rekurzivní řešení (Brute Force Recursive)

## Princip algoritmu
Tento algoritmus prochází **úplně všechny možné kombinace** předmětů, které lze do batohu vložit. 

Funguje na principu **rozhodovacího stromu**. Pro každý předmět se algoritmus rekurzivně (sám sebe zavolá) rozvětví na dvě možnosti:
1.  **Předmět VZÍT** (pokud se do batohu vejde).
2.  **Předmět NEVZÍT**.

Tímto způsobem prozkoumá každý lístek stromu možností. U každé platné kombinace (tzv. listu) zkontroluje celkovou cenu a porovná ji s dosud nalezeným maximem.

## Klíčové vlastnosti
*   **Jistota:** Vždy najde **optimální** (nejlepší možné) řešení.
*   **Složitost:** Časová složitost je **$O(2^n)$**, kde $n$ je počet předmětů. To znamená, že s každým dalším předmětem se doba výpočtu zdvojnásobí.
    *   5 předmětů = 32 možností (ihned)
    *   20 předmětů = cca 1 milion možností (zlomek sekundy)
    *   50 předmětů = cca $10^{15}$ možností (miliony let)
*   **Implementace:** Využívá rekurzi (funkce volá sama sebe).

## Příklad kódu (JavaScript)
Ve funkci `search(index, váha, cena)`:
*   Pokud je `index == počet_předmětů`, konec větve. Porovnej cenu s maximem.
*   Jinak zavolej `search` pro další předmět (se zahrnutím aktuálního i bez něj).
