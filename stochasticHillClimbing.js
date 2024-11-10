document.getElementById('startStochasticHillClimb').addEventListener('click', () => {
    // Jalankan algoritma stochasticHillClimbing
    const result = stochasticHillClimbing(cubeNumbers);

    // Tampilkan hasil menggunakan fungsi displayResults dari objectiveFunc.js
    displayResults(result, cubeNumbers, 'objectiveChart');

});

function stochasticHillClimbing(initialCubeArray) {
    let currentState = [...initialCubeArray];
    let currentScore = evaluate(currentState); // Hitung nilai awal objective function
    let iteration = 0;
    const maxIterations = 10000; // Maksimum iterasi
    const scores = [currentScore];

    while (iteration < maxIterations) {
        iteration++;

        // Hasilkan neighbor secara acak
        const randomNeighbor = generateRandomNeighbor(currentState);
        const neighborScore = evaluate(randomNeighbor);

        // Jika neighbor lebih baik, pindah ke neighbor
        if (neighborScore > currentScore) {
            currentState = randomNeighbor;
            currentScore = neighborScore;
        }

        cubeNumbers = [...currentState]; // Salin state baru ke cubeNumbers
        renderNumbers(); 

        // Simpan skor untuk visualisasi
        scores.push(currentScore);

        // Jika tidak ada neighbor lebih baik (local optimum), berhenti
        if (iteration === maxIterations) {
            console.log("Max iterations reached.");
            break;
        }
    }

    return {
        finalState: currentState, // Solusi akhir
        finalScore: currentScore, // Nilai objective function akhir
        scores, // Semua skor untuk iterasi
        iterations: iteration // Total iterasi yang dijalankan
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
