const mutationProbability = 0.1; 



function fillMissingNumbers(child) {
    const numbers = Array.from({ length: 125 }, (_, i) => i + 1);
    const usedNumbers = [];

    child.forEach(num => {
        if (num !== null) {
            usedNumbers.push(num);
        }
    });

    const filteredNumbers = [];
    for (let i = 0; i < numbers.length; i++) {
        let isUsed = false;

        for (let j = 0; j < usedNumbers.length; j++) {
            if (numbers[i] === usedNumbers[j]) {
                isUsed = true;
                break;
            }
        }


        if (!isUsed) {
            filteredNumbers.push(numbers[i]);
        }
    }

    for (let i = 0; i < child.length; i++) {
        if (child[i] === null) {
            child[i] = filteredNumbers.pop();
        }
    }

    return child;
}

function crossover(parent1, parent2) {
    const child = Array(125).fill(null);
    const crossoverPoint = Math.floor(Math.random() * 125);

    const usedNumbers = [];

    for (let i = 0; i < crossoverPoint; i++) {
        child[i] = parent1[i];
        usedNumbers.push(parent1[i]); 
    }

    for (let i = crossoverPoint; i < 125; i++) {
        let isUsed = false;
        
        for (let j = 0; j < usedNumbers.length; j++) {
            if (usedNumbers[j] === parent2[i]) {
                isUsed = true;
                break;
            }
        }
        if (!isUsed) {
            child[i] = parent2[i];
            usedNumbers.push(parent2[i]);
        }
    }

    return fillMissingNumbers(child);
}

function mutate(individual) {
    const index1 = Math.floor(Math.random() * 125);
    const index2 = Math.floor(Math.random() * 125);
    [individual[index1], individual[index2]] = [individual[index2], individual[index1]];
}

function geneticAlgorithm(populationSize, generations) {
    let population = initializePopulation(populationSize);
    let bestIndividual = population[0];
    let bestFitness = evaluate(bestIndividual);

    for (let gen = 0; gen < generations; gen++) {
        population.sort((a, b) => evaluate(b) - evaluate(a));

        if (evaluate(population[0]) > bestFitness) {
            bestIndividual = population[0];
            bestFitness = evaluate(bestIndividual);
        }

        const newPopulation = [];
        while (newPopulation.length < populationSize) {
            const parent1 = population[Math.floor(Math.random() * populationSize)];
            const parent2 = population[Math.floor(Math.random() * populationSize)];
            let child = crossover(parent1, parent2);

            if (Math.random() < mutationProbability) {
                mutate(child);
            }

            newPopulation.push(child);
        }

        population = newPopulation;

        console.log(`Generation ${gen + 1}: Best Fitness = ${bestFitness}`);
        if (bestFitness === 109) break; // Jika mencapai 109 garis, berhenti
    }

    return bestIndividual;
}