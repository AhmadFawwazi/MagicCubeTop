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

    let iteration = 0;

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
            console.log("Temperature threshold reached. Ending process.");
            break;
        }
    }

    return {
        finalState: currentState,
        finalScore: currentScore, 
        scores, 
        deltaETValues, 
        stuckIterations, 
        iterations: iteration 
    };
}

function generateRandomNeighbor(cubeArray) {
    const newNeighbor = [...cubeArray];
    const i = Math.floor(Math.random() * cubeArray.length);
    const j = Math.floor(Math.random() * cubeArray.length);

    [newNeighbor[i], newNeighbor[j]] = [newNeighbor[j], newNeighbor[i]];

    return newNeighbor;
}
