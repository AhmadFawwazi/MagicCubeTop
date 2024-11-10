function steepestAscentHillClimbing(initialCubeArray) {
    // Inisialisasi state awal dan objective function
    let currentState = [...initialCubeArray];
    let currentScore = evaluate(currentState); // Hitung score awal
    let iteration = 0;
    const scores = [currentScore];  // Array untuk menyimpan score di setiap iterasi
    const startTime = Date.now();

    // Looping untuk pencarian state terbaik
    while (true) {
        iteration++;

        // Temukan tetangga terbaik (highest-valued neighbor)
        const bestNeighbor = findBestNeighbor(currentState);
        const bestNeighborScore = evaluate(bestNeighbor);

        // Jika nilai tetangga terbaik tidak lebih baik dari current state, hentikan
        if (bestNeighborScore >= currentScore) {
            break; // Puncak lokal tercapai, tidak ada perbaikan
        }

        // Update current state dan score dengan bestNeighbor
        currentState = bestNeighbor;
        currentScore = bestNeighborScore;
        scores.push(currentScore);
    }

    // Hitung durasi pencarian
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    // Kembalikan hasil pencarian
    return {
        initialState: initialCubeArray,
        finalState: currentState,
        finalScore: currentScore,
        scores,
        duration,
        iteration
    };
}

// Fungsi untuk menemukan tetangga terbaik (highest-valued neighbor)
function findBestNeighbor(cubeArray) {
    let bestScore = Infinity;
    let bestNeighbor = [...cubeArray];

    for (let i = 0; i < cubeArray.length; i++) {
        for (let j = i + 1; j < cubeArray.length; j++) {
            // Buat tetangga dengan menukar elemen ke-i dan ke-j
            const neighbor = [...cubeArray];
            [neighbor[i], neighbor[j]] = [neighbor[j], neighbor[i]];
            const score = evaluate(neighbor);

            // Pilih tetangga dengan score terendah (minimizing cost)
            if (score < bestScore) {
                bestScore = score;
                bestNeighbor = neighbor;
            }
        }
    }

    return bestNeighbor;
}
