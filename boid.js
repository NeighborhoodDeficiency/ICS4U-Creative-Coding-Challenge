class Boid {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(2, 4));
        this.acc = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        } else if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }


    align(boids) {
        let perceptionRadius = 25;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < perceptionRadius) {
                steering.add(other.vel);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }
    cohesion(boids) {
        let steering = createVector();
        let perseptionRad = 50;
        let total = 0;
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < perseptionRad) {
                steering.add(other.pos);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.pos);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    seperation(boids) {
        let steering = createVector();
        let perseptionRad = 100;
        let total = 0;
        for (let other of boids) {
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < perseptionRad) {
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.div(d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.vel);
            steering.limit(this.maxForce);
        }
        return steering;
    }
    flock(boids) {
        this.acc.set(0, 0);
        let alignment = this.align(boids);
        this.acc.add(alignment);
        let cohesion = this.cohesion(boids);
        this.acc.add(cohesion);
        let seperation = this.seperation(boids);
        this.acc.add(seperation);
    }
    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
    }
    show() {
        strokeWeight(8);
        stroke(255);
        point(this.pos.x, this.pos.y);
    }
}
