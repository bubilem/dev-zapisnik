/**
 * Problém batohu - Náhodný výběr (Random Shooting)
 * 
 * Tento algoritmus generuje náhodná řešení a pamatuje si to nejlepší platné.
 * Není zaručeno, že najde optimální řešení, ale může být velmi rychlý.
 * Kvalita výsledku závisí na počtu provedených pokusů (iterací).
 */

const items = [
    { id: 1, name: "Stan", weight: 5, value: 100 },
    { id: 2, name: "Spacák", weight: 3, value: 80 },
    { id: 3, name: "Konzervy", weight: 4, value: 50 },
    { id: 4, name: "Voda", weight: 6, value: 70 },
    { id: 5, name: "Kniha", weight: 1, value: 10 },
];

const maxWeight = 10;
const iterations = 100; // Počet náhodných pokusů

/**
 * Funkce pro náhodné řešení
 * @param {Array} items - Seznam předmětů
 * @param {number} capacity - Kapacita batohu
 * @param {number} maxAttempts - Počet iterací
 */
function knapsackRandom(items, capacity, maxAttempts) {
    let bestValue = 0;
    let bestWeight = 0;
    let bestCombination = [];

    // Hlavní cyklus - opakujeme generování náhodného řešení
    for (let i = 0; i < maxAttempts; i++) {
        let currentWeight = 0;
        let currentValue = 0;
        let currentItems = [];

        // Projdeme všechny předměty a náhodně se rozhodneme, zda je vezmeme
        for (const item of items) {
            // Každý předmět má 50% šanci na vložení do batohu
            if (Math.random() > 0.5) {
                currentWeight += item.weight;
                currentValue += item.value;
                currentItems.push(item);
            }
        }

        // Zkontrolujeme, zda je vygenerované řešení platné (vejde se do batohu)
        if (currentWeight <= capacity) {
            // Pokud je platné a lepší než dosavadní maximum, uložíme ho
            if (currentValue > bestValue) {
                bestValue = currentValue;
                bestWeight = currentWeight;
                bestCombination = [...currentItems]; // Uložíme kopii pole
            }
        }
    }

    return {
        value: bestValue,
        weight: bestWeight,
        items: bestCombination
    };
}

// --- SPUŠTĚNÍ ---

console.log("--- Start Random Algorithm ---");
console.log(`Počet iterací: ${iterations}`);
console.time("Execution Time");

const result = knapsackRandom(items, maxWeight, iterations);

console.timeEnd("Execution Time");

console.log("Nejlepší nalezená hodnota:", result.value);
console.log("Celková váha:", result.weight);
console.log("Vybrané předměty:", result.items.map(i => i.name).join(", "));
console.log("------------------------------");
