let Frames=0;
let debug=0;
let gen=1;
let pause=0;
let framesinc=1;
let Data=[];
function setup() {
    createCanvas(windowWidth, windowHeight);
    createVehicles();
    initParticles();
    strokeWeight(3);
}
function keyPressed(){
	if (keyCode===BACKSPACE)
	{
		debug=debug?0:1;
	}
    if (keyCode===SHIFT)
    {
        pause=pause?0:1;
        framesinc=pause?0:1;
    }
}
function draw() {
    background(51);
    fill(0, 102, 153);
    textSize(30);
    text(`Generation: ${gen}`,30,30);
    if (!pause)
    {
        spawnNew();
    }
    displayFood();

    Frames+=framesinc;
    if (Frames==400)
    {
        Frames=0;
        gen+=1;
        CalculateFitness(vehicles);
        let foodno=food.length;
        let poisno=poison.length;
        let newGraphData={gen:gen,foodno:foodno,poisno:poisno};
        Data.push(newGraphData);
        let pool=MatingPool(vehicles);
        //console.log(pool);
        /*for(let i=vehicles.length-1;i>=0;i--)
        {
            console.log(vehicles[i].health);
        }*/
        removeVehicles(pool);
        removeParticles();
        initParticles();
        if (gen==61)
        {
            noLoop();
            init_graph();
        }

    }
    //console.log(Frames);
    for (let i = vehicles.length - 1; i >= 0; i--) {
        if (!pause)
        {
        vehicles[i].boundaries();
        vehicles[i].behaviors(food, poison);
        //vehicle.seek(target);
        vehicles[i].update();
        }
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
