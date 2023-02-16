var platform;
var gameStart = false;
var gameObj = [];
var gameStats = 0;
var subGame = 0;
var gameObjMovement = [-1, 1, -1];
var gameObjMoveSpeed;

function game1() {

    if (gameStart == false){

        Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / -2, (window.innerHeight - disHeight) / -2), false);

            platform = Bodies.rectangle(disWidth / 4 , disHeight - 0.025 * disHeight, disWidth / 4, 0.05 * disHeight,{isStatic: true, inertia: Infinity, angle: 0});
            World.add(engine.world, [platform]);

            World.remove(engine.world, [environment.wallDown, environment.wallUp]);
            environment.wallDown = null;
            environment.wallUp = null;

            if (random() < 0.5) subGame = 1;

            if (subGame == 0) {
                engine.gravity.y = disHeight / 1150 * 1.5;
                character.jumpForce = 0.95 * character.size;
                gameObj.push(Bodies.rectangle(disWidth * 0.3 + disWidth * 0.2 * random(), disHeight / 10 * 7.8, disWidth / 10 * 2, disHeight / 10 * 0.15, {isStatic: false, inertia: Infinity, angle: 0}));
                gameObj.push(Bodies.rectangle(disWidth * 0.15 + disWidth * 0.2 * random(), disHeight / 10 * 6.15, disWidth / 10 * 2.5, disHeight / 10 * 0.15, {isStatic: false, inertia: Infinity, angle: 0}));
                gameObj.push(Bodies.rectangle(disWidth * 0.6 + disWidth * 0.2 * random(), disHeight / 10 * 4.5, disWidth / 10 * 3, disHeight / 10 * 0.15, {isStatic: false, inertia: Infinity, angle: 0}));
                gameObjMoveSpeed = 2;
            } else if (subGame == 1) {
                engine.gravity.y = disHeight / 1150 * 0.5;
                character.jumpForce = 0.55 * character.size;
                gameObj.push(Bodies.rectangle(disWidth * 0.65 + disWidth * 0.2 * random(), disHeight / 10 * 7.8, disWidth / 10 * 1, disHeight / 10 * 0.15, {isStatic: false, inertia: Infinity, angle: 0}));
                gameObj.push(Bodies.rectangle(disWidth * 0.15 + disWidth * 0.2 * random(), disHeight / 10 * 6.15, disWidth / 10 * 1.25, disHeight / 10 * 0.15, {isStatic: false, inertia: Infinity, angle: 0}));
                gameObj.push(Bodies.rectangle(disWidth * 0.4 + disWidth * 0.2 * random(), disHeight / 10 * 4.5, disWidth / 10 * 1.5, disHeight / 10 * 0.15, {isStatic: false, inertia: Infinity, angle: 0}));
                gameObjMoveSpeed = 1.5;
            }
            gameObj.push(Bodies.rectangle(disWidth / 10 * 1.5, disHeight / 10 * 2.8, disWidth / 10 * 3, disHeight / 10 * 0.2, {isStatic: true, inertia: Infinity, angle: 0}));
            World.add(engine.world, gameObj);

        Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / 2, (window.innerHeight - disHeight) / 2), false);

    }
    gameStart = true;

    if (subGame == 0) {
        character.body.friction = 0.01;
    } else if (subGame == 1) {
        character.body.friction = 0.5;
    }
    for (var i = 0; i < gameObj.length; i++) {
        if (Matter.Collision.collides(character.body, gameObj[i])) {
            if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 > gameObj[i].position.y) {
                character.body.friction = 0;
            }
        }
    }

    for (var i = 0; i < gameObj.length - 1; i++) {
        if (subGame == 1 && gameStats == 0) {
            if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 < gameObj[i].position.y) {
                gameObj[i].collisionFilter.group = 1;
                gameObj[i].collisionFilter.mask = 3;
            } else {
                gameObj[i].collisionFilter.group = 3;
                gameObj[i].collisionFilter.mask = 0;
            }
        }

        if (gameObj[i].position.x > (window.innerWidth - disWidth) / 2 + 0.85 * disWidth) gameObjMovement[i] = -1;
        if (gameObj[i].position.x < (window.innerWidth - disWidth) / 2 + 0.15 * disWidth) gameObjMovement[i] = 1;
        Body.setVelocity(gameObj[i], createVector(gameObjMovement[i] * gameObjMoveSpeed**i, - 0.5 * engine.gravity.y));
            if (Matter.Collision.collides(character.body, gameObj[i])) {
                if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 < gameObj[i].position.y) {
                    maxSpeed[0] += gameObj[i].velocity.x;
                    maxSpeed[1] += gameObj[i].velocity.x;
                    Body.setPosition(character.body, createVector(character.body.position.x + gameObj[i].velocity.x * 0.04, character.body.position.y));
                }
            }
        Body.setPosition(gameObj[i], createVector(gameObj[i].position.x, (window.innerHeight - disHeight) / 2 + disHeight / 10 * (7.8 - 1.65 * i)));
    }

    push();
        fill(212, 212, 212, 200);
        strokeWeight(environment.thick);
        drawVertices(platform.vertices);
        drawVertices(gameObj[gameObj.length - 1].vertices);

        if (subGame == 0) {
            fill(212, 212, 212, 200);
        } else if (subGame == 1) {
            fill(232, 232, 232, 200);
        }
        strokeWeight(environment.thick / 1.5);
        for (var i = 0; i < gameObj.length - 1; i++) {
            drawVertices(gameObj[i].vertices);
        }
    pop();

    onon.draw();
    ziv.draw();

    if (!(Matter.Collision.collides(character.body, platform))) {
        Body.setPosition(platform, createVector(platform.position.x, platform.position.y + disHeight * 0.002));
    }

    if (character.body.position.y > disHeight * 0.96 + (window.innerHeight - disHeight) / 2 && gameStats == 0) lose();
    if (Matter.Collision.collides(ziv.body, onon.body) && Math.abs(ziv.body.position.y - onon.body.position.y) < disHeight / 1920 * 3 && gameStats == 0) win();
}