const cube = document.getElementById('cubebeng');

let is_drag = false;
let start_horiz, start_vert;
let current_rotation_x = 0; 
let current_rotation_y = 0; 

// mouse ditekan
cube.addEventListener('mousedown', (e) => {
    is_drag = true;
    start_horiz = e.clientX;
    start_vert = e.clientY;
    cube.style.cursor = 'grabbing'; 
});

// pergerakan mouse
document.addEventListener('mousemove', (e) => {
    if (!is_drag) return; // Hanya rotasi jika drag terjadi

    // menghitung jarak posisi mouse
    const range_x = e.clientX - start_horiz;
    const range_Y = e.clientY - start_vert;

    // mengatur pergerakan
    current_rotation_y += range_x * 0.5; //sensi disini
    current_rotation_x -= range_Y * 0.5; 

    //mengatur css
    cube.style.transform = `rotateX(${current_rotation_x}deg) rotateY(${current_rotation_y}deg)`;

    // memperbarui kondisi awal
    start_horiz = e.clientX;
    start_vert = e.clientY;
});

// mouse dilepas
document.addEventListener('mouseup', () => {
    is_drag = false;
    cube.style.cursor = 'grab'; 
});