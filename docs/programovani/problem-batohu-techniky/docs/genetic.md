# Genetický Algoritmus (Evolutionary Algorithm)

## Princip algoritmu
Tento algoritmus se inspiruje přírodním výběrem a evolucí. Místo jednoho řešení pracuje s celou skupinou řešení (populací), kterou postupně vylepšuje.

Celý proces probíhá v cyklech (generacích):
1.  **Inicializace:** Vytvoříme náhodnou populaci (např. 16 jedinců/batohů).
2.  **Ohodnocení (Fitness):** Změříme kvalitu každého jedince (cenu batohu).
3.  **Selekce:** Vybereme ty nejlepší, kteří "přežijí". Slabé zahodíme.
4.  **Křížení (Crossover):** Z přeživších rodičů vytvoříme nové potomky. Potomek dědí vlastnosti (předměty) po obou rodičích + trocha náhody.
5.  **Mutace/Restart:** Občas provedeme náhodnou změnu nebo vyměníme část populace, abychom nezůstali "zaseknutí" ve slepé uličce (lokálním optimu).

## Validita řešení
Důležitým aspektem je, aby algoritmus pracoval jen s **platnými** řešeními (nepřetížený batoh). Toho lze docílit chytrým generováním náhodných jedinců a kontrolou při křížení.

## Klíčové vlastnosti
*   **Použití:** Ideální pro velmi složité problémy, kde selhává hrubá síla a jednoduché heuristiky nestačí.
*   **Výkon:** Obvykle najde velmi kvalitní (často optimální) řešení v rozumném čase.
*   **Parametry:** Výsledek silně závisí na nastavení (velikost populace, počet generací, pravděpodobnost mutace).

## Příklad kódu (JavaScript)
```javascript
let populace = vytvorNahodnouPopulaci(16);

for (let i = 0; i < pocet_generaci; i++) {
   populace.sort((a, b) => b.fitness - a.fitness); // Seřadit
   let prezivsi = populace.slice(0, 10); // Selekce
   
   while (prezivsi.length < 16) { // Doplnění do plného stavu
      let rodicA = vyberNahodneho(prezivsi);
      let rodicB = vyberNahodneho(prezivsi);
      prezivsi.push(krizeni(rodicA, rodicB));
   }
   populace = prezivsi;
}
```
