

let snd1, wood;  // sound
let ghosty;  // 
let mgr;  // SceneManager

function preload() {
    snd1 = loadSound("assets/beat.mp3");
    wood = loadSound("assets/wood.mp3");
    snd3 = loadSound("assets/sound3.mp3");
}

function setup() {
    createCanvas(800, 800);

    mgr = new SceneManager();  // scene

    // add
    mgr.addScene(intro);
    mgr.addScene(scene2);
    mgr.addScene(scene3);
    mgr.addScene(theend);

    mgr.showNextScene();  // first
}

function draw() {
    mgr.draw();  // 
}

function mousePressed() {
    mgr.mousePressed();  // 
}

function mouseMoved() {
    mgr.handleEvent("mouseMoved");
}

function mouseDragged() {
    mgr.handleEvent("mouseDragged");
}

function keyPressed() {
    switch (key) {
        case '1':
            mgr.showScene(intro);
            break;
        case '2':
            mgr.showScene(scene2);  //2
            break;
        case '3':
            mgr.showScene(scene3);  // 3
            break;
        case 'h':
        case 'H':
            mgr.showScene(scene3);
            break;
        case 'e':
            mgr.showScene(theend);
            break;
    }
    mgr.keyPressed();
}