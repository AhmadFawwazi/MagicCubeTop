document.getElementById('startStochasticHillClimb').addEventListener('click', () => {
    // Jalankan algoritma stochasticHillClimbing
    const result = stochasticHillClimbing(cubeNumbers);

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

function stochasticHillClimbing(initialCubeArray) {
    let currentState = [...initialCubeArray];
    let currentScore = evaluate(currentState); // Hitung nilai awal objective function
    let iteration = 0;
    const maxIterations = 1000; // Maksimum iterasi
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
