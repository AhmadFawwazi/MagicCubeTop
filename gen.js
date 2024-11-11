const mutateProb = 0.1; 

document.getElementById('gene').addEventListener('click', () => {
    //block biar ga muncul yg annealling
    document.getElementById('deltaET').style.display = 'none';
    document.getElementById('frequencyStuck').style.display = 'none';
    
    var maxIter = prompt("Masukkan angka untuk maks iterasi");
    var maxPop = prompt("masukkan angka untuk maks populasi :")
    const result = geneticAlgorithm(maxPop,maxIter);
    cubeNumbers = result.finalState;
    renderNumbers();

    // buat visualisasi
    displayResults(result, cubeNumbers, 'objectiveChart');
    document.getElementById('populValue').textContent = result.lengthpop;
    console.log("Jumlah Individu Populasi yang terbentuk : ", result.lengthpop);
    
});



function MissingNum(child) {
    const numbers = [];
        for (let j = 1; j <= 125; j++) {
            numbers.push(j);
        }

    const numberUse = [];
    child.forEach(num => {
        if (num !== null) {
            numberUse.push(num);
        }
    });

    const filterNum = [];
    for (let i = 0; i < numbers.length; i++) {
        let isUse = false;
        for (let j = 0; j < numberUse.length; j++) {
            if (numbers[i] === numberUse[j]){
                isUse = true;
                break;
            }
        }
        if (!isUse) {
            filterNum.push(numbers[i]);
        }
    }

    for (let i = 0; i < child.length; i++) {
        if (child[i] === null) {
            child[i] = filterNum.pop();
        }
    }
    return child;
}

function crossover(parent1, parent2) {
    const child = Array(125).fill(null);
    const crossPoint = Math.floor(Math.random() * 125);
    const useNumber = [];

    for (let i = 0; i < crossPoint; i++) {
        child[i] = parent1[i];
        useNumber.push(parent1[i]); 
    }
    for (let i = crossPoint; i < 125; i++) {
        let isUse = false;
        
        for (let j = 0; j < useNumber.length; j++) {
            if (useNumber[j] === parent2[i]) {
                isUse = true;
                break;
            }
        }
        if (!isUse) {
            child[i] = parent2[i];
            useNumber.push(parent2[i]);
        }
    }
    return  MissingNum(child);
}

function mutate(individual) {
    const index1 = Math.floor(Math.random() * 125);
    const index2 = Math.floor(Math.random() * 125);
    let i = individual[index1];
    individual[index1] = individual[index2];
    individual[index2] = i;
}

function geneticAlgorithm(maxPop, maxIteration) {
    let population = initPopulation(10); 
    let startPop = population[0];
    let bestIndividual = population[0];
    let bestFitness = evaluate(bestIndividual);
    let generationCount = 0;
    let scores=[];
    const start = Date.now();

    while (generationCount < maxIteration && population.length <= maxPop) {
        generationCount++;
        population.sort(function(a, b) {
            return evaluate(b) - evaluate(a);
        });

        if (evaluate(population[0]) > bestFitness) {
            bestIndividual = population[0];
            bestFitness = evaluate(bestIndividual);
        }
        scores.push(bestFitness);

        const parent1 = population[0];
        const parent2 = population[1];
        let child = crossover(parent1, parent2);

        if (Math.random() < mutateProb) {
            mutate(child);
        }
        population.push(child);

        if (population.length >= maxPop || bestFitness == 109) {
            break;
        }

        console.log(`Generation ${generationCount}: Best Fitness = ${bestFitness}`);
    }
    const end = Date.now();
    const durations = (end - start) / 1000;
    console.log(`Algorithm stopped after ${generationCount} generations.`);
    return {
        initialState: startPop, // State solusi awal
        finalState: bestIndividual, // State Solusi akhir
        finalScore: bestFitness, // Nilai objective function akhir
        scores, // Semua nilai obj per iterasi
        duration:durations,
        iteration:generationCount,
        lengthpop: population.length,
    };
}


function initPopulation(size) {
    const population = [];
    for (let i = 0; i < size; i++) {
        const individual = [];
        for (let j = 1; j <= 125; j++) {
            individual.push(j);
        }
        shuffleArray(individual);
        population.push(individual);
    }
    return population;
}
