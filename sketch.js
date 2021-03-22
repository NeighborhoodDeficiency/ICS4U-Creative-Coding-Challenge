const flock = [];

function setup() {
  createCanvas(1600/2, 900/2);
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
