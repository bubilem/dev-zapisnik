/**
 * Problém batohu - Heuristika poměr cena/výkon
 * 
 * Tato metoda je vylepšením hladového algoritmu.
 * Předměty se nejprve seřadí podle "výhodnosti" (poměr cena / váha).
 * Poté se batoh plní od nejvýhodnějších předmětů.
 * 
 * Složitost: O(n log n) kvůli řazení.
 */

const items = [
    { id: 1, name: "Stan", weight: 5, value: 100 },
    { id: 2, name: "Spacák", weight: 3, value: 80 },
    { id: 3, name: "Konzervy", weight: 4, value: 50 },
    { id: 4, name: "Voda", weight: 6, value: 70 },
    { id: 5, name: "Kniha", weight: 1, value: 10 },
];

const maxWeight = 10;

/**
 * Funkce pro heuristický hladový algoritmus
 * @param {Array} items - Seznam předmětů
 * @param {number} capacity - Kapacita batohu
 */
function knapsackHeuristicRatio(items, capacity) {
    // 1. Vytvoříme kopii pole, abychom neměnili původní pole (dobrá praxe)
    // A každému předmětu spočítáme jeho poměr cena/váha
    const itemsWithRatio = items.map(item => {
        return {
            ...item, // zkopírujeme vlastnosti původního předmětu
            ratio: item.value / item.weight
        };
    });

    // 2. Seřadíme předměty sestupně podle poměru (od největšího po nejmenší)
    itemsWithRatio.sort((a, b) => b.ratio - a.ratio);

    let currentWeight = 0;
    let currentValue = 0;
    let selectedItems = [];

    // 3. Procházíme seřazené předměty a bereme ty, co se vejdou
    for (const item of itemsWithRatio) {
        if (currentWeight + item.weight <= capacity) {
            currentWeight += item.weight;
            currentValue += item.value;
            selectedItems.push(item);
        }
    }

    return {
        value: currentValue,
        weight: currentWeight,
        items: selectedItems
    };
}

// --- SPUŠTĚNÍ ---

console.log("--- Start Heuristic Ratio Algorithm ---");
console.time("Execution Time");

const result = knapsackHeuristicRatio(items, maxWeight);

console.timeEnd("Execution Time");

console.log("Nalezená hodnota:", result.value);
console.log("Celková váha:", result.weight);
console.log("Vybrané předměty:", result.items.map(i => i.name).join(", "));
console.log("---------------------------------------");
