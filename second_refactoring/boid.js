class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(0.1,1));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 4;
    //added this.color
    this.color = 0;
  }
  
  edges() {
    if (this.position.x > width){
        this.position.x = 0
        } else if (this.position.x < 0) {
          this.position.x = width;
        }
    if (this.position.y > height){
        this.position.y = 0
        } else if (this.position.y < 0) {
          this.position.y = height;
        }
  }

  align(boids) {
    let perception = 50;
    let total = 0;
    let avg = createVector();
    for (let other of boids){
      let d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
     if(other != this && d < perception){
      avg.add(other.velocity);
       total++;
       //as the objects enter the perception radius of the other objects, their color will change
       this.color++;
     }
    }
   
 if(total > 0){   
   avg.div(total);
   avg.setMag(this.maxSpeed);
   avg.sub(this.velocity);
   avg.limit(this.maxForce);
    }
    return avg;
  }
  
  cohesion(boids) {
    let perception = 50;
    let total = 0;
    let avg = createVector();
    for (let other of boids){
      let d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
     if(other != this && d < perception){
      avg.add(other.position);
       total++;
     }
    }
   
 if(total > 0){   
   avg.div(total);
   avg.sub(this.position);
   //avg.setMag(this.maxSpeed);
   avg.sub(this.velocity);
   avg.limit(this.maxForce);
    }
    return avg;
  }
  
  separation(boids) {
    let perception = 50;
    let total = 0;
    let avg = createVector();
    for (let other of boids){
      let d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
     if(other != this && d < perception){
       let diff = p5.Vector.sub(this.position,other.position);
       diff.div(d);
      avg.add(diff);
       total++;
     }
    }
   
 if(total > 0){   
   avg.div(total);
   avg.setMag(this.maxSpeed);
   avg.sub(this.velocity);
   avg.limit(this.maxForce);
    }
    return avg;
  }
  
  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }
  
  click(i) {
    if(i === true && this.position.x != mouseX && this.position.y != mouseY) {
    this.position.x = mouseX + random(-1,1);
    this.position.y = mouseY+ random(-1,1);
       }
  }
  
  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);

  }

  show() {
    //made the objects ellipses and now change color
    noStroke();
    fill(this.color,this.color,this.color);
    ellipse(this.position.x, this.position.y,10,10);
  }
}
