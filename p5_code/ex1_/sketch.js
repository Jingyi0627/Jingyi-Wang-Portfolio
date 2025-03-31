


function setup() {
  createCanvas(600, 600);
  background(0, 50, 100);
  noStroke();
  // remove stroke border
  //noLoop();
  frameRate(4);
}

function draw() {
  background(0, 50, 100);

  let gridSize = 25;

  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {

      // random colors
      let r = random(255);
      let g = random(255);
      let b = random(255);
      fill(r, g, b);


      // random shapes
      if (mouseX < width / 2 && mouseY < height / 2) {
        ellipse(x + gridSize / 2, y + gridSize / 2, gridSize * 0.7, gridSize * 0.7);

      } else if (mouseX >= width / 2 && mouseY < height / 2) {
        rect(x, y, gridSize, gridSize);

      } else if (mouseX < width / 2 && mouseY >= height / 2) {
        let newX = x + gridSize / 2;
        let newY = y + gridSize / 2;
        beginShape();
        vertex(newX, newY);
        vertex(newX + random(-20, 20), newY + random(-20, 20));
        vertex(newX + random(-20, 20), newY + random(-20, 20));
        endShape(CLOSE);

      } else if (mouseX >= width / 2 && mouseY >= height / 2) {
        push();
        translate(x + gridSize / 2, y + gridSize / 2);
        rotate(frameCount * 2);
        star(0, 0, gridSize / 3, gridSize / 6, 5);
        pop();
      }


    }
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 3.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius1;
    let sy = y + sin(a) * radius1;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius2;
    sy = y + sin(a + halfAngle) * radius2;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
