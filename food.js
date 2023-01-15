let food = [];
let poison = [];
let foodNum = 100;
let poisNum = 200;

function initParticles(){
    for (let i = 0; i < foodNum; i++) {
        let x = random(width);
        let y = random(height);
        food.push(createVector(x, y));
    }
    for (let i = 0; i < poisNum; i++) {
        let x = random(width);
        let y = random(height);
        poison.push(createVector(x, y));
    }
}
function removeParticles(){
    food=[];
    poison=[];
}
function displayFood(){
    for (let i = 0; i < food.length; i++) {
        fill(0, 255, 0);
        noStroke();
        ellipse(food[i].x, food[i].y, 8, 8);
    }
    for (let i = 0; i < poison.length; i++) {
        fill(255, 0, 0);
        noStroke();
        ellipse(poison[i].x, poison[i].y, 8, 8);

    }
}


function spawnNew(){
    if (random(1) < 0.05) {
        let x = random(width);
        let y = random(height);
        food.push(createVector(x, y));
    }

    if (random(1) < 0.01) {
        let x = random(width);
        let y = random(height);
        poison.push(createVector(x, y));
    }

}
