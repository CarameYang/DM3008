let noiseScale = 0.005;
let windParticles = [];
let windLayer;

function setup() {
  createCanvas(512, 512);
  frameRate(100);
  noFill();
  windLayer = createGraphics(width, height);
  windLayer.background(191, 191, 191);

  // let wind particles distribute across the canvas
  for (let i = 0; i < 600; i++) {
    windParticles.push(
      createVector(random(width), random(height))
    );
  }
}

function draw() {
  background(191, 191, 191);

  drawWind();
  image(windLayer, 0, 0);

  //=== 1 - square ===
  push();
  stroke(198, 194, 29);
  strokeWeight(1.2);
  for (var i = 0; i < 10000; i++) {
    var x = random(290, width - 110);
    var y = random(300, height - 115);
    point(x, y);
  }

  pop();

  //=== 2 - rectangle ===

  push();
  stroke(217, 186, 125);
  strokeWeight(1);
  for (var i = 0; i < 7000; i++) {
    var x = random(270, width - 90);
    var y = random(270, 300);
    point(x, y);
  }
  pop();

  //=== 3 - circle ===
  
  push();
  stroke(255, 95, 95);
  strokeWeight(1.5);
  
  translate(width / 5.4, height / 6);
  for (var i = 0; i < 2000; i++) {
   var dist = (random(-1.0, 1.0) * 70) / 2.5;
   var angle = random(0, PI * 2);
   var p = createVector(cos(angle), sin(angle));
   p.mult(dist);
   point(p.x, p.y);
  }
  pop();

  //=== 4 - wave ===

  push();
  stroke(41, 250, 255);
  strokeWeight(1);

  var centerX = 180;  
  var amp = 20;       
  var cycles = 3;     
  var spread = 7;  
  var bias = 3;       

  for (var i = 0; i < 7000; i++) {
    var y = getMaxBiasRand(0, height, bias);

    var x =
      centerX +
      cos((y / height) * TWO_PI * cycles) * amp;

    x += random(-spread, spread);

    point(x, y);
  }
  pop();

  //=== 5 - triangle ===
  push();
  stroke(255, 92, 3);
  strokeWeight(1);

  for (var i = 0; i < 7000; i++) {
    var x = random(270, width - 90);
    var y = random(200, 270);

    var centerX = (270 + width - 90) / 2;
    var halfWidth = map(y, 200, 270, 0, 76);

   if (x > centerX - halfWidth && x < centerX + halfWidth) {
    point(x, y);
  }
}

pop();
}

 // === 6 - Wind Field ===
function drawWind() {
  windLayer.background(191, 191, 191, 7);

  windLayer.stroke(80, 110, 125, 45);
  windLayer.strokeWeight(0.8);

  let t = frameCount * 0.001;

  for (let p of windParticles) {
    let n = noise(
      p.x * noiseScale,
      p.y * noiseScale,
      t
    );

    let angle = map(n, 0, 1, -PI / 3, PI / 3);

    let v = p5.Vector.fromAngle(angle);
    v.mult(0.8);

    let oldX = p.x;
    let oldY = p.y;

    p.add(v);

    windLayer.line(oldX, oldY, p.x, p.y);

    if (p.x > width) {
      p.x = 0;
      p.y = random(height);
    }

    if (p.y < 0) {
      p.y = height;
    } else if (p.y > height) {
      p.y = 0;
    }
  }
}

function getMaxBiasRand(minValue, maxValue, iters) {
  var r = minValue;

  for (var i = 0; i < iters; i++) {
    r = max(r, random(minValue, maxValue));
  }

  return r;
}


