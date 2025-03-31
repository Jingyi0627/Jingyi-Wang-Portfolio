

// example 5

// This uses the transformation matrix tools to move,
//rotate and scale things as batch operations
// 16 x 16
let gridarr1 = [
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0],
  [0, 0, 1, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 1, 0, 0],
  [0, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 0],
  [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1],
  [1, 3, 3, 3, 4, 4, 3, 3, 3, 3, 4, 4, 3, 3, 3, 1],
  [1, 3, 3, 4, 0, 0, 4, 3, 3, 4, 0, 0, 4, 3, 3, 1],
  [1, 3, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 3, 1],
  [1, 3, 4, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 4, 3, 1],
  [1, 3, 3, 4, 0, 0, 4, 3, 3, 4, 0, 0, 4, 3, 3, 1],
  [1, 3, 3, 3, 4, 4, 3, 3, 3, 3, 4, 4, 3, 3, 3, 1],
  [0, 1, 2, 3, 3, 3, 3, 1, 1, 3, 3, 3, 3, 2, 1, 0],
  [0, 0, 1, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 1, 0, 0],
  [0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];


let gridarr2 = [
  [0, 0, 0, 0, 0, 1, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 1, 1, 1, 3, 3, 3, 3, 2, 2, 2, 3, 4, 4, 4],
  [0, 0, 1, 1, 3, 3, 1, 3, 1, 3, 2, 2, 4, 4, 4, 4],
  [0, 0, 0, 1, 3, 1, 0, 1, 0, 1, 2, 4, 4, 4, 4, 4],
  [0, 0, 0, 0, 3, 3, 1, 3, 1, 3, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 2, 2, 0, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 2, 2, 3, 3, 3, 3, 1, 0, 0, 0, 4, 0, 0],
  [0, 0, 2, 2, 3, 2, 3, 1, 1, 3, 1, 0, 0, 4, 0, 0],
  [0, 2, 2, 0, 0, 2, 2, 1, 1, 0, 1, 1, 0, 4, 0, 0],
  [0, 0, 2, 2, 0, 1, 1, 2, 1, 0, 0, 1, 1, 4, 0, 0],
  [0, 0, 0, 2, 1, 2, 1, 2, 2, 0, 0, 0, 1, 2, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 0, 0, 0, 4, 0, 0],
  [0, 0, 0, 0, 2, 1, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
];

let gridarr3 = [
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [4, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 4],
  [4, 0, 1, 2, 7, 7, 7, 2, 2, 7, 7, 7, 2, 1, 0, 4],
  [4, 0, 1, 7, 6, 6, 6, 7, 7, 6, 6, 6, 7, 1, 0, 4],
  [4, 0, 1, 7, 6, 8, 6, 7, 7, 6, 8, 6, 7, 1, 0, 4],
  [4, 0, 1, 7, 6, 6, 6, 7, 7, 6, 6, 6, 7, 1, 0, 4],
  [4, 4, 1, 8, 7, 7, 7, 2, 2, 7, 7, 7, 8, 1, 4, 4],
  [0, 0, 1, 2, 8, 2, 2, 2, 2, 2, 2, 8, 2, 1, 0, 0],
  [0, 0, 1, 2, 2, 8, 8, 8, 8, 8, 8, 2, 2, 1, 0, 0],
  [0, 0, 1, 2, 2, 2, 7, 2, 2, 7, 2, 2, 2, 1, 0, 0],
  [0, 0, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 0],
  [0, 0, 1, 0, 1, 4, 1, 0, 1, 4, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 7, 0, 0, 0, 7, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 5, 5, 5, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
];


// 16 x 16
let textarr = [
  ["robot", "robot", "robot", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "red", "red", "robot", "red", "red", "robot", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "red", "red", "robot", "red", "red", "robot", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "red", "red", "red", "red", "red", "red", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "robot", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "red", "red", "red", "red", "red", "red", "red", "red", "red", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "red", "robot", "red", "robot", "red", "robot", "red", "robot", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "red", "robot", "red", "robot", "red", "robot", "red", "robot", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "red", "robot", "red", "robot", "red", "robot", "red", "robot", "robot", "robot", "robot"],
  ["robot", "robot", "robot", "red", "robot", "red", "robot", "red", "robot", "red", "robot", "red", "robot", "robot", "robot", "robot"]
];


let font1;
let images = [];

let currentPage = 0;

function preload() {
  font1 = loadFont('assets/oswald.ttf');
  images[0] = loadImage('assets/pizza.png');
  images[1] = loadImage('assets/pineapple.png');
  images[2] = loadImage('assets/tomato.png');
  images[3] = loadImage('assets/mushroom.png');
}

function setup() {
  createCanvas(800, 700);
  background(0, 60, 150);
  fill(100);
  textAlign(LEFT);
  textFont(font1);

}

function draw() {
  background(0, 15);

  if (currentPage == 1) {
    //2darr, x,y,rot,scale, alpha
    mapToMonoPixels(gridarr1, -30, -20, 0, 8, 40);
    mapToMonoPixels(gridarr1, 50, 50, 45, 1.5, 150);
    mapToMonoPixels(gridarr1, 580, 20, 20, 1.25, 100);
    mapToColorPixels(gridarr1, 220, 290, 45, 1.15, 255);
    mapToColorPixels(gridarr1, 460, 260, -45, .45, 255);

    push();
    translate(50, 30);
    fill(200);
    textSize(20);
    let t = "This is my original robot character."
    text(t, 0, 0, 300);  // the 4th argument is the textWidth per line.
    pop();


  } else if (currentPage == 2) {

    mapToColorShapes(gridarr2, -30, 0, 0, 9, 8);
    mapToColorPixels(gridarr1, 520, 260, 45, 2.15, 255);
    mapToColorShapes(gridarr2, 120, 480, 0, 0.65, 255);
    mapToColorShapes(gridarr2, 270, 180, -25, 1.2, 120);
    mapToColorText(textarr, 450, 50, -15, 0.45, 175);
    mapToColorText(textarr, 10, 350, 10, 1.55, 255);

    push();
    translate(40, 50);
    fill(200);
    textSize(20);
    let t = "Our theme is pixel characters, and this is my text array to describe this page."
    text(t, 0, 0, 300);
    pop();


  } else if (currentPage == 3) {
    mapToTintedBitMaps(gridarr2, images, -400, 0, -20, 10.85, 7);
    mapToBitMaps(gridarr2, images, 100, 130, -3, 1.55);
    mapToTintedBitMaps(gridarr2, images, 400, 120, 0, 2.85, 190);
    push();
    translate(40, 50);
    fill(200);
    textSize(20);
    let t = "This contains the arrays from the groupmates, and I also made some changes to these.";
    t += "\n";   // this is a command you can put in text to create a line break.;
    text(t, 0, 0, 400);
    pop();

  } else {

    push();
    translate(80, 100);
    fill(200);
    textSize(40);
    text("My groups memebers were Nabeeha, \nKhoa, and Jupiter", 0, 0, 800);
    translate(0, 120);
    text("I have 8 mapped images, copied at least twice \nfor a total of more than 16.", 0, 0, 800);
    translate(250, 120);
    mapToColorPixels(gridarr1, 0, 0, 0, .45, 255);
    pop();

  }




}


function keyPressed() {


  //console.log(key);
  // or 
  if (key == '1') {
    console.log("Page 1");
    currentPage = 1;

  } else if (key == '2') {
    console.log("Page 2");
    currentPage = 2;

  } else if (key == '3') {
    console.log("Page 3");
    currentPage = 3;
  } else {
    currentPage = 0;

  }

}



// the map functions.



//2darr, x,y,rot,scale, alpha
function mapToMonoPixels(arr, lx, ly, rot, sc, fade) {
  push();
  translate(lx, ly);
  rotate(radians(rot));
  scale(sc);
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      fill(arr[i][j] * 128, fade);
      rect(j * 12, i * 12, 10, 10);
    }
  }
  pop();

}

