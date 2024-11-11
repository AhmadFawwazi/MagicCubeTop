// Tentukan ordo kubus dan Magic Number
const size = 5;
const magicNumber = 315;
const totalLines = 109; // Total garis yang harus sesuai dengan Magic Number

// Fungsi untuk menghitung objective function dari array 1D
function evaluate(cubeArray) {
    let matchingLines = 0;

    // Fungsi untuk mengakses elemen dalam array 1D sesuai layer, baris, dan kolom
    function getValue(layer, row, col) {
        return cubeArray[layer * 25 + row * 5 + col];
    }

    // Periksa semua baris dan kolom pada setiap layer
    for (let layer = 0; layer < size; layer++) {
        for (let i = 0; i < size; i++) {
            // Hitung jumlah pada setiap baris
            let rowSum = 0;
            for (let j = 0; j < size; j++) {
                rowSum += getValue(layer, i, j);
            }
            if (rowSum === magicNumber) matchingLines++;

            // Hitung jumlah pada setiap kolom
            let colSum = 0;
            for (let j = 0; j < size; j++) {
                colSum += getValue(layer, j, i);
            }
            if (colSum === magicNumber) matchingLines++;
        }
    }

   

    // Periksa tiang (baris vertikal melalui layer-layer)
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let pillarSum = 0;
            for (let layer = 0; layer < size; layer++) {
                pillarSum += getValue(layer, i, j);
            }
            if (pillarSum === magicNumber) matchingLines++;
        }
    }

    // Periksa empat triagonal (diagonal ruang 3D)
    let spaceDiagonal1 = 0;
    let spaceDiagonal2 = 0;
    let spaceDiagonal3 = 0;
    let spaceDiagonal4 = 0;

    for (let i = 0; i < size; i++) {
        spaceDiagonal1 += getValue(i, i, i);
        spaceDiagonal2 += getValue(i, i, size - i - 1);
        spaceDiagonal3 += getValue(i, size - i - 1, i);
        spaceDiagonal4 += getValue(i, size - i - 1, size - i - 1);
    }
    if (spaceDiagonal1 === magicNumber) matchingLines++;
    if (spaceDiagonal2 === magicNumber) matchingLines++;
    if (spaceDiagonal3 === magicNumber) matchingLines++;
    if (spaceDiagonal4 === magicNumber) matchingLines++;

    for (let layer = 0; layer < size; layer++) {
        // Face diagonals pada XY-plane (per layer Z)
        let faceDiagonalXY1 = 0;
        let faceDiagonalXY2 = 0;
        for (let i = 0; i < size; i++) {
            faceDiagonalXY1 += getValue(layer, i, i);              
            faceDiagonalXY2 += getValue(layer, i, size - i - 1);   
        }
        if (faceDiagonalXY1 === magicNumber) matchingLines++;
        if (faceDiagonalXY2 === magicNumber) matchingLines++;

        // Face diagonals pada XZ-plane (per layer Y)
        let faceDiagonalXZ1 = 0;
        let faceDiagonalXZ2 = 0;
        for (let i = 0; i < size; i++) {
            faceDiagonalXZ1 += getValue(i, layer, i);              
            faceDiagonalXZ2 += getValue(i, layer, size - i - 1);   
        }
        if (faceDiagonalXZ1 === magicNumber) matchingLines++;
        if (faceDiagonalXZ2 === magicNumber) matchingLines++;

        // Face diagonals pada YZ-plane (per layer X)
        let faceDiagonalYZ1 = 0;
        let faceDiagonalYZ2 = 0;
        for (let i = 0; i < size; i++) {
            faceDiagonalYZ1 += getValue(i, i, layer);            
            faceDiagonalYZ2 += getValue(size - i - 1, i, layer);   
        }
        if (faceDiagonalYZ1 === magicNumber) matchingLines++;
        if (faceDiagonalYZ2 === magicNumber) matchingLines++;
    }


    return matchingLines;
}

let chartInstance = null;

function displayResults(result, cubeNumbers, chartId) {
    const ctx = document.getElementById(chartId).getContext('2d');

    // Jika ada instance chart sebelumnya, hancurkan terlebih dahulu
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Buat chart baru dan simpan di chartInstance
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: result.scores.map((_, i) => i + 1),
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

    document.getElementById('finalScoreValue').textContent = result.finalScore;
    document.getElementById('iterationValue').textContent = result.iteration;
    document.getElementById('durationValue').textContent = result.duration;
    document.getElementById('valueAwal').textContent = result.initialState;
    document.getElementById('valueAkhir').textContent = result.finalState;

    // Menampilkan hasil di konsol
    console.log("State Awal:", result.initialState);
    console.log("State Akhir:", result.finalState);
    console.log("Nilai Objective Function Akhir:", result.finalScore);
    console.log("Durasi Pencarian:", result.duration, "detik");
    console.log("Jumlah Iterasi:", result.iteration);
}


