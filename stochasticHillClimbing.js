function steepestAscentHillClimbing(initialCubeArray) {
    let currentState = [...initialCubeArray];  // Salin array 1D
    let currentScore = evaluate(currentState);  // Nilai awal dari objective function
    let iteration = 0;
    const scores = [currentScore];
    const startTime = Date.now();

    while (true) {
        iteration++;
    
        // Hasilkan tetangga secara acak
        const randomNeighbor = generateRandomNeighbor(currentState);
        const neighborScore = evaluate(randomNeighbor);
    
        // Simpan skor terbaik 
        scores.push(neighborScore);
    
        // menerima solusi baru
        if (neighborScore < currentScore || Math.random() < 0.1) { // 10% probabilitas menerima solusi lebih buruk
            currentState = randomNeighbor;
            currentScore = neighborScore;
        }
    
        // Jika tidak ada perbaikan 
        if (scores.length > 100 && scores[scores.length - 1] >= scores[scores.length - 100]) {
            break;
        }
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

