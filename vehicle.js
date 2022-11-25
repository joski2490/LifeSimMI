let vehicles = [];
let vehicleNum = 10;
function Vehicle(x, y, dna) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.maxspeed = 8;
    this.maxforce = 0.4;
    this.r = 4;
    this.health = 1;
    this.dna = [];
    if (dna === undefined) {

        this.dna[0] = random(-2, 2);
        this.dna[1] = random(-2, 2);
        this.dna[2] = random(0, 100);
        this.dna[3] = random(0, 100);
    }
    else {
        this.dna[0] = dna[0];
        this.dna[1] = dna[1];
        this.dna[2] = dna[2];
        this.dna[3] = dna[3];
    }
    this.update = () => {
        this.health -= 0.001;
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
    this.behaviors = (good, bad) => {
        let steerG = this.eat(good, 0.2, this.dna[2]);
        let steerB = this.eat(bad, -1.5, this.dna[3]);

        steerG.mult(this.dna[0]);
        steerB.mult(this.dna[1]);

        this.applyForce(steerG);
        this.applyForce(steerB);

    }
    /*
    this.cloneMe = () => {
        if (random(1) < 0.001) {
            return new Vehicle(this.position.x, this.position.y, this.dna)
        }
        else {
            return null;
        }

    }
    */
    this.eat = (list, nutrition, perception) => {
        let record = Infinity;
        let closestIndex = null;
        for (let i = list.length - 1; i >= 0; i--) {
            let d = this.position.dist(list[i]);
            if (d < this.maxspeed) {
                //console.log("Before",list);
                list.splice(i, 1);
                //console.log("After",list);
                this.health += nutrition;
                return createVector(0, 0);
            }
            else {

                if (d < record && d < perception) {
                    record = d;
                    closestIndex = list[i];
                }
            }
        }

        if (closestIndex != null) {
            return this.seek(closestIndex);
        }
        return createVector(0, 0);

    }
    this.applyForce = (force) => {
        this.acceleration.add(force);
    }

    this.seek = (target) => {
        let desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxspeed);
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        //this.applyForce(steer);
        return steer;
    }
    /*
    this.dead = () => {
        return (this.health < 0);
    }*/

    this.display = () => {
        let theta = this.velocity.heading() + PI / 2;
        let green = color(0, 255, 0);
        let red = color(255, 0, 0);
        let actCol = lerpColor(red, green, this.health);
        fill(actCol);
        stroke(actCol);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        noFill();
        if (debug) {
            stroke(0, 255, 0);
            line(0, 0, 0, -this.dna[0] * 10);
            ellipse(0, 0, this.dna[2] * 2);
            stroke(255, 0, 0);
            line(0, 0, 0, -this.dna[1] * 10);
            ellipse(0, 0, this.dna[3] * 2);
        }
        pop();
    }
    this.boundaries = function () {
        let d = 25;
        var desired = null;

        if (this.position.x < d) {
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }
        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxspeed);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxspeed);
        }
        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxspeed);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }
}

function createVehicles() {
    for (let i = 0; i < vehicleNum; i++) {
        vehicles[i] = new Vehicle(random(width), random(height));
    }
}

function removeVehicles(pool) {
    vehicles = [];
    for (let i = 0; i < vehicleNum; i++) {
        let dna1 = random(pool).dna;
        let dna2 = random(pool).dna;
        let dna = [];
        for (let i = 0; i < 4; i++) {
            let v = random(1) > 0.5 ? dna1[i] : dna2[i]
            dna.push(v) ;
        }
        if (random(1) < 0.1) {
            let ind = Math.floor(random(4));
            if (ind == 0 || ind == 1) {
                dna[ind] = random(-2, 2);
            }
            else {
                dna[ind] = random(0, 100);
            }
        }
        vehicles[i] = new Vehicle(random(width), random(height), dna);
    }

}
