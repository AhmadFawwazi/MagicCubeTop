document.getElementById('startSimulatedAnnealing').addEventListener('click', () => { 
    const result = simulatedAnnealing(cubeNumbers);

    displayResults(result, cubeNumbers, 'objectiveChart');
});

function simulatedAnnealing(initialCubeArray) {
    let currentState = [...initialCubeArray];
    let currentScore = evaluate(currentState); 
    let temperature = 1000; 
    const coolingRate = 0.99; 
    const maxIterations = 10000; 
    const scores = [currentScore];
    const deltaETValues = [];
    const stuckThreshold = 50;
    let stuckCounter = 0; 
    const stuckIterations = [];
    const optimalScore = 109;

    let iteration = 0;
    const startTime = Date.now();

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

        if (deltaE > 0 || Math.exp(deltaE / temperature) > Math.random()) {
            currentState = randomNeighbor;
            currentScore = neighborScore;
            stuckCounter = 0; 
        } else {
            stuckCounter++; 
        }

        cubeNumbers = [...currentState];
        renderNumbers(); 

        scores.push(currentScore);
        deltaETValues.push(Math.exp(deltaE / temperature));

        if (stuckCounter >= stuckThreshold) {
            stuckIterations.push(iteration);
            stuckCounter = 0; 
        }

        temperature *= coolingRate;

        if (temperature < 1e-3) {
            console.log("Temperature threshold reached or optimal solution maintained. Ending process.");
            break;
        }
    }
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    return {
        initialState: initialCubeArray,
        finalState: currentState,
        finalScore: currentScore, 
        scores, 
        deltaETValues, 
        stuckIterations, 
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
