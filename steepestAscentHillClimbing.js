// function steepestAscentHillClimbing(initialCubeArray) {
//     // Inisialisasi state awal dan objective function
//     let currentState = [...initialCubeArray];
//     let currentScore = evaluate(currentState); // Hitung score awal
//     let iteration = 0;
//     const scores = [currentScore];  // Array untuk menyimpan score di setiap iterasi
//     const startTime = Date.now();

//     // Looping untuk pencarian state terbaik
//     while (true) {
//         iteration++;

//         // Temukan tetangga terbaik (highest-valued neighbor)
//         const bestNeighbor = findBestNeighbor(currentState);
//         const bestNeighborScore = evaluate(bestNeighbor);

//         // Jika nilai tetangga terbaik tidak lebih baik dari current state, hentikan
//         if (bestNeighborScore >= currentScore) {
//             break; // Puncak lokal tercapai, tidak ada perbaikan
//         }

//         // Update current state dan score dengan bestNeighbor
//         currentState = bestNeighbor;
//         currentScore = bestNeighborScore;
//         scores.push(currentScore);
//     }

//     // Hitung durasi pencarian
//     const endTime = Date.now();
//     const duration = (endTime - startTime) / 1000;

//     // Kembalikan hasil pencarian
//     return {
//         initialState: initialCubeArray,
//         finalState: currentState,
//         finalScore: currentScore,
//         scores,
//         duration,
//         iteration
//     };
// }

// // Fungsi untuk menemukan tetangga terbaik (highest-valued neighbor)
// function findBestNeighbor(cubeArray) {
//     let bestScore = Infinity;
//     let bestNeighbor = [...cubeArray];

//     for (let i = 0; i < cubeArray.length; i++) {
//         for (let j = i + 1; j < cubeArray.length; j++) {
//             // Buat tetangga dengan menukar elemen ke-i dan ke-j
//             const neighbor = [...cubeArray];
//             [neighbor[i], neighbor[j]] = [neighbor[j], neighbor[i]];
//             const score = evaluate(neighbor);

//             // Pilih tetangga dengan score terendah (minimizing cost)
//             if (score < bestScore) {
//                 bestScore = score;
//                 bestNeighbor = neighbor;
//             }
//         }
//     }

//     return bestNeighbor;
// }







/////////////////////

// document.getElementById('startSteepestHillClimb').addEventListener('click', () => {
//     // Jalankan algoritma steepestAscentHillClimbing
//     const result = steepestAscentHillClimbing(cubeNumbers);

//     // Tampilkan hasil menggunakan fungsi displayResults dari objectiveFunc.js
//     displayResults(result, cubeNumbers, 'objectiveChart');
// });

/////////////////////
function steepestAscentHillClimbing(initialCubeArray) {
    let currentState = [...initialCubeArray];
    let currentScore = evaluate(currentState); // Hitung nilai awal objective function
    let iteration = 0;
    const maxIterations = 1000; // Maksimum iterasi
    const scores = [currentScore];

    while (iteration < maxIterations) {
        iteration++;

        // Hasilkan semua neighbor
        const neighbors = generateRandomNeighbor(currentState);

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

    console.log("Final Iteration Reached:", iteration);

    return {
        finalState: currentState, // Solusi akhir
        finalScore: currentScore, // Nilai objective function akhir
        scores, // Semua skor untuk iterasi
        iterations: iteration // Total iterasi yang dijalankan
    };
}
////////////////////////////


function generateRandomNeighbor(cubeArray) {
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