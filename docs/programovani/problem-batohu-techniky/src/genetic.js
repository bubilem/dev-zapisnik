/**
 * Problém batohu - Genetický algoritmus (Pouze validní jedinci)
 * 
 * Update:
 * - Generování náhodné populace nyní vytváří jen validní jedince (nepřekročí kapacitu).
 * - Křížení (Crossover) také garantuje validitu potomka.
 */

const items = [
    { id: 1, name: "Stan", weight: 5, value: 100 },
    { id: 2, name: "Spacák", weight: 3, value: 80 },
    { id: 3, name: "Konzervy", weight: 4, value: 50 },
    { id: 4, name: "Voda", weight: 6, value: 70 },
    { id: 5, name: "Kniha", weight: 1, value: 10 },
];

const maxWeight = 10;
const populationSize = 16;
const maxGenerations = 50;
const stagnationLimit = 5;

// --- Pomocné funkce ---

// Vytvoří náhodného VALIDNÍHO jedince
function createRandomIndividual() {
    const genes = new Array(items.length).fill(false);

    // Vytvoříme pole indexů [0, 1, 2, ... n] a zamícháme ho
    const indices = Array.from({ length: items.length }, (_, i) => i);
    indices.sort(() => Math.random() - 0.5); // Shuffle

    let currentWeight = 0;
    // Postupně zkoušíme přidávat předměty v náhodném pořadí
    for (const i of indices) {
        if (currentWeight + items[i].weight <= maxWeight) {
            genes[i] = true;
            currentWeight += items[i].weight;
        }
    }
    return genes;
}

// Spočítá fitness jedince. Díky validnímu generování by nemělo dojít k přetížení.
function calculateFitness(individual) {
    let weight = 0;
    let value = 0;
    for (let i = 0; i < items.length; i++) {
        if (individual[i]) {
            weight += items[i].weight;
            value += items[i].value;
        }
    }
    // Pojistka, kdyby se nějakou chybou dostal do populace neplatný jedinec
    if (weight > maxWeight) return 0;
    return value;
}

// Křížení se zárukou validity
function crossover(parentA, parentB) {
    const childGenes = new Array(items.length).fill(false);
    let currentWeight = 0;
    const candidates = [];

    // 1. Fáze: Dědění jistých prvků (průnik - mají oba rodiče)
    for (let i = 0; i < items.length; i++) {
        if (parentA[i] && parentB[i]) {
            // Oba rodiče to mají -> dítě to musí mít taky
            childGenes[i] = true;
            currentWeight += items[i].weight;
        } else if (parentA[i] || parentB[i]) {
            // Má to jen jeden z rodičů -> je to kandidát na doplnění
            candidates.push(i);
        }
    }

    // 2. Fáze: Doplnění z kandidátů (sjednocení bez průniku)
    // Kandidáty zamícháme, abychom vybírali náhodně
    candidates.sort(() => Math.random() - 0.5);

    for (const i of candidates) {
        // Pokud se vejde, přidáme ho. 
        // Tím zajistíme, že batoh bude co nejplnější (greedy approach na kandidáty),
        // ale zároveň validní a náhodný (díky shuffle).
        if (currentWeight + items[i].weight <= maxWeight) {
            childGenes[i] = true;
            currentWeight += items[i].weight;
        }
    }

    return childGenes;
}

// --- Hlavní smyčka ---

function runGeneticAlgorithm() {
    let population = [];
    // Inicializace validní populace
    for (let i = 0; i < populationSize; i++) {
        population.push(createRandomIndividual());
    }

    let globalBestValue = 0;
    let stagnationCounter = 0;

    for (let gen = 0; gen < maxGenerations; gen++) {
        // Ohodnocení
        let evaluatedPopulation = population.map(ind => ({
            genes: ind,
            fitness: calculateFitness(ind)
        }));

        // Seřazení
        evaluatedPopulation.sort((a, b) => b.fitness - a.fitness);

        const bestInGen = evaluatedPopulation[0].fitness;

        if (bestInGen > globalBestValue) {
            globalBestValue = bestInGen;
            stagnationCounter = 0;
            console.log(`[Generace ${gen}] Nové maximum: ${globalBestValue}`);
        } else {
            stagnationCounter++;
        }

        // Zahřátí (Restart)
        if (stagnationCounter >= stagnationLimit) {
            console.log(`[Generace ${gen}] STAGNACE -> ZAHŘÁTÍ`);
            stagnationCounter = 0;
            const survivors = evaluatedPopulation.slice(0, populationSize / 2).map(ind => ind.genes);
            // Doplnění novými VALIDNÍMI jedinci
            while (survivors.length < populationSize) {
                survivors.push(createRandomIndividual());
            }
            population = survivors;
            continue;
        }

        // Selekce a Křížení
        const survivors = evaluatedPopulation.slice(0, 10).map(ind => ind.genes);

        while (survivors.length < populationSize) {
            const parentA = survivors[Math.floor(Math.random() * survivors.length)];
            const parentB = survivors[Math.floor(Math.random() * survivors.length)];
            survivors.push(crossover(parentA, parentB)); // Nyní vrací vždy validního potomka
        }

        population = survivors;
    }

    // Výsledek
    const finalEvaluated = population.map(ind => ({ genes: ind, fitness: calculateFitness(ind) }));
    finalEvaluated.sort((a, b) => b.fitness - a.fitness);
    const bestSolution = finalEvaluated[0];

    const selectedItems = [];
    let totalWeight = 0;
    for (let i = 0; i < items.length; i++) {
        if (bestSolution.genes[i]) {
            selectedItems.push(items[i]);
            totalWeight += items[i].weight;
        }
    }

    return {
        value: bestSolution.fitness,
        weight: totalWeight,
        items: selectedItems
    };
}

// --- Spuštění ---
console.log("--- Start Genetic Algorithm (Valid Only) ---");
const result = runGeneticAlgorithm();
console.log("-------------------------------");
console.log("Nejlepší hodnota:", result.value);
console.log("Celková váha:", result.weight);
console.log("Vybrané předměty:", result.items.map(i => i.name).join(", "));
console.log("-------------------------------");
