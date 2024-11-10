const mutationProbability = 0.1; 
document.getElementById('gene').addEventListener('click', () => {
    // Jalankan algoritma stochasticHillClimbing
    const result = geneticAlgorithm(1000,1000);

    // Tampilkan hasil menggunakan fungsi displayResults dari objectiveFunc.js
    displayResults(result, cubeNumbers, 'objectiveChart');
});

function displayResults(result, cubeNumbers, chartId) {
    // Menampilkan grafik objective function
    const ctx = document.getElementById(chartId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: result.scores.map((_, i) => i),
            datasets: [{
                label: 'Objective Function Value',
                data: result.scores,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Iteration' } },
                y: { title: { display: true, text: 'Objective Value' } }
            }
        }
    });

    // Menampilkan hasil di konsol
    console.log("State Awal:", cubeNumbers);
    console.log("State Akhir:", result.finalState);
    console.log("Nilai Objective Function Akhir:", result.finalScore);
    console.log("Durasi Pencarian:", result.duration, "detik");
    console.log("Jumlah Iterasi:", result.iteration);
}



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

function geneticAlgorithm(maxPopulationSize, maxIterations) {
    let population = initializePopulation(10); // Populasi awal dengan 10 individu
    let bestIndividual = population[0];
    let bestFitness = evaluate(bestIndividual);
    let generationCount = 0;
    let scores=[];

    while (generationCount < maxIterations && population.length <= maxPopulationSize) {
        generationCount++;

        // Urutkan populasi berdasarkan fitness terbaik
        population.sort((a, b) => evaluate(b) - evaluate(a));

        // Update individu terbaik jika ada peningkatan
        if (evaluate(population[0]) > bestFitness) {
            bestIndividual = population[0];
            bestFitness = evaluate(bestIndividual);
        }
        scores.push(bestFitness);

        // Pilih dua individu terbaik untuk dijadikan orang tua
        const parent1 = population[0];
        const parent2 = population[1];

        // Hasilkan anak melalui crossover
        let child = crossover(parent1, parent2);

        // Mutasi jika memenuhi probabilitas
        if (Math.random() < mutationProbability) {
            mutate(child);
        }

        // Masukkan anak ke dalam populasi
        population.push(child);

        // Potong populasi agar tidak melebihi maxPopulationSize
        if (population.length > maxPopulationSize) {
            population = population.slice(0, maxPopulationSize);
        }

        console.log(`Generation ${generationCount}: Best Fitness = ${bestFitness}`);
    }

    console.log(`Algorithm stopped after ${generationCount} generations.`);
    return {
    finalState: bestIndividual, // Solusi akhir
        finalScore: bestFitness, // Nilai objective function akhir
        scores, // Semua skor untuk iterasi
        iterations: maxIterations, // Total iterasi yang dijalankan
    };
}

// Fungsi inisialisasi populasi awal acak
function initializePopulation(size) {
    const population = [];
    for (let i = 0; i < size; i++) {
        const individual = Array.from({ length: 125 }, (_, i) => i + 1);
        shuffleArray(individual);
        population.push(individual);
    }
    return population;
}
