// Stance: Resonance (after Lucier)

let feeding = true;
let gain = 1.0;
let agents = [];

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  background(20);

  for (let i = 0; i < 200; i++) {
    agents.push({
      x: random(width),
      y: random(height),
      a: random(TWO_PI)
    });
  }
}

function draw() {
  const reading = sense();
  update(reading);
  render();
}

function sense() {
  loadPixels();

  return agents.map((a) => {
    const x = floor(a.x);
    const y = floor(a.y);
    const index = 4 * (y * width + x);
    return pixels[index] / 255;
  });
}

function update(reading) {
  agents.forEach((a, i) => {
    a.a +=
      (reading[i] - 0.5) * gain +
      random(-0.1, 0.1);

    a.x =
      (a.x + cos(a.a) * 1.5 + width) %
      width;

    a.y =
      (a.y + sin(a.a) * 1.5 + height) %
      height;
  });
}

function render() {
  // Feed the previous frame back into the canvas,
  // making it slightly larger each time.
  const previousFrame = get();

  push();
  translate(width / 2, height / 2);
  scale(1 + 0.005 * gain);
  image(
    previousFrame,
    -width / 2,
    -height / 2
  );
  pop();

  // Gradually blur the feedback image.
  if (frameCount % 5 === 0) {
    filter(BLUR, 1);
  }

  // Draw agents while feeding is switched on.
  if (feeding) {
    noStroke();
    fill(240, 170, 50, 60);

    agents.forEach((a) => {
      circle(a.x, a.y, 3);
    });
  }
}

// Press Space to stop or restart the agents.
function keyPressed() {
  if (key === " ") {
    feeding = !feeding;
  }
}