
// =============================================================
// =                         BEGIN SCENES                      =
// =============================================================


////////////////////////////// 1 /////////////////
let particles = []; // 

function splash() {
  var textX;
  var textY;
  var loy = 0;  // exists as data saved when in the splash scene
  let btnevent1 = false;
  let btnevent2 = false;

  // scene1.setup
  this.setup = function () {
    console.log("We are at setup for splash");
    outputVolume(0.15);  // turn down the volume.
  }

  // enter() will be called each time SceneManager switches
  // to this scene
  this.enter = function () {
    console.log("We are at entering splash");
    // Reset particles when entering scene
    particles = [];
  }

  this.draw = function () {
    // 
    for (let i = 0; i <= height; i++) {
      let lerpColorValue = lerpColor(color('#00BFFF'), color('#FF69B4'), i / height);
      stroke(lerpColorValue);
      line(0, i, width, i);
    }

    fill("#ffa500"); // changed to orange
    ellipse(width / 2, height / 2 + 150, 260, 220);
    fill("#00008b"); // changed to dark blue
    rect(-5, height - 170, width + 5, 170);

    push();
    translate(width / 2, loy - 100);
    fill("#00fa9a"); // changed to medium spring green
    text("Splash Down!", 0, -120);
    ellipse(0, 0, 80, 140);

    if (loy > height - 140) {
      loy = 0;
    }
    loy++;
    pop();

    // 
    if (frameCount % 2 == 0) { // 
      particles.push(new Particle());
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].isOffScreen()) {
        particles.splice(i, 1);  // 
      }
    }

    // title,lx,ly, btnW, btnH, upcolor, rollcolor, downcolor
    btnevent1 = checkButtonPress("Help", width - 150, height - 70, 100, 40, "#ff6347", "#32cd32", "#ffa07a");
    if (btnevent1) { // help
      btnevent1 = false;
      this.sceneManager.showScene(help);
    }
    btnevent2 = checkButtonPress("Start Here", width / 2 - 60, height - 140, 120, 40, "#98fb98", "#3cb371", "#8fbc8f");
    if (btnevent2) {   // main or next scene
      btnevent2 = false;
      playshortsound();
      this.sceneManager.showNextScene();
    }
  }

  this.keyPressed = function () {
    fill(0, 255, 0);
    text(keyCode, textX, textY += 10);
    if (textY > height) {
      textX += 20;
      textY = 0;
    }
  }

  this.mousePressed = function () {
  }
}

// 
class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5, 10);
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
    this.color = color(random(255), random(255), random(255)); // 
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isOffScreen() {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }
}


///////////////////////  2  ////////////////////////

let balls = []; // Array to store fast-moving ball objects
let slowBalls = []; // Array to store slow-moving ball objects
let score = 0; // Score
let rippleSize = 0; // Ripple size
let rippleMaxSize = 200; // Maximum ripple size
let rippleActive = false; // Whether the ripple effect is active

