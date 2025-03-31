
// This contains the use of both Scenemanager and P5.play
// Documentation and additional examples of these libraries can be found at:
//https://github.com/mveteanu/p5.SceneManager
//http://molleindustria.github.io/p5.play/


let image1_up, image2_over;
let snd1, snd2;
// var duration;
// var  slideWidth = 500;

// global manager object
var mgr;

// define your p5.play sprites that you want to use in more that 1 scene.
var ghosty;

function preload() {
    // sound should be loaded so its available for all places.
    snd1 = loadSound("assets/sousghost.mp3");
    snd2 = loadSound("assets/beatbox.mp3");
}

function setup() {
    createCanvas(600, 500);
    //console.log(hell);
    mgr = new SceneManager();

    ghosty = createSprite(0, 0);
    ghosty.addAnimation("normal", "assets/ghost_spin0001.png", "assets/ghost_spin0003.png");  // first image, and last image
    ghosty.addAnimation("stand", "assets/ghost_standing0001.png", "assets/ghost_standing0007.png"); // first image, and last image
    // make the sprite invisible until you need it.
    ghosty.visible = false;
    ghosty.scale = 0.18;

    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.
    mgr.addScene(splash);
    mgr.addScene(main);
    mgr.addScene(help);
    mgr.showNextScene();

}

function draw() {

    // passthe current draw function into the SceneManager
    mgr.draw();
}

function mousePressed() {
    // pass the mousePressed message into the SceneManager
    mgr.mousePressed();
}

function keyPressed() {
    // You can optionaly handle the key press at global level...
    switch (key) {
        case '1':
            mgr.showScene(splash);
            break;
        case '2':
            mgr.showScene(main);
            break;
        case '3':
            mgr.showScene(help);
            break;
        case 'h':
            mgr.showScene(help);
            break;
    }

    // ... then dispatch via the SceneManager.
    mgr.keyPressed();
}
