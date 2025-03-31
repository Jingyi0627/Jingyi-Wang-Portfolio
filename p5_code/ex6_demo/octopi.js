

let octopus;
let bubbles = [];
let bubbleSound;

function preload() {

  bubbleSound = loadSound('assets/sound.mp3');
}

function setup() {
  createCanvas(800, 600);
  octopus = new Octopi(width / 2, height / 2, color(255, 0, 0), 0.5);
}

function draw() {
  drawBackground();
  octopus.moveupdate(mouseX, mouseY);
  octopus.display();
  displayBubbles();
}

function mousePressed() {

  for (let i = 0; i < 5; i++) {
    createBubble();
  }
  if (bubbleSound && bubbleSound.isLoaded()) {
    bubbleSound.play();
  }
}

function createBubble() {
  let size = random(10, 30);
  let x = random(width);
  let y = random(height, height + 100);
  let speed = random(0.5, 1.5);
  let color = color(random(255), random(255), random(255), 150);
  bubbles.push({ x, y, size, speed, color });
}

function displayBubbles() {
  if (random(1) < 0.1) {
    createBubble();
  }

  for (let i = bubbles.length - 1; i >= 0; i--) {
    let b = bubbles[i];
    b.y -= b.speed;
    fill(b.color);
    noStroke();
    ellipse(b.x, b.y, b.size, b.size);

    if (b.y < -b.size) {
      bubbles.splice(i, 1);
    }
  }
}

function drawBackground() {
  let r = map(sin(frameCount * 0.02), -1, 1, 50, 200);
  let g = map(cos(frameCount * 0.03), -1, 1, 100, 150);
  background(r, g, 255);
}

class Octopi {
  constructor(rootX, rootY, c, oscale) {
    this.colorcount = 0;
    this.rx = rootX;
    this.ry = rootY;
    this.oc = c;
    this.os = oscale;
    this.gmt = 0.0;
    this.tmArr = new Array(8);
    this.tsArr = new Array(8);
    this.setupTMoves();
  }

  update() {
    if (this.colorcount < 0) {
      this.colorcount = 0;
    }

    if (this.colorcount > 255) {
      this.oc = color(random(255), random(255), random(255));
    } else {
      this.oc = color(int(this.colorcount), 0, 0);
    }
  }

  moveupdate(rootX, rootY) {
    this.rx = rootX;
    this.ry = rootY;
    this.colorcount += 0.45;
    this.updateTSpeed();
    let angleToMouse = atan2(mouseY - this.ry, mouseX - this.rx);
    this.tmArr = this.tmArr.map(() => angleToMouse);
  }

  display() {
    push();
    translate(this.rx, this.ry);
    scale((this.colorcount / 150) + this.os);
    this.body(this.oc);
    this.head(this.oc);
    pop();
    this.colorcount -= 0.40;
  }

  head(c) {
    fill(c);
    ellipse(0, 0, 200, 330);
    let ec = color(0, 0, 255);
    this.eye(-50, -10, ec);
    this.eye(50, -10, ec);
    this.mouth(0, 70, color(50));
  }

  eye(lx, ly, c) {
    fill(c);
    ellipse(lx, ly, 20, 30);
  }

  mouth(lx, ly, c) {
    push();
    translate(lx, ly);
    scale((this.colorcount / 90) + 0.50);
    fill(c);
    ellipse(0, 0, 20, 10);
    pop();
  }

  body(c) {
    fill(c);
    let scaleFactor = 1 + sin(frameCount * 0.05) * 0.1;
    ellipse(0, 100, 180 * scaleFactor, 90 * scaleFactor);
    this.updateTMoves();
    this.tentacles(-80, 110, c, 100, 0.90, 95, this.tmArr[0]);
    this.tentacles(80, 110, c, 100, 0.90, -95, this.tmArr[1]);
    this.tentacles(-60, 125, c, 100, 1.3, 70, this.tmArr[2]);
    this.tentacles(60, 125, c, 100, 1.5, -70, this.tmArr[3]);
    this.tentacles(-35, 135, c, 130, 2, 45, this.tmArr[4]);
    this.tentacles(35, 135, c, 130, 2.1, -55, this.tmArr[5]);
    this.tentacles(-14, 145, c, 140, 2.35, 30, this.tmArr[6]);
    this.tentacles(14, 145, c, 140, 2.4, -30, this.tmArr[7]);
  }

  tentacles(lx, ly, c, l, sc, ang, mt) {
    let colorShift = map(sin(frameCount * 0.05 + mt), -1, 1, 100, 255);
    fill(colorShift, 100, 200);
    push();
    translate(lx, ly);
    scale(sc);
    rotate(radians(ang + mt));
    ellipse(0, 0, 20, 25);
    rect(-5, 0, 12, l, 120);
    pop();
  }

  updateTMoves() {
    for (let i = 0; i < this.tmArr.length; i++) {
      let tm = this.tmArr[i];
      if (tm > 15 || tm < -15) {
        this.tsArr[i] = -this.tsArr[i];
      }
      this.tmArr[i] += this.tsArr[i];
    }
  }

  setupTMoves() {
    for (let i = 0; i < this.tmArr.length; i++) {
      this.tsArr[i] = random(-5, 5);
      this.tmArr[i] += this.tsArr[i];
    }
  }

  updateTSpeed() {
    for (let i = 0; i < this.tmArr.length; i++) {
      this.tmArr[i] = 0;
      this.tsArr[i] = random(-5, 5);
    }
  }
}
