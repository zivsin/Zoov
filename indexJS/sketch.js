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

// get the resolution
var disWidth;
var disHeight;

// constructors
var onon;
var ziv;
var ship;

// to control things when resolution changed
var thickness; // the stroke weight of the pen
var massControl; // adjust things weight

// the timer
var timerStart = Date.now();
var timerEnd;
var timeDelta = 0;
var timeDelta_update;

var touching = false;
var clicking = false;

function setup() {

    // rewrite URL
    // window.history.pushState('zoov', '', '/misleadingURL/opening');

    // get the resolution
    disWidth = window.innerWidth;
    disHeight = window.innerHeight;
    disHeight = Math.min(disHeight, disWidth / 1080 * 1920);
    disWidth = disHeight / 1920 * 1080;

    // create canvas and engine
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    // canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation();}
    frameRate(60);
    pixelDensity(1); // 0.5 // 0.7
    engine = Engine.create(); 

    // adjustments for the resolution changes
    engine.gravity.y = 1 / 1600 * disWidth;
    thickness = ((disWidth)**0.2);
    massControl = ((disWidth)**0.5);

    // consructor of things
    onon = new Onon(disWidth * 30 / 100, disHeight * 15 / 100, disWidth / 100 * 3);
    ziv = new Ziv(disWidth * 62 / 100, onon.body[3].position.y, disWidth / 100 * 3);
    ship = new Ship(ziv.body[2].position.x, disHeight * 75 / 100, disWidth / 100 * 1.9)

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

        // draw
        onon.draw();
        ziv.draw();
        ship.draw();

        // motions
        if (timeDelta_update % 3 == 0) {
            onon.punch();
            ziv.punch();
        }

        // update timer and engine
        if (timeDelta < timeDelta_update) timeDelta = timeDelta_update;
        Engine.update(engine);

        strokeWeight(thickness * 3);
        rect(0, -0.1 * window.innerHeight, (window.innerWidth - disWidth) / 2, 1.2 * window.innerHeight);
        rect((window.innerWidth - disWidth) / 2 + disWidth, -0.1 * window.innerHeight, (window.innerWidth - disWidth) / 2, 1.2 * window.innerHeight);

    Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / -2, (window.innerHeight - disHeight) / -2), false);

    if (touching == true && touches.length > 0) {
        checkTouch();
    } else if (touching == true || clicking == true) {
        checkMouse();
    }

}

// mouse and click control
function touchStarted() {touching = true;}
function touchEnded() {touching = false;}
function checkTouch() {
    for (var i = 0; i < touches.length; i++) {
        if (dist(touches[i].x, touches[i].y, ship.body[0].position.x + ship.size * 4.5 + (window.innerWidth - disWidth) / 2, ship.body[0].position.y - ship.size * 9 + (window.innerHeight - disHeight) / 2) <= ship.size * 15 / 2) {
            window.location.href = "../game/game.html";
            touching = false;
        }
    }
}

function mousePressed() {clicking = true;}
function mouseReleased() {clicking = false;}
function checkMouse() {
    if (dist(mouseX, mouseY, ship.body[0].position.x + ship.size * 4.5 + (window.innerWidth - disWidth) / 2, ship.body[0].position.y - ship.size * 9 + (window.innerHeight - disHeight) / 2) <= ship.size * 15 / 2) {
        window.location.href = "../game/game.html";
        clicking = false;
    }
}