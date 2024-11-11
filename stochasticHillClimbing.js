document.getElementById('startStochasticHillClimb').addEventListener('click', () => {
    //block biar ga muncul yg annealling
    document.getElementById('deltaET').style.display = 'none';
    document.getElementById('frequencyStuck').style.display = 'none';
    
    // Jalankan algoritma 
    const result = stochasticHillClimbing(cubeNumbers);

    // Tampilkan hasil  
    displayResults(result, cubeNumbers, 'objectiveChart');

});

function stochasticHillClimbing(initialCubeArray) {
    let current_state = [...initialCubeArray];
    let current_obj = evaluate(current_state); // Hitung nilai awal objective function
    let iteration = 0;
    const max_iteration = 50000; // Maksimum iterasi
    const scores = [current_obj];

    const start_time = Date.now(); 
    while (iteration < max_iteration) {
        iteration++;

        // Hasilkan neighbor secara acak
        const new_neighbor = Random_Neighbor(current_state);
        const neighbor_obj = evaluate(new_neighbor);

        // Pindah ke neighbor ke lebih baik
        if (neighbor_obj > current_obj) {
            current_state = new_neighbor;
            current_obj = neighbor_obj;
        }

        cubeNumbers = [...current_state]; // Salin state baru ke cubeNumbers
        renderNumbers(); 

        // Simpan skor 
        scores.push(current_obj);

        // kondisi berhenti
        if (iteration == max_iteration || current_obj == 109) {
            console.log("Max iterations reached.");
            break;
        }
    }
    const end_time = Date.now();
    

    return {
        initialState: initialCubeArray, // state awal
        finalState: current_state, // state akhir
        finalScore: current_obj, // Nilai objective function akhir
        scores, // Semua skor untuk iterasi
        duration : (end_time - start_time) / 1000, // waktu
        iteration: iteration // Total iterasi 
    };
}


function Random_Neighbor(cubeArray) {

    const New_Neighbor = [...cubeArray];
    const i = Math.floor(Math.random() * cubeArray.length);
    const j = Math.floor(Math.random() * cubeArray.length);

    [New_Neighbor[i], New_Neighbor[j]] = [New_Neighbor[j], New_Neighbor[i]]; // menukar menggunakan index

    return New_Neighbor;
}

