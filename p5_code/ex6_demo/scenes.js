
// =============================================================
// =                         BEGIN SCENES                      =
// =============================================================

// exmample of global var that can be used between scenes
let loy = 0;

////////////////////////////// 1 /////////////////
function intro() {
  let snowflakes = []; // 

  this.setup = function () {
    console.log("We are at setup for scene1");
    background("yellow");
    textAlign(CENTER);
    textSize(29);
  }

  // enter() will be called each time SceneManager switches to this scene
  this.enter = function () {
    console.log("We are at entering scene1");
    loy = 100;
    background("red");
  }

  this.draw = function () {
    background(0, 0, 255 - loy);

    // 
    for (let i = snowflakes.length - 1; i >= 0; i--) {
      let snow = snowflakes[i];
      fill(255);
      noStroke();
      ellipse(snow.x, snow.y, snow.size, snow.size);
      snow.y += snow.speed;

      // 
      if (snow.y > height) {
        snowflakes.splice(i, 1);
      }
    }

    // 
    if (random(1) < 0.2) {
      snowflakes.push({
        x: random(width),
        y: -10,
        size: random(5, 10),
        speed: random(1, 3),
      });
    }

    // 
    textAlign(CENTER);

    // 
    let flashColor = frameCount % 20 < 10 ? 255 : 100; // 
    fill(flashColor);

    // 
    let textSizeFactor = map(sin(frameCount * 0.02), -1, 1, 20, 29); // 
    textSize(textSizeFactor);

    push();
    translate(width / 2, loy * 3);

    text("Click Click Click", 0, 100);
    text("Continue the Quest", 0, 150);

    if (loy > 255) {
      loy = 0;
    } else {
      loy++;
    }
    pop();

  }

  this.mousePressed = function () {
    if (snd1.isPlaying()) {
      snd1.pause(); // stop
    } else {
      snd1.play(); // play
    }
    this.sceneManager.showNextScene();
  }
}


///////////////////////  2  ////////////////////////

function scene2() {
  let octo1, octo2;

  this.setup = function () {
    console.log("We are at setup for scene2");
    octo1 = new Octopi(400, 600, color(255, 0, 0), 0.40);
    octo2 = new Octopi(650, 200, color(0, 0, 0), 0.10);
  };

  this.enter = function () {
    console.log("We are at scene2 (again?)");
  };

  this.draw = function () {
    drawBlueGradientBackground();
    noStroke();
    octo1.update();
    octo1.display();
    octo2.update();
    octo2.display();
    fill(200);
    textAlign(CENTER, CENTER);
    text("Click the mouse to Escape", width / 2, height / 2);
    textAlign(CENTER, BOTTOM);
    textSize(16);
    fill(173, 216, 230);
    text("Mouse swings back and forth", width / 2, height - 10);
  };

  this.mouseDragged = function () {
    console.log("mouseDragged");
    octo1.moveupdate(300 - mouseX / 10, 240);
    octo2.moveupdate(650, 200);
  };

  this.keyPressed = function () {
    this.sceneManager.showNextScene();
  };
}


function drawBlueGradientBackground() {
  let startColor = color(173, 216, 230);
  let endColor = color(25, 25, 112);

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(startColor, endColor, inter);
    stroke(c);
    line(0, y, width, y);
  }
}



////////////////////////////// 3 /////////////////

function scene3() {
  let loy = 255;
  let particles = [];

  this.setup = function () {
    console.log("We are at setup for scene3");
  }

  this.enter = function () {
    loy = 255;
    console.log("We are entering scene3");
    wood.play();
  }

  this.draw = function () {
    // 
    background(100, 0, 255 - loy);
    textAlign(CENTER);
    textSize(29);

    // 
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      fill(p.color);
      noStroke();
      ellipse(p.x, p.y, p.size);
      p.x += p.vx;
      p.y += p.vy;
      p.lifespan -= 2;

      // 
      if (p.lifespan <= 0) {
        particles.splice(i, 1);
      }
    }

    // 
    if (random(1) < 0.3) {
      particles.push({
        x: random(width),
        y: random(height),
        size: random(5, 15),
        vx: random(-1, 1),
        vy: random(-1, 1),
        color: color(random(255), random(255), random(255), 200),
        lifespan: 255,
      });
    }

    // 
    push();
    translate(width / 2, loy * 3);

    // 
    let flashColor = frameCount % 20 < 10 ? 255 : 100; //
    fill(flashColor);

    // 
    let textSizeFactor = map(sin(frameCount * 0.02), -1, 1, 15, 29); // 
    textSize(textSizeFactor);

    text("Wiggle the mouse to get their attention...", 0, 100);
    text("Click the mouse to go back.", 0, 150);
    pop();


    if (loy < 0) {
      loy = 255;
    } else {
      loy--;
    }
    pop();
  }

  this.mousePressed = function () {
    mgr.showScene(scene2);
  }
}




////////////////////////////// 4 /////////////////

function scene4() {
  let button;

  this.setup = function () {
    console.log("We are at setup for scene4");
    background(100, 200, 150);
    textAlign(CENTER);
    textSize(30);
    text("Welcome to Scene 4", width / 2, height / 2 - 50);


    button = createButton('Click me to continue');
    button.position(width / 2 - 80, height / 2 + 50);
    button.mousePressed(buttonPressed);
  }

  this.enter = function () {
    console.log("Entering Scene 4");
  }

  this.draw = function () {
    fill(255);
    textSize(20);
    text("Press the button to proceed to the next scene", width / 2, height / 2 + 100);
  }


  function buttonPressed() {
    console.log("Button clicked, moving to the next scene");
    mgr.showNextScene();
  }
}

////////////////////////////// 5 /////////////////

function theend() {

  this.setup = function () {
    console.log("we are setting up on the result scene");
  }

  this.enter = function () {
    console.log("we are entering the result scene");
  }

  this.draw = function () {
    background(255, 0, 0);
    text("the result", width / 2, height / 2);
  }
}
