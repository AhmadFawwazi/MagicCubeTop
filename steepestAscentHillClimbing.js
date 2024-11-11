document.getElementById('startSteepestAscentHillClimb').addEventListener('click', () => {
    //block biar ga muncul yg annealling
    document.getElementById('deltaET').style.display = 'none';
    document.getElementById('frequencyStuck').style.display = 'none';

    // Jalankan algoritma stochasticHillClimbing
document.getElementById('startSteepestAscentHillClimb').addEventListener('click', () =>
    {
    // menjalankan algoritma stochasticHillClimbing
    const result = steepestAscentHillClimbing(cubeNumbers);
    displayResults(result, cubeNumbers, 'objectiveChart');
    });

function steepestAscentHillClimbing(initialCubeArray) 
{
    let currentState = [...initialCubeArray];
    let currentScore = evaluate(currentState); // Menghitung nilai objective function pada current state
    let iterasi = 0;
    const maxiterasis = 1000; 
    const scores = [currentScore];

    const steepeststartTime = Date.now();

    while (iterasi < maxiterasis) 
    {
        iterasi = iterasi + 1;

        // menghasilkan semua neighbor yang ada
        const neighbors = steepestgenerateRandomNeighbor(currentState);

        // mencari neighbor dengan score terbaik
        let bestNeighbor = null;
        let bestScore = currentScore; 

        for (const neighbor of neighbors) 
        {
            const neighborScore = evaluate(neighbor);
            if (neighborScore > bestScore) 
            {
                bestScore = neighborScore;
                bestNeighbor = neighbor;
            }
        }

        // Jika ada neighbor dengan objective function lebih baik, current state pindah ke neighbor tersebut
        if (bestNeighbor !== null) 
        {
            currentState = bestNeighbor;
            currentScore = bestScore;

            cubeNumbers = [...currentState];
            renderNumbers();
        } 
        else 
        {
            // jika tidak ada neighbor lebih baik, berhenti iterasi
            console.log("Local optimum tercapai pada: ", iterasi);
            break;
        }
        // menyimpan nilai objective function
        scores.push(currentScore);
    }

    const steepestendTime = Date.now();

    console.log("Iterasi final pada: ", iterasi);

    return {
        initialState: initialCubeArray,
        finalState: currentState, // current state final
        finalScore: currentScore, // Nilai objective function akhir
        scores, // Semua skor untuk iterasi
        duration: (steepestendTime - steepeststartTime) / 1000,
        iteration: iterasi // Total iterasi yang dijalankan
    };
}


function steepestgenerateRandomNeighbor(cubeArray) 
{
    const neighbors = [];
    // Iterasi melalui semua pasangan elemen
    for (let i = 0; i < cubeArray.length; i++) 
    {
        for (let j = i + 1; j < cubeArray.length; j++) 
        {
            const newNeighbor = [...cubeArray];
            [newNeighbor[i], newNeighbor[j]] = [newNeighbor[j], newNeighbor[i]]; // Tukar elemen
            neighbors.push(newNeighbor); // Tambahkan ke daftar neighbor
        }
    }

    return neighbors;
}