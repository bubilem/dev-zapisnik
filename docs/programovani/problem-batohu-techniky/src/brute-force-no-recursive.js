/**
 * Problém batohu - Hrubá síla (Nerekurzivní / Iterativní)
 * 
 * Tento přístup využívá binární reprezentaci čísel k vyjádření všech možných kombinací.
 * Pokud máme N předmětů, existuje 2^N možných kombinací.
 * Každé číslo od 0 do 2^N - 1 v binárním zápisu představuje jednu unikátní podmnožinu předmětů.
 * 
 * Příklad pro 3 předměty (0 až 7):
 * 0 (000) -> nic
 * 1 (001) -> předmět A
 * 2 (010) -> předmět B
 * 3 (011) -> předměty A a B
 * ... atd.
 */

const items = [
    { id: 1, name: "Stan", weight: 5, value: 100 },
    { id: 2, name: "Spacák", weight: 3, value: 80 },
    { id: 3, name: "Konzervy", weight: 4, value: 50 },
    { id: 4, name: "Voda", weight: 6, value: 70 },
    { id: 5, name: "Kniha", weight: 1, value: 10 },
];

const maxWeight = 10;

function knapsackIterative(items, capacity) {
    let bestValue = 0;
    let bestCombination = [];
    const n = items.length;

    // Počet všech možných kombinací je 2 na N (bitový posun 1 << N)
    const totalCombinations = 1 << n;

    // Projdeme všechna čísla od 0 do 2^N - 1
    for (let i = 0; i < totalCombinations; i++) {
        let currentWeight = 0;
        let currentValue = 0;
        let currentItems = [];

        // Pro každou kombinaci 'i' projdeme jednotlivé bity (předměty)
        for (let j = 0; j < n; j++) {
            // Zjistíme, zda je j-tý bit v čísle 'i' nastaven na 1
            // (i >> j) posune bity čísla i doprava o j pozic
            // & 1 provede bitový součin s jedničkou (vrátí 1 nebo 0)
            if ((i >> j) & 1) {
                const item = items[j];
                currentWeight += item.weight;
                currentValue += item.value;
                currentItems.push(item);
            }
        }

        // Kontrola: Je kombinace platná? (Vejde se do batohu?)
        if (currentWeight <= capacity) {
            // Pokud ano, je lepší než dosud nalezené nejlepší řešení?
            if (currentValue > bestValue) {
                bestValue = currentValue;
                bestCombination = currentItems;
            }
        }
    }

    return {
        value: bestValue,
        items: bestCombination,
        weight: bestCombination.reduce((sum, item) => sum + item.weight, 0)
    };
}

// --- SPUŠTĚNÍ A TESTOVÁNÍ ---

console.log("--- Start Iterative Brute Force ---");
console.time("Execution Time");

const result = knapsackIterative(items, maxWeight);

console.timeEnd("Execution Time");

console.log("Maximální hodnota:", result.value);
console.log("Celková váha:", result.weight);
console.log("Vybrané předměty:", result.items.map(i => i.name).join(", "));
console.log("-----------------------");
