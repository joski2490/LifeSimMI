let Frames=0;
let debug=0;
let gen=1;
function setup() {
    createCanvas(windowWidth, windowHeight);
    createVehicles();
    initParticles();
}

function draw() {
    background(51);
    fill(0, 102, 153);
    text(`Generation: ${gen}`,10,10);
    spawnNew();
    displayFood();

    Frames+=1;
    if (Frames==500)
    {
        Frames=0;
        gen+=1;
        CalculateFitness(vehicles);
        let pool=MatingPool(vehicles);
        //console.log(pool);
        removeVehicles(pool);
        removeParticles();
        initParticles();

    }
    //console.log(Frames);
    for (let i = vehicles.length - 1; i >= 0; i--) {
        vehicles[i].boundaries();
        vehicles[i].behaviors(food, poison);
        //vehicle.seek(target);
        vehicles[i].update();
        vehicles[i].display();
        /*
        let child=vehicles[i].cloneMe();
        if (child!=null){
            vehicles.push(child);
        }

        if (vehicles[i].dead()) {
            food.push(createVector(vehicles[i].position.x, vehicles[i].position.y));
            vehicles.splice(i, 1);
        }
        */
    }

    
}