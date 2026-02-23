/**
 * Problém batohu - Hrubá síla (Brute Force)
 * 
 * Tento algoritmus vyzkouší všechny možné kombinace předmětů.
 * Pro každý předmět se rozhodne: BUĎ ho vezmeme, NEBO ho nevezmeme.
 * To vede k rekurzivnímu stromu možností.
 * 
 * Složitost: O(2^n) - exponenciální. Pro 20 předmětů cca 1 milion operací.
 */

// Definice předmětů (id, název, váha, cena)
const items = [
    { id: 1, name: "Stan", weight: 5, value: 100 },
    { id: 2, name: "Spacák", weight: 3, value: 80 },
    { id: 3, name: "Konzervy", weight: 4, value: 50 },
    { id: 4, name: "Voda", weight: 6, value: 70 },
    { id: 5, name: "Kniha", weight: 1, value: 10 },
];

const maxWeight = 10; // Maximální nosnost batohu

/**
 * Funkce pro řešení problému batohu hrubou silou
 * @param {Array} items - Seznam dostupných předmětů
 * @param {number} capacity - Maximální nosnost batohu
 * @returns {Object} - Objekt s nejlepším řešením (hodnota, váha, předměty)
 */
function knapsackBruteForce(items, capacity) {
    let bestValue = 0;
    let bestCombination = [];

    // Pomocná rekurzivní funkce
    // currentIndex: na kterém předmětu zrovna jsme (index v poli items)
    // currentWeight: aktuální váha věcí v batohu
    // currentValue: aktuální hodnota věcí v batohu
    // selectedItems: seznam věcí, které jsme zatím vybrali
    function search(currentIndex, currentWeight, currentValue, selectedItems) {

        // 1. Základní případ: Prošli jsme všechny předměty (jsme na konci seznamu)
        if (currentIndex === items.length) {
            // Pokud jsme našli lepší řešení než dosud, uložíme si ho
            if (currentValue > bestValue) {
                bestValue = currentValue;
                bestCombination = [...selectedItems]; // Důležité: Vytvoříme kopii pole, abychom si uložili aktuální stav
            }
            return;
        }

        const item = items[currentIndex];

        // 2. Větev A: Zkusíme předmět VZÍT (pouze pokud se vejde)
        if (currentWeight + item.weight <= capacity) {
            search(
                currentIndex + 1,               // Jdeme na další předmět
                currentWeight + item.weight,    // Přičteme váhu
                currentValue + item.value,      // Přičteme hodnotu
                [...selectedItems, item]        // Přidáme předmět do seznamu vybraných
            );
        }

        // 3. Větev B: Zkusíme předmět NEVZÍT (to je možné vždy)
        search(
            currentIndex + 1,                   // Jdeme na další předmět
            currentWeight,                      // Váha se nemění
            currentValue,                       // Hodnota se nemění
            selectedItems                       // Seznam vybraných se nemění
        );
    }

    // Spustíme hledání od prvního předmětu (index 0) s prázdným batohem (váha 0, hodnota 0)
    search(0, 0, 0, []);

    // Vrátíme výsledek
    return {
        value: bestValue,
        items: bestCombination,
        weight: bestCombination.reduce((sum, item) => sum + item.weight, 0)
    };
}

// --- SPUŠTĚNÍ A TESTOVÁNÍ ---

console.log("--- Start Brute Force ---");
console.time("Execution Time"); // Měření času

const result = knapsackBruteForce(items, maxWeight);

console.timeEnd("Execution Time");

console.log("Maximální hodnota:", result.value);
console.log("Celková váha:", result.weight);
console.log("Vybrané předměty:", result.items.map(i => i.name).join(", "));
console.log("-----------------------");
