const cube = document.getElementById('cube');

const boxSize = 0; // Ukuran tiap kotak kecil
const spacing = 150; // Jarak antar kotak kecil
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
            
            // Hitung posisi setiap kubus kecil di dalam grid 5x5x5 dengan jarak antar kubus
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

// Variabel untuk rotasi dan dragging
let isDragging = false;
let startX, startY;
let currentRotationX = 30; // Sudut rotasi awal pada sumbu X
let currentRotationY = 45; // Sudut rotasi awal pada sumbu Y

// Event listener untuk memulai dragging saat mouse ditekan
cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    cube.style.cursor = 'grabbing';
});

// Event listener untuk rotasi saat mouse bergerak
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Hanya lakukan rotasi jika sedang di-drag

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;
    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
});

// Event listener untuk menghentikan dragging saat mouse dilepas
document.addEventListener('mouseup', () => {
    isDragging = false;
    cube.style.cursor = 'grab';
});




// document.getElementById("myButton").addEventListener("click", function() {
//     boxSize = 100; // Atur ukuran baru untuk boxSizea
//     boxCounter = 1; // Reset nomor counter
//     createSmallCubes(); // Render ulang semua kubus kecil dengan ukuran baru
// });