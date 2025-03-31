


let bears = []; // Array for storing bears
let indies = []; // Array for storing face creatures
let rippleSize = 0;
let rippleX = 0;
let rippleY = 0;

function setup() {
  createCanvas(600, 600);

  // Initialize 5 bears
  for (let i = 0; i < 5; i++) {
    bears.push(new Bear(random(width), random(height)));
  }

  // Initialize 15 face creatures
  for (let i = 0; i < 15; i++) {
    let k = random(255);
    indies.push(
      new Indy(
        k,
        random(width),
        random(height),
        random(-2, 2),
        random(-2, 2),
        random(5, 20),
        random(10, 30),
        random(0, 360)
      )
    );
  }
}

function draw() {
  // Background gradient
  setGradient(0, 0, width, height, color(0, 0, 128), color(255, 255, 0));

  // Ripple effect
  if (rippleSize > 0) {
    drawRipple(rippleX, rippleY);
    rippleSize -= 1;
  }

  // Update and display bears
  for (let bear of bears) {
    bear.update();
    bear.display();
  }

  // Update and display face creatures
  for (let indy of indies) {
    indy.twitch();
    indy.jump();
    indy.display();
  }
}

// Background gradient function
function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

// Ripple Drawing
function drawRipple(x, y) {
  noFill();
  stroke(255, 204, 0, 150);
  ellipse(x, y, rippleSize, rippleSize);
}

// Mouse click event handling
function mousePressed() {
  rippleX = mouseX;
  rippleY = mouseY;
  rippleSize = 100;

  // Randomly toggle a bear's movement or change direction
  let randomBear = random(bears);
  if (random(1) > 0.5) {
    randomBear.toggleMovement();
  } else {
    randomBear.changeDirection();
  }
}

// Bear class
class Bear {
  constructor(x, y) {
    this.locX = x;
    this.locY = y;
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.isMoving = true;
    this.size = random(80, 120); // Varying size
  }

  update() {
    if (this.isMoving) {
      this.locX += this.speedX;
      this.locY += this.speedY;

      // Border rebound
      if (this.locX < 0 || this.locX > width) this.speedX = -this.speedX;
      if (this.locY < 0 || this.locY > height) this.speedY = -this.speedY;
    }
  }

  display() {
    push();
    translate(this.locX, this.locY);
    rotate(frameCount * 0.02);
    scale(this.size / 100); // Scale bears based on size
    this.drawBear();
    pop();
  }

  drawBear() {
    fill(139, 69, 19);
    ellipse(0, 0, 100, 100);
    this.drawEars();
    this.drawEyes();
    this.drawNoseMouth(0, 15, 20, 15);
  }

  drawEars() {
    fill(139, 69, 19);
    ellipse(-35, -40, 40, 40); // Left ear
    ellipse(35, -40, 40, 40); // Right ear
    fill(255, 228, 181);
    ellipse(-35, -40, 25, 25);
    ellipse(35, -40, 25, 25);
  }

  drawEyes() {
    fill(0);
    ellipse(-20, -10, 15, 15);
    ellipse(20, -10, 15, 15); // Left eye
    fill(255);
    ellipse(-22, -12, 5, 5);
    ellipse(18, -12, 5, 5); // Right eye
  }

  drawNoseMouth(x, y, width, height) {
    fill(0);
    ellipse(x, y, width, height);
    noFill();
    stroke(0);
    strokeWeight(2);
    arc(x - 8, y + 10, 10, 10, 0, PI); // Left part
    arc(x + 8, y + 10, 10, 10, 0, PI); // Right part
    strokeWeight(1);
  }

  toggleMovement() {
    this.isMoving = !this.isMoving;
  }

  changeDirection() {
    this.speedX *= -1;
    this.speedY *= -1;
  }
}

// Face Creature class (Indy)
class Indy {
  constructor(k, lx, ly, spx, spy, w, ohh, rot) {
    this.k = k;
    this.lox = lx;
    this.loy = ly;
    this.spx = spx;
    this.spy = spy;
    this.wiggle = w;
    this.ohh = ohh;
    this.rot = rot;
  }

  display() {
    this.cat1(this.k, this.lox, this.loy);
  }

  cat1(k, lx, ly) {
    push();
    translate(lx, ly);
    rotate(radians(this.rot));
    fill(0);
    ellipse(30, -5, 75, 60); // Anchor
    this.paw(-30, -20, -5, 0);
    this.eyes(25, -15, this.wiggle, 5);
    this.nose(color(200), 25, -10);
    this.ears(color(50), 25, -15, 20, this.ohh);
    this.ybowtie(color(50), 25, -15, 20);
    pop();
  }

  paw(lx, ly, px, py) {
    fill(0);
    rect(lx, ly, 20, 17, 5);
  }

  eyes(lx, ly, px, py) {
    fill(0, 255, 255);
    ellipse(lx + 23, ly + 14, 18, 16);
    ellipse(lx - 12, ly + 14, 18, 16);
    fill(0);
    ellipse(lx + 23, ly + 14, 5, 20);
    ellipse(lx - 12, ly + 14, 5, 20);
  }

  nose(k, lx, ly) {
    fill(255, 255, 0);
    ellipse(lx + 5, ly + 20, 6, 5);
  }

  ears(k, lx, ly, msw, msh) {
    fill(0);
    triangle(lx + 10, ly, lx + 40, ly, lx + 25, ly - 40);
    triangle(lx - 30, ly, lx, ly, lx - 15, ly - 40);
    fill(255, 0, 255);
    triangle(lx + 15, ly, lx + 35, ly, lx + 25, ly - 30);
    triangle(lx - 25, ly, lx - 5, ly, lx - 15, ly - 30);
  }

  ybowtie(k, lx, ly, px, py) {
    fill(255, 255, 0);
    triangle(lx + 6, ly + 40, lx + 25, ly + 50, lx + 25, ly + 35);
    triangle(lx + 6, ly + 40, lx - 14, ly + 50, lx - 14, ly + 35);
    ellipse(lx + 5, ly + 40, 10);
  }

  twitch() {
    this.wiggle = random(-5, 5);
  }

  jump() {
    this.lox += this.spx;
    this.loy += this.spy;

    if (this.lox < 0 || this.lox > width) {
      this.spx = -this.spx;
    }

    if (this.loy < 0 || this.loy > height) {
      this.spy = -this.spy;
    }
  }
}
