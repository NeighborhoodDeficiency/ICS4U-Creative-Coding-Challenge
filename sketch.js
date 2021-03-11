const flock = [];

function setup() {
  createCanvas(1600, 900);
  for (let i=0; i < 100; i++) {
  flock.push(new Boid());
}
}

function draw() {
  background(40);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
