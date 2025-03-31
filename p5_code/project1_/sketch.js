

let currentkey = '1';
let bgc;

function setup() {
  createCanvas(800, 600);
  background(255);
  smooth();
  bgc = color(255);
}

function draw() {

  if (keyIsPressed) {
    clear_print();
  }

  if (mouseIsPressed) {
    drawChoice();
  }
}

function drawChoice() {

  let currentkey = key;

  switch (currentkey) {
    case '1':
      console.log("1");
      drawline(color(255, 255, 0), mouseX, mouseY, pmouseX, pmouseY);
      break;
    case '2':
      console.log("2");
      drawline(color(148, 0, 211), mouseX, mouseY, pmouseX, pmouseY);
      break;
    case '3':
      console.log("3");
      drawline(color(255, 165, 0), mouseX, mouseY, pmouseX, pmouseY);
      break;
    case '4':
      console.log("4");
      drawline(color(0), mouseX, mouseY, pmouseX, pmouseY);
      break;
    case '5':
      console.log("5");
      drawThickLine(color(255, 182, 193), mouseX, mouseY, pmouseX, pmouseY);
      break;
    case '6':
      console.log("6");
      drawThickLine(color(0, 0, 255), mouseX, mouseY, pmouseX, pmouseY);
      break;
    case '7':
      console.log("7");
      drawline(color(0, 255, 0), mouseX, mouseY, pmouseX, pmouseY);
      break;
    case '8':
      console.log("8");
      drawStar(random(255), random(255), random(255), mouseX, mouseY);
      break;
    case '9':
      console.log("9");
      eraser(bgc, mouseX, mouseY, 25);
      break;
    default:
      console.log("None");
      break;
  }
}

function drawline(k, lx, ly, px, py) {
  stroke(k);
  strokeWeight(2);
  line(lx, ly, px, py);
}

function drawThickLine(k, lx, ly, px, py) {
  strokeWeight(10);
  stroke(k);
  line(lx, ly, px, py);
}

function drawStar(r, g, b, x, y) {
  fill(r, g, b);
  noStroke();
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = TWO_PI / 5 * i - PI / 2;
    let xPos = x + cos(angle) * 20;
    let yPos = y + sin(angle) * 20;
    vertex(xPos, yPos);
    xPos = x + cos(angle + PI / 5) * 10;
    yPos = y + sin(angle + PI / 5) * 10;
    vertex(xPos, yPos);
  }
  endShape(CLOSE);
}

function eraser(k, lx, ly, sz) {
  fill(k);
  noStroke();
  ellipse(lx, ly, sz, sz);
}

function clear_print() {
  if (key == '0') {
    background(255);
  } else if (key == 's' || key == 'S') {
    saveCanvas('myDrawing', 'png');
  }
} 