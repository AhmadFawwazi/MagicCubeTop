document.getElementById('startSimulatedAnnealing').addEventListener('click', () => { 
    //buat nampilin deltaet dan freq stuckiter
    document.getElementById('deltaETValues').style.display = 'block';
    document.getElementById('populValue').style.display = 'none';

    const result = simulatedAnnealing(cubeNumbers);
    displayResults(result, cubeNumbers, 'objectiveChart');
    document.getElementById('stuckValue').textContent = result.stuckIterations;
});

function simulatedAnnealing(initialCubeArray) {
    let currentState = [...initialCubeArray];
    let currentScore = evaluate(currentState); 
    let temperature = 1000; 
    const coolingRate = 0.999; 
    const maxIterations = 5000; 
    const scores = [currentScore];
    const deltaETValues = [];
    const stuckThreshold = 50;
    let stuckCounter = 0; 
    const stuckIterations = [];
    const optimalScore = 109;

    let iteration = 0;
    const simulatedannealingStartTime = Date.now();

    if (currentScore === optimalScore) {
        console.log("Cube adalah magic sube sempurna dari awal jadi tidak usah dicari lagi.");
        return {
            finalState: currentState,
            finalScore: currentScore,
            scores,
            deltaETValues,
            stuckIterations,
            duration: 0,
            iteration: 0
        };
    }


    while (iteration < maxIterations) {
        iteration++;

        const randomNeighbor = generateRandomNeighbor(currentState);
        const neighborScore = evaluate(randomNeighbor);
        const deltaE = neighborScore - currentScore;
        const deltaET = Math.exp(deltaE / temperature);

        if (deltaE > 0 || deltaET > Math.random()) {
            currentState = randomNeighbor;
            currentScore = neighborScore;
           
        }
        else {
            stuckCounter++; 
            
        }

        cubeNumbers = [...currentState];
        renderNumbers(); 

        scores.push(currentScore);

         // Simpan hanya deltaET yang signifikan
        if (deltaET !== 1 && deltaET > 1e-10) {
            deltaETValues.push(deltaET);
        }

        if (stuckCounter >= stuckThreshold) {
            stuckIterations.push(iteration);
            stuckCounter = 0; 
        }
        temperature *= coolingRate;
        

        if (temperature < 1e-10) {
            break;
        }
    }
    
    const simulatedannealingEndTime = Date.now();

    return {
        initialState: initialCubeArray,
        finalState: currentState,
        finalScore: currentScore, 
        scores, 
        duration: (simulatedannealingEndTime - simulatedannealingStartTime) / 1000,
        deltaETValues, 
        stuckIterations : stuckCounter, 
        iteration: iteration 
    };
}

function generateRandomNeighbor(cubeArray) {
    const newNeighbor = [...cubeArray];
    const i = Math.floor(Math.random() * cubeArray.length);
    const j = Math.floor(Math.random() * cubeArray.length);

    [newNeighbor[i], newNeighbor[j]] = [newNeighbor[j], newNeighbor[i]];

    return newNeighbor;
}