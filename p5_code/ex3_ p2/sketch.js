

let bear1, bear2; // Instances of the Bear class
let rippleSize = 0;

// Bear class definition
class Bear {
  constructor(x, y, speedX, speedY, scale, boundsType) {
    this.loc = createVector(x, y);
    this.speed = createVector(speedX, speedY);
    this.scale = scale;
    this.boundsType = boundsType; // "wraparound" or "bounce"
  }

  // Update position
  updatePosition() {
    this.loc.add(this.speed);

    if (this.boundsType === "wraparound") {
      if (this.loc.x < 0) this.loc.x = width;
      if (this.loc.x > width) this.loc.x = 0;
      if (this.loc.y < 0) this.loc.y = height;
      if (this.loc.y > height) this.loc.y = 0;
    } else if (this.boundsType === "bounce") {
      if (this.loc.x < 0 || this.loc.x > width) this.speed.x *= -1;
      if (this.loc.y < 0 || this.loc.y > height) this.speed.y *= -1;
    }
  }

  // Draw the bear
  drawBear() {
    push();
    translate(this.loc.x, this.loc.y);
    scale(this.scale);
    rotate(frameCount * 0.02 * this.scale); // Rotation varies with scale
    drawBearBody();
    pop();
  }
}

// Setup function
function setup() {
  createCanvas(500, 500);

  // Initialize Bear instances
  bear1 = new Bear(width / 2, height / 2, random(-2, 2), random(-2, 2), 1.2, "wraparound");
  bear2 = new Bear(width / 3, height / 3, random(-3, 3), random(-3, 3), 0.8, "bounce");
}

// Draw function
function draw() {
  // Background gradient
  setGradient(0, 0, width, height, color(0, 0, 128), color(255, 255, 0));

  // Ripple effect
  if (rippleSize > 0) rippleSize -= 0.5;

  // Draw and update Bear 1
  bear1.drawBear();
  bear1.updatePosition();

  // Draw and update Bear 2
  bear2.drawBear();
  bear2.updatePosition();

  // Ripple
  drawRipple();
}

// Function to draw the bear's body
function drawBearBody() {
  fill(139, 69, 19);
  ellipse(0, 0, 100, 100); // Head
  drawEars();
  drawEyes();
  drawNoseMouth(0, 15, 20, 15);
}

// Draw the ears (child function)
function drawEars() {
  fill(139, 69, 19);
  ellipse(-35, -40, 40, 40); // Left ear
  ellipse(35, -40, 40, 40);  // Right ear
  fill(255, 228, 181);
  ellipse(-35, -40, 25, 25);
  ellipse(35, -40, 25, 25);
}

// Draw the eyes (child function)
function drawEyes() {
  fill(0);
  ellipse(-20, -10, 15, 15); // Left eye
  ellipse(20, -10, 15, 15);  // Right eye
  fill(255);
  ellipse(-22, -12, 5, 5);
  ellipse(18, -12, 5, 5);
}

// Draw the nose and mouth (parameterized function)
function drawNoseMouth(x, y, width, height) {
  fill(0);
  ellipse(x, y, width, height);
  noFill();
  stroke(0);
  strokeWeight(2);
  arc(x - 8, y + 10, 10, 10, 0, PI); // Left
  arc(x + 8, y + 10, 10, 10, 0, PI); // Right
  strokeWeight(1);
}

// Draw ripple effect
function drawRipple() {
  noFill();
  stroke(255, 204, 0, 150);
  ellipse(width / 2, height / 2, rippleSize, rippleSize); // Ripple at the center
}

// Background gradient
function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

// Mouse interaction
function mousePressed() {
  rippleSize = 100; // Reset ripple size
  bear1.speed.mult(-1); // Reverse Bear 1's direction
  bear2.speed.mult(-1); // Reverse Bear 2's direction
}
