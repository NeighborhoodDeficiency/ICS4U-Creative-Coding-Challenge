const flock = [];
let x = false;

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 100; i++) {

    flock.push(new Boid());
  }
}
function mousePressed() {
  x = true;
}
function mouseReleased() {
  x = false;
}

function draw() {
  background(160,90,200);

  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
    boid.click(x);
  }
}
