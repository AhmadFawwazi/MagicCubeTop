document.getElementById('startStochasticHillClimb').addEventListener('click', () => {
    // Jalankan algoritma stochasticHillClimbing
    const result = stochasticHillClimbing(cubeNumbers);

    // Tampilkan hasil menggunakan fungsi displayResults 
    displayResults(result, cubeNumbers, 'objectiveChart');

});

function stochasticHillClimbing(initialCubeArray) {
    let currentState = [...initialCubeArray];
    let currentScore = evaluate(currentState); // Hitung nilai awal objective function
    let iteration = 0;
    const maxIterations = 1000; // Maksimum iterasi
    const scores = [currentScore];

    const startTime = Date.now(); 
    while (iteration < maxIterations) {
        iteration++;

        // Hasilkan neighbor secara acak
        const randomNeighbor = generateRandomNeighbor(currentState);
        const neighborScore = evaluate(randomNeighbor);

        // Pindah ke neighbor ke lebih baik
        if (neighborScore > currentScore) {
            currentState = randomNeighbor;
            currentScore = neighborScore;
        }

        cubeNumbers = [...currentState]; // Salin state baru ke cubeNumbers
        renderNumbers(); 

        // Simpan skor 
        scores.push(currentScore);

        // kondisi berhenti
        if (iteration == maxIterations || currentScore == 109) {
            console.log("Max iterations reached.");
            break;
        }
    }
    const endTime = Date.now();
    

    return {
        cubeNumbers: initialCubeArray, // state awal
        finalState: currentState, // state akhir
        finalScore: currentScore, // Nilai objective function akhir
        scores, // Semua skor untuk iterasi
        duration : (endTime - startTime) / 1000, // waktu
        iteration: iteration // Total iterasi yang dijalankan
    };
}


function generateRandomNeighbor(cubeArray) {

    const newNeighbor = [...cubeArray];
    const i = Math.floor(Math.random() * cubeArray.length);
    const j = Math.floor(Math.random() * cubeArray.length);

    // Tukar dua elemen secara acak
    [newNeighbor[i], newNeighbor[j]] = [newNeighbor[j], newNeighbor[i]];

    return newNeighbor;
}

