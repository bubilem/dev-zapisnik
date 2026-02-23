/**
 * Problém batohu - Naivní hladový algoritmus (Naive Greedy)
 * 
 * Tento nejjednodušší přístup bere předměty v tom pořadí, v jakém přicházejí.
 * Pokud se předmět vejde do batohu, vezmeme ho. Pokud ne, jdeme dál.
 * 
 * Tento algoritmus je extrémně rychlý (složitost O(n)), ale často dává
 * velmi špatné výsledky, protože nebere v úvahu cenu ani váhu, jen pořadí.
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
 * Funkce pro naivní hladový algoritmus
 * @param {Array} items - Seznam předmětů
 * @param {number} capacity - Kapacita batohu
 */
function knapsackNaiveGreedy(items, capacity) {
    let currentWeight = 0;
    let currentValue = 0;
    let selectedItems = [];

    // Procházíme předměty postupně jeden po druhém (jak jdou v poli za sebou)
    for (const item of items) {
        // Pokud se aktuální předmět vejde do batohu (zbývá dost místa)
        if (currentWeight + item.weight <= capacity) {
            // Přidáme ho
            currentWeight += item.weight;
            currentValue += item.value;
            selectedItems.push(item);
        }
        // Pokud se nevejde, prostě ho přeskočíme a jdeme na další
    }

    return {
        value: currentValue,
        weight: currentWeight,
        items: selectedItems
    };
}

// --- SPUŠTĚNÍ ---

console.log("--- Start Naive Greedy Algorithm ---");
console.time("Execution Time");

const result = knapsackNaiveGreedy(items, maxWeight);

console.timeEnd("Execution Time");

console.log("Nalezená hodnota:", result.value);
console.log("Celková váha:", result.weight);
console.log("Vybrané předměty:", result.items.map(i => i.name).join(", "));
console.log("------------------------------------");
