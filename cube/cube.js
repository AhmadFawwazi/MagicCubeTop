// script.js
const cube = document.getElementById('cube');

const boxSize = 50; // Ukuran tiap kotak kecil
const spacing = 5; // Jarak antar kotak kecil
const gridSize = 5; // 5x5x5 grid

let boxCounter = 1; // Menghitung total kotak kecil untuk referensi nomor

for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
            // Buat elemen kotak kecil (small-cube)
            const smallCube = document.createElement('div');
            smallCube.classList.add('small-cube');
            // Tambahkan 6 sisi pada setiap small-cube
            const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
            faces.forEach((face) => {
                const faceElement = document.createElement('div');
                faceElement.classList.add('face', face);
                
                // Set nomor unik yang sama pada semua sisi
                faceElement.textContent = boxCounter;
                smallCube.appendChild(faceElement);
            });

            
            // Hitung posisi setiap kubus kecil di dalam grid 5x5x5
            const offsetX = x * (boxSize + spacing) - ((gridSize - 1) * (boxSize + spacing)) / 2;
            const offsetY = y * (boxSize + spacing) - ((gridSize - 1) * (boxSize + spacing)) / 2;
            const offsetZ = z * (boxSize + spacing) - ((gridSize - 1) * (boxSize + spacing)) / 2;

            // Atur posisi kubus kecil dengan transformasi 3D
            smallCube.style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${offsetZ}px)`;

            // Tambahkan small-cube ke dalam elemen cube utama
            cube.appendChild(smallCube);
            boxCounter++; // Tambah counter untuk kotak berikutnya
        }
    }
}
