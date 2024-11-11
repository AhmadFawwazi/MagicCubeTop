document.getElementById('startSteepestAscentHillClimb').addEventListener('click', () => {
    //block biar ga muncul yg annealling
    document.getElementById('deltaETValues').style.display = 'none';
    document.getElementById('stuckValue').style.display = 'none';
    document.getElementById('populValue').style.display = 'none';
  
})
    // Jalankan algoritma stochasticHillClimbing
document.getElementById('startSteepestAscentHillClimb').addEventListener('click', () =>
    {
    // menjalankan algoritma stochasticHillClimbing
    const result = steepestAscentHillClimbing(cubeNumbers);
    displayResults(result, cubeNumbers, 'objectiveChart');
    });

function steepestAscentHillClimbing(initialCubeArray) 
{
    let current_state = [...initialCubeArray];
    let current_obj = evaluate(current_state); // Menghitung nilai objective function pada current state
    let iterasi = 0;
    const max_iterasi = 50000; 
    const scores = [current_obj];

    const steepeststartTime = Date.now();

    while (iterasi < max_iterasi) 
    {
        iterasi = iterasi + 1;

        // menghasilkan semua neighbor yang ada
        const neighbors = steepestgenerateRandomNeighbor(current_state);

        // mencari neighbor dengan score terbaik
        let best_neighbor = null;
        let best_score = current_obj; 

        for (const neighbor of neighbors) 
        {
            const neighborScore = evaluate(neighbor);
            if (neighborScore > best_score) 
            {
                best_score = neighborScore;
                best_neighbor = neighbor;
            }
        }

        // Jika ada neighbor dengan objective function lebih baik, current state pindah ke neighbor tersebut
        if (best_neighbor !== null) 
        {
            current_state = best_neighbor;
            current_obj = best_score;

            cubeNumbers = [...current_state];
            renderNumbers();
        } 
        else 
        {
            // jika tidak ada neighbor lebih baik, berhenti iterasi
            console.log("Local optimum tercapai pada: ", iterasi);
            break;
        }
        // menyimpan nilai objective function
        scores.push(current_obj);
    }

    const steepestendTime = Date.now();

    console.log("Iterasi final pada: ", iterasi);

    return {
        initialState: initialCubeArray,
        finalState: current_state, // current state final
        finalScore: current_obj, // Nilai objective function akhir
        scores, // Semua skor untuk iterasi
        duration: (steepestendTime - steepeststartTime) / 1000,
        iteration: iterasi // Total iterasi yang dijalankan
    };
}


function steepestgenerateRandomNeighbor(cubeArray) 
{
    const neighbors = [];
    // Iterasi melalui semua pasangan elemen
    for (let i = 0; i < cubeArray.length; i++) 
    {
        for (let j = i + 1; j < cubeArray.length; j++) 
        {
            const newNeighbor = [...cubeArray];
            [newNeighbor[i], newNeighbor[j]] = [newNeighbor[j], newNeighbor[i]]; // Tukar elemen
            neighbors.push(newNeighbor); // Tambahkan ke daftar neighbor
        }
    }

    return neighbors;
}