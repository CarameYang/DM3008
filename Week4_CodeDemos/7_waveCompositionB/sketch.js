/* DM3008 Generative Art, Ashley Hi 2026
 * Week 4 - Waves & Distribution
 * Wave Composition B
*/

var magnify = 300;  // Define the magnification of the wave: The distance from the center of the canvas to the outermost point of the wave
var rotation = 0;   // Define the rotation of the wave: The angle at which each point is rotated around the center of the canvas
var radius = 0;     // Define the radius of the wave: The distance from the center of the canvas to each point on the wave
var elements = 256; // Define the number of elements in the wave: The number of points that make up the wave

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100);
  frameRate(5);    // Change the frame rate to understand the wave better
}
 
function draw() {
  background(0);
  elements = 500; 
  radius = (tan(frameCount * 0.0013) + 2) * 5;
  rotation = (exp(frameCount * 0.0011) + 1) * 10;

  drawingContext.shadowBlur = 40;
  drawingContext.shadowColor = color(255,255,0);

  var spacing = TWO_PI / elements; 
  translate(width * 0.5, height * 0.5);
  noFill();
  stroke((frameCount + 120) % 360, frameCount % 360, frameCount % 360);
  
  beginShape();
  
  for (var i = 0; i < 256; i++) {
      var p = createVector(0,0);
      p.add(cos(spacing * i * radius) * magnify, 0);
      p.rotate(spacing * i * rotation);
      vertex(p.x, p.y);
  }
  endShape();

  push();

  strokeWeight(3);
  noFill();

  drawingContext.shadowColor = "rgb(212, 0, 255)";
  drawingContext.shadowBlur = 10;
  stroke(frameCount % 360, frameCount % 360, 200);

  for (let j = 0; j < 3; j++) {
    ellipse(0, 0, 0.7 * frameCount % 400, frameCount % 400);
    rotate(2 * PI / 3);
  }

}