//x,y,rot,scale, alpha
function mapToColorPixels(arr, lx, ly, rot, sc, fade) {
  push();
  translate(lx, ly);
  rotate(radians(rot));
  scale(sc);
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      let value = arr[i][j];
      if (value == 0) {
        fill(200, 70, 0, fade);
      } else if (value == 1) {
        fill(0, fade);
      } else if (value == 2) {
        fill(90, 30, 90, fade);
      } else {
        fill(20, 220, 250, fade);

      }
      rect(j * 12, i * 12, 10, 10);
    }
  }
  pop();

}

function mapToColorShapes(arr, lx, ly, rot, sc, fade) {
  push();
  translate(lx, ly);
  rotate(radians(rot));
  scale(sc);
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      let value = arr[i][j];
      if (value == 0) {
        fill(200, 70, 0, fade);
        ellipse(j * 12, i * 12, 10, 10);
      } else if (value == 1) {
        fill(50, 0, 30, fade);
        rect(j * 12 - 6, i * 12 - 6, 10, 10, 2);
      } else {
        fill(0, 150, 0, fade);
        ellipse(j * 12, i * 12, 15, 10, 5);
      }
    }
  }
  pop();

}

function mapToColorText(arr, lx, ly, rot, sc, fade) {
  textSize(15);
  textAlign(CENTER);
  push();
  translate(lx, ly);
  rotate(radians(rot));
  scale(sc);
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      let value = arr[i][j];
      if (value == "money") {
        fill(20, 170, 0, fade);
      } else if (value == "blood") {
        fill(200, 0, 30, fade);
      } else {
        fill(255, fade);
      }
      text(value, j * 35, i * 10, 100);
      //rect( j * 35, i * 10,100,100);
    }
  }
  pop();

}

//2darray,images in array ,x,y,rot,scale, alpha
function mapToBitMaps(arr, imgarr, lx, ly, rot, sc) {
  push();
  translate(lx, ly);
  rotate(radians(rot));
  scale(sc);
  let nuimg;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      let value = arr[i][j];
      if (value == 0) {
        nuimg = imgarr[0];
      } else if (value == 1) {
        nuimg = imgarr[2];
      } else if (value == 2) {
        nuimg = imgarr[1];
      } else {
        nuimg = imgarr[3];
      }
      image(nuimg, j * 12, i * 12, 14, 14);
    }
  }
  pop();

}

//2darray,images in array ,x,y,rot,scale, alpha
function mapToTintedBitMaps(arr, imgarr, lx, ly, rot, sc, fade) {
  push();
  translate(lx, ly);
  rotate(radians(rot));
  scale(sc);
  let nuimg;
  let c;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[0].length; j++) {
      let value = arr[i][j];
      if (value == 0) {
        nuimg = imgarr[3];
        c = color(255, 100, 0, fade);
      } else if (value == 1) {
        c = color(255, 0, 255, fade);
        nuimg = imgarr[2];
      } else if (value == 2) {
        nuimg = imgarr[1];
        c = color(20, 200, 120, fade);
      } else {
        nuimg = imgarr[0];
        c = color(120, 0, 240, fade);
      }

      c = color(255, fade);
      tint(c);
      image(nuimg, j * 9, i * 9, 15, 15);
    }
  }
  pop();

}
