function steepestAscentHillClimbing(initialCubeArray) {
    let currentState = [...initialCubeArray];  // Salin array 1D
    let currentScore = evaluate(currentState);  // Nilai awal dari objective function
    let iteration = 0;
    const scores = [currentScore];
    const startTime = Date.now();

    while (true) {
        iteration++;

        // Hasilkan semua tetangga dari solusi saat ini
        const neighbors = generateNeighbors(currentState);

        // Cari tetangga terbaik
        let bestNeighbor = null;
        let bestScore = Infinity;
        neighbors.forEach(neighbor => {
            const score = evaluate(neighbor);
            if (score < bestScore) {
                bestScore = score;
                bestNeighbor = neighbor;
            }
        });

        scores.push(bestScore);

        // Jika tidak ada perbaikan, hentikan
        if (bestScore >= currentScore) {
            break;
        }

        // Perbarui state dan score
        currentState = bestNeighbor;
        currentScore = bestScore;
    }

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000; // Dalam detik

    return {
        finalState: currentState,
        finalScore: currentScore,
        scores,
        duration,
        iteration
    };
}


// Fungsi untuk membuat tetangga dari array cube
function generateNeighbors(cubeArray) {
    const neighbors = [];
    for (let i = 0; i < cubeArray.length; i++) {
        for (let j = i + 1; j < cubeArray.length; j++) {
            const newNeighbor = [...cubeArray];
            [newNeighbor[i], newNeighbor[j]] = [newNeighbor[j], newNeighbor[i]]; // Tukar dua elemen
            neighbors.push(newNeighbor);
        }
    }
    return neighbors;
}

