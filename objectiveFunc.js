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

    // Periksa dua diagonal dalam setiap layer
    for (let layer = 0; layer < size; layer++) {
        let mainDiagonalSum = 0;
        let secondaryDiagonalSum = 0;
        for (let i = 0; i < size; i++) {
            mainDiagonalSum += getValue(layer, i, i);
            secondaryDiagonalSum += getValue(layer, i, size - i - 1);
        }
        if (mainDiagonalSum === magicNumber) matchingLines++;
        if (secondaryDiagonalSum === magicNumber) matchingLines++;
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

    // Periksa face diagonals pada semua wajah kubus
    for (let i = 0; i < size; i++) {
        // Face diagonals pada baris (dari depan ke belakang di setiap kolom)
        let faceDiagonal1 = 0;
        let faceDiagonal2 = 0;
        for (let j = 0; j < size; j++) {
            faceDiagonal1 += getValue(j, i, j);             // Kiri atas ke kanan bawah pada wajah baris
            faceDiagonal2 += getValue(j, i, size - j - 1);  // Kanan atas ke kiri bawah pada wajah baris
        }
        if (faceDiagonal1 === magicNumber) matchingLines++;
        if (faceDiagonal2 === magicNumber) matchingLines++;

        // Face diagonals pada kolom (dari depan ke belakang di setiap baris)
        let faceDiagonal3 = 0;
        let faceDiagonal4 = 0;
        for (let j = 0; j < size; j++) {
            faceDiagonal3 += getValue(j, j, i);             // Kiri atas ke kanan bawah pada wajah kolom
            faceDiagonal4 += getValue(j, size - j - 1, i);  // Kanan atas ke kiri bawah pada wajah kolom
        }
        if (faceDiagonal3 === magicNumber) matchingLines++;
        if (faceDiagonal4 === magicNumber) matchingLines++;
    }

    return matchingLines;
}
