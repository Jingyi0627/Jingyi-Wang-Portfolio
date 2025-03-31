

let snowflakes = [];
let trees = [];
let timeFactor = 0;
let video;

function setup() {
  createCanvas(1920, 1080);
  frameRate(30); // 30 frames per second


  video = createVideo('P2.mp4');
  video.hide();
  video.loop();


  // Creating a snowflake particle system
  for (let i = 0; i < 100; i++) {
    snowflakes.push(new Snowflake(random(width), random(height), random(5, 15)));
  }

  // Creating a Recursive Tree
  for (let i = 0; i < 5; i++) {
    trees.push(new RecursiveTree(width / 2, height - 150, 150, -PI / 2, 8));
  }
}

function draw() {
  // Create a gradient blue background (from dark blue to yellow)
  setGradient(0, 0, width, height, color(0, 0, 139), color(255, 255, 0), 1); // Gradient from dark blue to yellow

  timeFactor = frameCount * 0.01; // Control time factor

  // Create a snowflake
  snowflakes.forEach(snowflake => {
    snowflake.move(timeFactor);
    snowflake.display();
  });

  // Draw a recursive tree
  trees.forEach(tree => {
    tree.angle += sin(timeFactor) * 0.1; // Increase the dynamics of time
    tree.length += cos(timeFactor) * 0.5; // Recursive tree length over time
    tree.angleOffset += sin(timeFactor * 0.5) * 0.02; // Angular offset over time
    tree.colorShift(timeFactor); // Make the tree color change over time
    tree.draw();
  });

  // Add stars
  drawStars();

  // Save image every 10 frames
  if (frameCount % 10 === 0) {
    saveFrames("frame" + frameCount, "png", 1, 30); // Use frameCount as part of the filename
  }
}

// Gradient background
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === 1) { // Vertical gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === 0) { // Horizontal gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

// Drawing Stars
function drawStars() {
  for (let i = 0; i < 100; i++) {
    fill(255, random(100, 255)); // Random transparency stars
    noStroke();
    ellipse(random(width), random(height / 2), random(1, 3)); // Randomly positioned stars
  }
}

// Define the snowflake particle class
class Snowflake {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = random(1, 3);
    this.angle = random(TWO_PI);
    this.opacity = random(50, 255);
  }

  move(timeFactor) {
    this.y += this.speed;
    this.x += sin(this.angle) * 2;

    // Increasing snowflakes over time
    this.size += 0.05 + sin(timeFactor) * 0.1; // Stronger time control
    if (this.y > height) {
      this.y = 0;
    }
  }

  display() {
    fill(255, this.opacity);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

// Define the recursive tree class
class RecursiveTree {
  constructor(x, y, length, angle, depth) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
    this.depth = depth;
    this.angleOffset = random(-PI / 6, PI / 6); // Random Angle Offset
    this.angleFactor = 0.05; // Control the magnitude of the angle change
    this.colorBase = color(139, 69, 19); // Initial color of the tree
  }

  colorShift(timeFactor) {
    let red = map(sin(timeFactor * 0.3), -1, 1, 100, 255); // Red component over time
    let green = map(sin(timeFactor * 0.5), -1, 1, 100, 255); // Green component over time
    let blue = map(sin(timeFactor * 0.7), -1, 1, 100, 255); // Blue component over time
    this.colorBase = color(red, green, blue); // Dynamically change the color of the tree
  }

  draw() {
    if (this.depth === 0) return;

    let endX = this.x + cos(this.angle) * this.length;
    let endY = this.y + sin(this.angle) * this.length;

    // Draw the current branch
    stroke(this.colorBase);
    line(this.x, this.y, endX, endY);

    // Recursively draw branches
    let nextTree = new RecursiveTree(endX, endY, this.length * 0.7, this.angle + this.angleOffset, this.depth - 1);
    nextTree.draw();
    nextTree = new RecursiveTree(endX, endY, this.length * 0.7, this.angle - this.angleOffset, this.depth - 1);
    nextTree.draw();
  }
}