function main() {
  this.y = 0;
  this.lox = 50;
  this.loy = 120;

  let btnevent1 = false;
  let btnevent2 = false; // For reset score button

  this.setup = function () {
    console.log("We are at setup for main");
    // Create fast-moving balls
    for (let i = 0; i < 5; i++) {
      balls.push(new Ball(random(width), random(height), random(20, 40), random(1, 3), random(1, 3)));
    }
    // Create slow-moving balls
    for (let i = 0; i < 5; i++) {
      slowBalls.push(new Ball(random(width), random(height), random(20, 40), random(0.5, 1), random(0.5, 1)));
    }
  }

  this.enter = function () {
    console.log("We are at entering main");
    ghosty.position.x = width / 2;
    ghosty.position.y = height / 2;
    ghosty.visible = true;
    ghosty.changeAnimation("normal");

    if (!snd1.isPlaying()) {
      snd1.play();
    }
  }

  this.draw = function () {
    // Background gradient (blue to pink gradient)
    for (let i = 0; i <= height; i++) {
      let lerpColorValue = lerpColor(color('#00BFFF'), color('#FF69B4'), i / height);
      stroke(lerpColorValue);
      line(0, i, width, i);
    }

    fill("#ff6347"); // Tomato color
    ellipse(width / 2, height / 2 + 100, 260, 260);
    fill("#00008b"); // Dark blue color
    rect(-5, height - 190, width + 5, 190);

    // Update and display all fast balls
    for (let ball of balls) {
      ball.update();
      ball.show();
      ball.checkHover();
    }

    // Update and display all slow balls
    for (let slowBall of slowBalls) {
      slowBall.update();
      slowBall.show();
      slowBall.checkHover();
    }

    // Display score
    fill(255);
    textSize(20);
    text("Score: " + score, 20, 50);

    // If the score reaches 5, activate the ripple effect
    if (score >= 5 && !rippleActive) {
      rippleActive = true;
    }

    // Draw ripple effect
    if (rippleActive) {
      noFill();
      stroke(255, 0, 0); // Red ripple
      strokeWeight(4);
      ellipse(width / 2, height / 2, rippleSize, rippleSize);
      rippleSize += 5; // Increase ripple size
      if (rippleSize > rippleMaxSize) {
        rippleSize = 0; // Reset ripple size
        rippleActive = false; // End ripple effect
      }
    }

    // Draw "Help" button
    btnevent1 = checkButtonPress("Help", width - 150, height - 70, 100, 40, "#ff6347", "#32cd32", "#ffa07a");
    // Draw "Reset Score" button
    btnevent2 = checkButtonPress("Reset Score", width - 150, height - 120, 150, 40, "#ff6347", "#32cd32", "#ffa07a");

    if (btnevent1) { // Help button clicked
      btnevent1 = false;
      this.sceneManager.showScene(help);
    }

    if (btnevent2) { // Reset score button clicked
      score = 0; // Reset score
      rippleSize = 0; // Reset ripple size
      rippleActive = false; // Stop ripple effect
    }
  }

  this.mousePressed = function () {
    // Handle mouse press events
    for (let ball of balls) {
      ball.mousePressed();
    }
    for (let slowBall of slowBalls) {
      slowBall.mousePressed();
    }
  }
}

// Colorful Ball class
class Ball {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color(random(255), random(255), random(255)); // Random color
    this.isHovered = false;
  }

  update() {
    // Ball movement
    this.x += this.speedX;
    this.y += this.speedY;

    // Edge collision bounce
    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1;
    }
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  checkHover() {
    // Check if the ball is being hovered by the mouse
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.size / 2) {
      this.isHovered = true;
      this.color = color(random(255), random(255), random(255));  // Change color on hover
    } else {
      this.isHovered = false;
    }
  }

  mousePressed() {
    // When the ball is clicked
    if (this.isHovered) {
      this.size = random(20, 50);  // Change size on click
      this.speedX = random(1, 5);
      this.speedY = random(1, 5);
      score++;  // Increase score
      if (score >= 5) {
        rippleSize = 0; // Start ripple from 0
      }
    }
  }
}



////////////////////////////// 3 /////////////////

let snowflakes = []; // Array to store snowflake objects

