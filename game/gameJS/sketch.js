// all basic settings
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.Composite;
// var Composite = Matter.Composite;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var engine;
var canvas;

// choose game
var gameNum;
var gameOption;

// get the resolution
var disWidth;
var disHeight;

// constructors
var enviroment;
var onon;
var ziv;
var character;

// to control things when resolution changed
var thickness; // the stroke weight of the pen
var massControl; // adjust things weight

// the timer
var timerStart = Date.now();
var timerEnd;
var timeDelta = 0;
var timeDelta_update;

// var phoneRotate = 0;
// var phonePosition = 90;
var showInstructions = true;
// var imgRotate;
// var imgTouch;

var maxSpeed = [];
var lavaColorChange = 1;
var lava;
var c;

var touching = false;
var clicking = false;

var controlButton = [0, 0, 0];

function setup() {

    let buttonLeft = document.createElement("button");
    buttonLeft.innerHTML = "";
    buttonLeft.id = "buttonLeft";
    buttonLeft.zIndex = "99";
    document.body.appendChild(buttonLeft);
    buttonLeft.style.position = 'absolute';
    buttonLeft.style.top = '0vh';
    buttonLeft.style.left = '0vw';
    buttonLeft.style.height = '80vh';
    buttonLeft.style.width = '50vw';
    buttonLeft.style.background = "none";
    buttonLeft.style.border = "none";

    let buttonRight = document.createElement("button");
    buttonRight.innerHTML = "";
    buttonRight.id = "buttonRight";
    buttonRight.zIndex = "99";
    document.body.appendChild(buttonRight);
    buttonRight.style.position = 'absolute';
    buttonRight.style.top = '0vh';
    buttonRight.style.left = '50vw';
    buttonRight.style.height = '80vh';
    buttonRight.style.width = '50vw';
    buttonRight.style.background = "none";
    buttonRight.style.border = "none";

    let buttonUp = document.createElement("button");
    buttonUp.innerHTML = "";
    buttonUp.id = "buttonUp"
    buttonUp.zIndex = "99";
    document.body.appendChild(buttonUp);
    buttonUp.style.position = 'absolute';
    buttonUp.style.top = '80vh';
    buttonUp.style.left = '0vw';
    buttonUp.style.height = '20vh';
    buttonUp.style.width = '100vw';
    buttonUp.style.background = "none";
    buttonUp.style.border = "none";

    buttonLeft.addEventListener("touchstart", function() {controlButton[0] = 1;});
    buttonLeft.addEventListener("mousedown", function() {controlButton[0] = 1;});
    buttonLeft.addEventListener("touchend", function() {controlButton[0] = 0;});
    buttonLeft.addEventListener("mouseup", function() {controlButton[0] = 0;});

    buttonRight.addEventListener("touchstart", function() {controlButton[2] = 1;});
    buttonRight.addEventListener("mousedown", function() {controlButton[2] = 1;});
    buttonRight.addEventListener("touchend", function() {controlButton[2] = 0;});
    buttonRight.addEventListener("mouseup", function() {controlButton[2] = 0;});

    buttonUp.addEventListener("touchstart", function() {controlButton[1] = 1;});
    buttonUp.addEventListener("mousedown", function() {controlButton[1] = 1;});
    buttonUp.addEventListener("touchend", function() {controlButton[1] = 0;});
    buttonUp.addEventListener("mouseup", function() {controlButton[1] = 0;});

    // imgRotate = loadImage('../game/rotate.png');
    // imgTouch = loadImage('../game/touch.png');

    // // rewrite URL
    // window.history.pushState('zoov', '', '/misleadingURL/playing');

    // window.addEventListener("deviceorientation", handleOrientation, true);

    // get the resolution
    disWidth = window.innerWidth;
    disHeight = window.innerHeight;
    disHeight = Math.min(disHeight, disWidth / 1080 * 1920);
    disWidth = disHeight / 1920 * 1080;

    // create canvas and engine
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.style['-webkit-user-select'] = 'none';
    canvas.style['-webkit-touch-callout'] = 'none';
    canvas.style['-webkit-tap-highlight-color'] = 'rgba(255, 255, 255, 0)';
    canvas.style['-khtml-user-select'] = 'none';
    canvas.style['-moz-user-select'] = 'none';
    canvas.style['-ms-user-select'] = 'none';
    canvas.style['user-select'] = 'none';
    canvas.style['outline'] = 'none';
    canvas.onselectstart = function () {return false;}
    // canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation();}
    frameRate(60);
    pixelDensity(1); // 0.35 // 0.7
    engine = Engine.create(); 

    // adjustments for the resolution changes
    engine.gravity.y = 1 / 1600 * disWidth;
    thickness = ((disWidth)**0.2);
    massControl = ((disWidth)**0.5);

    // choosing game
    gameNum = 12;
    gameOption = Math.floor(Math.random() * gameNum / 2);

    // gameOption = 3;

    // consructor of things - General
    environment = new Environment();

    // construction of things - Game 0
    if (gameOption == 0) {
        onon = new Onon(disWidth / 4, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.1, 0.95, 0.25);
        ziv = new Ziv(disWidth / 4, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.1, 0.95, 0.25);
    } else if (gameOption == 1) {
        onon = new Onon(disWidth / 4, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.07, 0.95, 0.25);
        ziv = new Ziv(disWidth / 4, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.07, 0.95, 0.25);
    } else if (gameOption == 2) {
        onon = new Onon(disWidth / 4, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.1, 0.95, 0.25);
        ziv = new Ziv(disWidth / 4, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.1, 0.95, 0.25);
    } else if (gameOption == 3) {
        onon = new Onon(disWidth / 4, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.1, 0.95, 0.25);
        ziv = new Ziv(disWidth / 4, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.1, 0.95, 0.25);
    } else if (gameOption == 4) {
        onon = new Onon(disWidth / 2, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0.5 , 0.1, 0.95, 0.25);
        ziv = new Ziv(disWidth / 2, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0.5 , 0.1, 0.95, 0.25);
    } else if (gameOption == 5) {
        onon = new Onon(disWidth / 4 * 3, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.1, 0.95, 0.25);
        ziv = new Ziv(disWidth / 4 * 3, disHeight / 10 * 8.78, disWidth / 100 * 3, 104, false ,0 , 0.1, 0.95, 0.25);
    }
    if (random() < 0.5) {
        character = onon;
        Body.setPosition(ziv.body, createVector(disWidth / 10 * 1, disHeight / 10 * 2.35));
        ziv.body.isStatic = true;
        ziv.body.friction = 0;
    } else {
        character = ziv;
        Body.setPosition(onon.body, createVector(disWidth / 10 * 1, disHeight / 10 * 2.35));
        onon.body.isStatic = true;
        onon.body.friction = 0;
    }
    Matter.Detector.setBodies(engine.detector, [character.body]);
    maxSpeed.push( - character.walkSpeed);
    maxSpeed.push( + character.walkSpeed);

}

