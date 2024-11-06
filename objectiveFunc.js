// Tentukan ordo kubus dan Magic Number
const size = 5;
const magicNumber = 315;
const totalLines = 109; // Total garis yang harus sesuai dengan Magic Number

// Fungsi untuk menghitung objective function
function evaluate(cube) {
    let matchingLines = 0;

    // Periksa semua baris dan kolom pada setiap layer
    for (let layer = 0; layer < size; layer++) {
        for (let i = 0; i < size; i++) {
            // Hitung jumlah pada setiap baris
            let rowSum = 0;
            for (let j = 0; j < size; j++) {
                rowSum += cube[layer][i][j];
            }
            if (rowSum === magicNumber) matchingLines++;

            // Hitung jumlah pada setiap kolom
            let colSum = 0;
            for (let j = 0; j < size; j++) {
                colSum += cube[layer][j][i];
            }
            if (colSum === magicNumber) matchingLines++;
        }
    }

    // Periksa dua diagonal dalam setiap layer
    for (let layer = 0; layer < size; layer++) {
        let mainDiagonalSum = 0;
        let secondaryDiagonalSum = 0;
        for (let i = 0; i < size; i++) {
            mainDiagonalSum += cube[layer][i][i];
            secondaryDiagonalSum += cube[layer][i][size - i - 1];
        }
        if (mainDiagonalSum === magicNumber) matchingLines++;
        if (secondaryDiagonalSum === magicNumber) matchingLines++;
    }

    // Periksa tiang (baris vertikal melalui layer-layer)
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let pillarSum = 0;
            for (let layer = 0; layer < size; layer++) {
                pillarSum += cube[layer][i][j];
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
        spaceDiagonal1 += cube[i][i][i];
        spaceDiagonal2 += cube[i][i][size - i - 1];
        spaceDiagonal3 += cube[i][size - i - 1][i];
        spaceDiagonal4 += cube[i][size - i - 1][size - i - 1];
    }
    if (spaceDiagonal1 === magicNumber) matchingLines++;
    if (spaceDiagonal2 === magicNumber) matchingLines++;
    if (spaceDiagonal3 === magicNumber) matchingLines++;
    if (spaceDiagonal4 === magicNumber) matchingLines++;

    // Nilai objective function adalah jumlah garis yang mencapai Magic Number
    return matchingLines;
}