function help() {

  this.setup = function () {
    console.log("We are at setup for help");
  }

  this.enter = function () {
    console.log("We are at entering for help");
    ghosty.visible = true;
    ghosty.position.x = 100;
    ghosty.position.y = 100;
  }

  this.draw = function () {
    background("#b0e0e6"); // Powder blue background

    // Create and draw snowflakes
    if (random(1) < 0.1) { // 10% chance of creating a snowflake each frame
      snowflakes.push(new Snowflake());
    }

    // Update and display each snowflake
    for (let i = snowflakes.length - 1; i >= 0; i--) {
      snowflakes[i].update();
      snowflakes[i].show();
      if (snowflakes[i].offScreen()) {
        snowflakes.splice(i, 1); // Remove snowflakes that are off-screen
      }
    }

    fill("#ffa500"); // Orange color for ghost's background
    ellipse(width / 2, height / 2 + 150, 260, 220);

    fill("#00008b"); // Dark blue color for the bottom rect
    rect(-5, height - 170, width + 5, 170);

    // Center the text
    fill("black");
    textAlign(CENTER, CENTER); // Center the text both horizontally and vertically
    textSize(25);
    text("Hi, My name is Cici.", width / 2, height / 2 - 40); // Position centered at the top of the ellipse
    fill("#ffa500"); // Orange color for ghost's background
    ellipse(width / 2, height / 2 + 150, 260, 220);

    fill("#00008b"); // Dark blue color for the bottom rect
    rect(-5, height - 170, width + 5, 170);

    // Center the text
    textAlign(CENTER, CENTER); // Center the text both horizontally and vertically
    textSize(25);
    text("Hi, My name is Cici.", width / 2, height / 2 - 40); // Position centered at the top of the ellipse

    // Create pink gradient color for the text
    let startColor = color('#FF69B4'); // Light pink
    let endColor = color('#FF1493'); // Deep pink

    // Split the long text into multiple lines if necessary
    let longText = "Click on the small ball on the main page, click once to accumulate one point, squeeze five points will appear changes.";
    let words = longText.split(" ");
    let line1 = "";
    let line2 = "";
    let line3 = "";
    let maxWidth = width - 40; // Leave some margin from the edge

    // Construct the lines based on the maximum width
    for (let i = 0; i < words.length; i++) {
      if (textWidth(line1 + words[i]) < maxWidth) {
        line1 += words[i] + " ";
      } else if (textWidth(line2 + words[i]) < maxWidth) {
        line2 += words[i] + " ";
      } else {
        line3 += words[i] + " ";
      }
    }

    // Draw the text with a pink gradient color
    for (let i = 0; i < 3; i++) {
      let gradientColor = lerpColor(startColor, endColor, i / 2); // Gradually change color from start to end
      fill(gradientColor);

      if (i === 0) {
        text(line1, width / 2, height / 2 + 40); // First line
      } else if (i === 1) {
        text(line2, width / 2, height / 2 + 80); // Second line
      } else {
        text(line3, width / 2, height / 2 + 120); // Third line
      }
    }



    // "Back to Home" button
    let backButtonPressed = checkButtonPress("Back to Home", width - 150, height - 120, 120, 40, "#ff6347", "#32cd32", "#ffa07a");
    if (backButtonPressed) {
      this.sceneManager.showScene(main); // Switch to main scene
    }

    if (ghosty.mouse.hovering()) {
      ghosty.changeAnimation("stand");
    } else {
      ghosty.changeAnimation("normal");
    }

    if (ghosty.mouse.pressing()) {
      if (!snd2.isPlaying()) {
        snd2.play();
      } else {
        snd2.pause();
      }

      this.sceneManager.showScene(main);
    }
  }
}

// Snowflake class to handle individual snowflake behavior
class Snowflake {
  constructor() {
    this.x = random(width); // Random starting x position
    this.y = random(-50, -10); // Random starting y position above the screen
    this.size = random(5, 10); // Random size for the snowflake
    this.speed = random(1, 3); // Random speed for falling snowflake
  }

  update() {
    this.y += this.speed; // Move the snowflake down
  }

  show() {
    noStroke();
    fill(255); // White snowflake
    ellipse(this.x, this.y, this.size, this.size);
  }

  offScreen() {
    return this.y > height; // Check if the snowflake has gone off the screen
  }
}

function checkButtonPress(str, bx, by, boxW, boxH, upcolor, ovcolor, dncolor) {
  let btnc = "";
  let btnstate = false;

  // Test if the cursor is over the box
  if (mouseX > bx - boxW &&
    mouseX < bx + boxW &&
    mouseY > by - boxH &&
    mouseY < by + boxH) {
    overBox = true;

    if (!mouseIsPressed) {
      stroke(255);
      btnc = ovcolor;
      btnstate = false;
    } else {
      console.log(str + " pressed");
      stroke(255);
      btnc = dncolor;
      btnstate = true;
    }

  } else {
    stroke(255);
    btnc = upcolor;
    overBox = false;
  }

  push();
  translate(bx, by);
  fill(btnc);
  rect(0, 0, boxW, boxH, 10); // Draw the box

  fill(20);
  noStroke();
  textSize(20);
  textAlign(CENTER);
  text(str, boxW / 2, 28);

  pop();

  return btnstate;
}

function playshortsound() {
  if (!snd2.isPlaying()) {
    snd2.play();
  } else {
    snd2.stop();
  }
}
