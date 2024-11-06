const cube = document.getElementById('cubebeng');

// Variabel rotasi dan drag
let isDragging = false;
let startX, startY;
let currentRotationX = 30; // Sudut awal sumbu X
let currentRotationY = 45; // Sudut awal sumbu Y

//memulai drag saat mouse ditekan
cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    cube.style.cursor = 'grabbing';
});

// rotasi saat mouse digerakkan
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Hanya rotasi jika drag terjadi

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;
    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
});

// menghentikan dragging saat mouse lepas
document.addEventListener('mouseup', () => {
    isDragging = false;
    cube.style.cursor = 'grab';
});