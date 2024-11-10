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
    const maxIterations = 1000; // Maksimum iterasi
    const scores = [currentScore];

    const startTime = Date.now(); 
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
        if (iteration == maxIterations || currentScore == 109) {
            console.log("Max iterations reached.");
            break;
        }
    }
    const endTime = Date.now();
    

    return {
        cubeNumbers: initialCubeArray,
        finalState: currentState, // Solusi akhir
        finalScore: currentScore, // Nilai objective function akhir
        scores, // Semua skor untuk iterasi
        duration : (endTime - startTime) / 1000,
        iteration: iteration // Total iterasi yang dijalankan
    };
}


function generateRandomNeighbor(cubeArray) {

    const newNeighbor = [...cubeArray];
    const i = Math.floor(Math.random() * (cubeArray.length + 1));
    const j = Math.floor(Math.random() * (cubeArray.length + 1));

    // Tukar dua elemen secara acak
    [newNeighbor[i], newNeighbor[j]] = [newNeighbor[j], newNeighbor[i]];

    return newNeighbor;
}


// function stochasticHillClimbing(initialCubeArray) {
//     let currentState = [...initialCubeArray];
//     let currentScore = evaluate(currentState); // Hitung nilai awal objective function
//     let iteration = 0;
//     const maxIterations = 1000; // Maksimum iterasi
//     const scores = [currentScore];

//     while (iteration < maxIterations) {
//         iteration++;

//         // Hasilkan semua neighbor
//         const neighbors = generateRandomNeighbor(currentState);

//         // Cari neighbor dengan score terbaik
//         let bestNeighbor = null;
//         let bestScore = currentScore; // Awalnya set ke score saat ini

//         for (const neighbor of neighbors) {
//             const neighborScore = evaluate(neighbor);
//             if (neighborScore > bestScore) {
//                 bestScore = neighborScore;
//                 bestNeighbor = neighbor;
//             }
//         }

//         // Jika ada neighbor lebih baik, pindah ke neighbor tersebut
//         if (bestNeighbor !== null) {
//             currentState = bestNeighbor;
//             currentScore = bestScore;

//             // Perbarui tampilan UI
//             cubeNumbers = [...currentState];
//             renderNumbers();
//         } else {
//             // Tidak ada neighbor lebih baik, berhenti
//             console.log("Local optimum reached at iteration:", iteration);
//             break;
//         }

//         // Simpan skor untuk visualisasi
//         scores.push(currentScore);
//     }

//     console.log("Final Iteration Reached:", iteration);

//     return {
//         cubeNumbers: initialCubeArray,
//         finalState: currentState, // Solusi akhir
//         finalScore: currentScore, // Nilai objective function akhir
//         scores, // Semua skor untuk iterasi
//         iteration: iteration // Total iterasi yang dijalankan
//     };
// }


// function generateRandomNeighbor(cubeArray) {
//     const neighbors = [];

//     // Iterasi melalui semua pasangan elemen
//     for (let i = 0; i < cubeArray.length; i++) {
//         for (let j = i + 1; j < cubeArray.length; j++) {
//             const newNeighbor = [...cubeArray];
//             [newNeighbor[i], newNeighbor[j]] = [newNeighbor[j], newNeighbor[i]]; // Tukar elemen
//             neighbors.push(newNeighbor); // Tambahkan ke daftar neighbor
//         }
//     }

//     return neighbors;
// }