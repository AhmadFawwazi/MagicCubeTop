document.getElementById('startSteepestAscentHillClimb').addEventListener('click', () => {
    //block biar ga muncul yg annealling
    document.getElementById('deltaET').style.display = 'none';
    document.getElementById('frequencyStuck').style.display = 'none';

    // Jalankan algoritma stochasticHillClimbing
    const result = steepestAscentHillClimbing(cubeNumbers);

    // Tampilkan hasil menggunakan fungsi displayResults dari objectiveFunc.js
    displayResults(result, cubeNumbers, 'objectiveChart');

});

function steepestAscentHillClimbing(initialCubeArray) {
    let currentState = [...initialCubeArray];
    let currentScore = evaluate(currentState); // Hitung nilai awal objective function
    let iteration = 0;
    const maxIterations = 1000; // Maksimum iterasi
    const scores = [currentScore];

    const steepeststartTime = Date.now();

    while (iteration < maxIterations) {
        iteration++;

        // Hasilkan semua neighbor
        const neighbors = steepestgenerateRandomNeighbor(currentState);

        // Cari neighbor dengan score terbaik
        let bestNeighbor = null;
        let bestScore = currentScore; // Awalnya set ke score saat ini

        for (const neighbor of neighbors) {
            const neighborScore = evaluate(neighbor);
            if (neighborScore > bestScore) {
                bestScore = neighborScore;
                bestNeighbor = neighbor;
            }
        }

        // Jika ada neighbor lebih baik, pindah ke neighbor tersebut
        if (bestNeighbor !== null) {
            currentState = bestNeighbor;
            currentScore = bestScore;

            // Perbarui tampilan UI
            cubeNumbers = [...currentState];
            renderNumbers();
        } else {
            // Tidak ada neighbor lebih baik, berhenti
            console.log("Local optimum reached at iteration:", iteration);
            break;
        }

        // Simpan skor untuk visualisasi
        scores.push(currentScore);
    }

    const steepestendTime = Date.now();

    console.log("Final Iteration Reached:", iteration);

    return {
        initialState: initialCubeArray,
        finalState: currentState, // Solusi akhir
        finalScore: currentScore, // Nilai objective function akhir
        scores, // Semua skor untuk iterasi
        duration: (steepestendTime - steepeststartTime) / 1000,
        iteration: iteration // Total iterasi yang dijalankan
    };
}


function steepestgenerateRandomNeighbor(cubeArray) {
    const neighbors = [];

    // Iterasi melalui semua pasangan elemen
    for (let i = 0; i < cubeArray.length; i++) {
        for (let j = i + 1; j < cubeArray.length; j++) {
            const newNeighbor = [...cubeArray];
            [newNeighbor[i], newNeighbor[j]] = [newNeighbor[j], newNeighbor[i]]; // Tukar elemen
            neighbors.push(newNeighbor); // Tambahkan ke daftar neighbor
        }
    }

    return neighbors;
}