function draw() {

    Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / 2, (window.innerHeight - disHeight) / 2), false);

        // default colors
        background(color(250, 250, 250, 255));
        strokeWeight(thickness);
        stroke(color(0, 0, 0));
        fill(color(250, 250, 250, 255));

        // timer
        timerEnd = Date.now();
        timeDelta_update = Math.floor((timerEnd - timerStart) / 100) / 10; // in 0.1s

        // checkKeyDown(character);
        // moveCharacter(character);

        maxSpeed[0] = - character.walkSpeed * 1.1;
        maxSpeed[1] = + character.walkSpeed * 1.1;

        // game chooser
        if (gameOption == 0) {
            game0();
        } else if (gameOption == 1) {
            game1();
        } else if (gameOption == 2) {
            game2();
        } else if (gameOption == 3) {
            game3();
        } else if (gameOption == 4) {
            game4();
        } else if (gameOption == 5) {
            game5();
        }
        push();
            if (lavaColorChange == 1) {
                lava = ((timerEnd % 2000) / 2000 - 0.5) * 2;
            } else if (lavaColorChange == -1) {
                lava = (0.5 - (timerEnd % 2000) / 2000) * 2;
            }
            if (lava > +0.95) lavaColorChange = -1;
            if (lava < -0.95) lavaColorChange = 1;
            if (Math.abs(lava) < 0.95) c = lava * 45;
            if (c == null) c = 0;
            fill(120 + c, 120 + c, 120 + c, 150);
            noStroke();
            rect((window.innerWidth - disWidth) / 2, (window.innerHeight - disHeight) / 2 + disHeight * 0.985, disWidth, window.innerHeight);
        pop();
        environment.draw();

        character.onSurface = false;
        if (Matter.Detector.collisions(engine.detector)[0]) {
            for (var i = 0; i < Matter.Detector.collisions(engine.detector).length; i++) {
                if (Matter.Detector.collisions(engine.detector)[i].bodyA.id == character.body.id) {
                    if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 < Matter.Detector.collisions(engine.detector)[i].bodyB.position.y) {
                        if (Matter.Detector.collisions(engine.detector)[i].bodyB.id != environment.wallLeft.id && Matter.Detector.collisions(engine.detector)[i].bodyB.id != environment.wallRight.id) {
                            character.onSurface = true;
                        }
                    } 
                } else if (Matter.Detector.collisions(engine.detector)[i].bodyB.id == character.body.id) {
                    if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 < Matter.Detector.collisions(engine.detector)[i].bodyA.position.y) {
                        if (Matter.Detector.collisions(engine.detector)[i].bodyB.id != environment.wallLeft.id && Matter.Detector.collisions(engine.detector)[i].bodyB.id != environment.wallRight.id) {
                            character.onSurface = true;
                        }
                    }
                }
            }
        }

        // update timer and engine
        if (timeDelta < timeDelta_update) {
            timeDelta = timeDelta_update;
        }
        Engine.update(engine);

        if (showInstructions == true) {
            push();
                fill(212, 212, 212, 212);
                rect((window.innerWidth - disWidth) / 2, 0, disWidth / 2, window.innerHeight / 10 * 8);
                rect((window.innerWidth - disWidth) / 2 + disWidth / 2, 0, disWidth / 2, window.innerHeight / 10 * 8);
                rect((window.innerWidth - disWidth) / 2, window.innerHeight / 10 * 8, disWidth, window.innerHeight / 10 * 2);

                fill(50);
                noStroke();
                rectMode(CENTER);
                push();
                    translate((window.innerWidth - disWidth) / 2 + disWidth / 2, window.innerHeight / 10 * 9.3);
                    rect(0, 0, disWidth / 10 * 2, disWidth / 10);
                    triangle(0, window.innerHeight / 10 * - 1,
                             - disWidth / 10 * 1.7, window.innerHeight / 10 * - 0.2,
                             + disWidth / 10 * 1.7, window.innerHeight / 10 * - 0.2);
                    fill(212);
                    textSize(disWidth / 10 * 0.8);
                    textAlign(CENTER, CENTER);
                    textStyle(BOLD);
                    text('UP', 0, - disHeight * 0.02);
                pop();
                push();
                    translate((window.innerWidth - disWidth) / 2 + disWidth / 10 * 3, window.innerHeight / 10 * 3.75);
                    rotate(radians(-90));
                    rect(0, 0, disWidth / 10 * 1.4, disWidth / 10 * 1.4);
                    triangle(0, window.innerHeight / 10 * - 1,
                            - disWidth / 10 * 1.2, window.innerHeight / 10 * - 0.2,
                            + disWidth / 10 * 1.2, window.innerHeight / 10 * - 0.2);
                    rotate(radians(90));
                    fill(212);
                    textSize(disWidth / 10 * 0.6);
                    textAlign(CENTER, CENTER);
                    textStyle(BOLD);
                    text('LEFT', - disWidth / 10 * 0.3, disHeight / 10 * 0.05);
                pop();
                push();
                    translate((window.innerWidth - disWidth) / 2 + disWidth / 10 * 7, window.innerHeight / 10 * 3.75);
                    rotate(radians(90));
                    rect(0, 0, disWidth / 10 * 1.4, disWidth / 10 * 1.4);
                    triangle(0, window.innerHeight / 10 * - 1,
                            - disWidth / 10 * 1.2, window.innerHeight / 10 * - 0.2,
                            + disWidth / 10 * 1.2, window.innerHeight / 10 * - 0.2);
                    rotate(radians(-90));
                    fill(212);
                    textSize(disWidth / 10 * 0.6);
                    textAlign(CENTER, CENTER);
                    textStyle(BOLD);
                    text('RIGHT', disWidth / 10 * 0.35, disHeight / 10 * 0.05);
                pop();
                push();
                    translate(window.innerWidth / 2, window.innerHeight / 10 * 6.5);
                    stroke(50);
                    fill(212, 212, 212, 180);
                    strokeWeight(disWidth / 100 * 2);
                    ellipse(0, 0, disWidth / 10 * 7, disHeight / 10 * 1.8);
                    textSize(disWidth / 10 * 0.55);
                    textAlign(CENTER, CENTER);
                    textStyle(BOLD);
                    noStroke();
                    fill(50);
                    text('Touch Respective', 0, -disHeight / 10 * 0.2 + disHeight / 10 * 0.1);
                    text('Area To Move', 0, +disHeight / 10 * 0.2 + disHeight / 10 * 0.1);

                pop();
                // imageMode(CENTER);
                // image(imgRotate, (window.innerWidth - disWidth) / 2 + disWidth / 2, (window.innerHeight - disHeight) / 2 + disHeight / 10 * 6.5 , disWidth / 4 * 1.5, disWidth / 4 * 1.5);
                // image(imgTouch, (window.innerWidth - disWidth) / 2 + disWidth / 2 * 0.97, (window.innerHeight - disHeight) / 2 + disHeight / 10 * 3.5 , disWidth / 4 * 1.5 * 0.8, disWidth / 4 * 1.5 * 0.8 / 840 * 1000);
            pop();
        }

    Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / -2, (window.innerHeight - disHeight) / -2), false);

    // if (gameStats == 0) {
    //     if (character.onSurface == true){
    //         character.stats = 'stand';
    //     } else {
    //         character.stats = 'jump';
    //     }
    // }
    // if (touching == true && touches.length > 0) {
    //     checkTouch();
    // } else if (touching == true || clicking == true) {
    //     checkMouse();
    // }

    checkButton();

}