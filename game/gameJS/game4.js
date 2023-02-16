var platform;
var gameStart = false;
var gameObj = [];
var gameStats = 0;
var subGame = 0;
var ball = [];

function game4() {

    if (gameStart == false){

        Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / -2, (window.innerHeight - disHeight) / -2), false);

            platform = Bodies.rectangle(disWidth / 2 , disHeight - 0.025 * disHeight, disWidth / 4, 0.05 * disHeight,{isStatic: true, inertia: Infinity, angle: 0});
            World.add(engine.world, [platform]);

            World.remove(engine.world, [environment.wallDown, environment.wallUp]);
            environment.wallDown = null;
            environment.wallUp = null;

            if (random() < 0.5) subGame = 1;

            if (subGame == 0) {
                engine.gravity.y = disHeight / 1150 * 0.5;
                character.jumpForce = 0.55 * character.size;
                gameObj.push(Bodies.rectangle(disWidth / 2, disHeight / 10 * 7.8, disWidth / 10 * 2, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
                gameObj.push(Bodies.rectangle(disWidth / 2, disHeight / 10 * 6.15, disWidth / 10 * 2, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
                gameObj.push(Bodies.rectangle(disWidth / 2, disHeight / 10 * 4.5, disWidth / 10 * 2, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
            } else if (subGame == 1) {
                engine.gravity.y = disHeight / 1150 * 0.5;
                character.jumpForce = 0.55 * character.size;
                gameObj.push(Bodies.rectangle(disWidth / 2, disHeight / 10 * 7.8, disWidth / 10 * 2, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
                gameObj.push(Bodies.rectangle(disWidth / 2, disHeight / 10 * 6.15, disWidth / 10 * 2, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
                gameObj.push(Bodies.rectangle(disWidth / 2, disHeight / 10 * 4.5, disWidth / 10 * 2, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
            }
            gameObj.push(Bodies.rectangle(disWidth / 10 * 1.5, disHeight / 10 * 2.8, disWidth / 10 * 3, disHeight / 10 * 0.2, {isStatic: true, inertia: Infinity, angle: 0}));
            World.add(engine.world, gameObj);

        Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / 2, (window.innerHeight - disHeight) / 2), false);
        
    }
    gameStart = true;

    if (subGame == 0) {
        character.body.friction = 1;
    } else if (subGame == 1) {
        character.body.friction = 1;
    }
    for (var i = 0; i < gameObj.length; i++) {
        if (Matter.Collision.collides(character.body, gameObj[i])) {
            if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 > gameObj[i].position.y) {
                character.body.friction = 0;
            }
        }
    }

    for (var i = 0; i < gameObj.length - 1; i++) {
        if (gameStats == 0) {
            if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 < gameObj[i].position.y) {
                gameObj[i].collisionFilter.group = 1;
                gameObj[i].collisionFilter.mask = 3;
            } else {
                gameObj[i].collisionFilter.group = 3;
                gameObj[i].collisionFilter.mask = 2;
            }
        }
    }

    Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / -2, (window.innerHeight - disHeight) / -2), false);
        for (var i = 0; i < 3; i++) {
            var w = [0.95, -1];
            if (i == 1) w = [0.05, 1];
            if (subGame == 0) {
                if (Math.round((timeDelta % 3) * 10) == Math.round((0.3 + 1.2 * i) * 10) && timeDelta < timeDelta_update) {
                    ball.push(Bodies.circle(disWidth * w[0], disHeight / 10 * (7.8 - 1.65 * i - 0.5), disHeight / 10 * 0.2, {isStatic: false, angle: 0}));
                    World.add(engine.world, [ball[ball.length - 1]]);
                    Body.setVelocity(ball[ball.length - 1], createVector(disWidth * 0.02 * w[1], - 0.0037 * disHeight));
                    ball[ball.length - 1].restitution = 0.9;
                    ball[ball.length - 1].collisionFilter.group = 3;
                    Body.setMass(ball[ball.length - 1], ball[ball.length - 1].mass * 1.5);
                }
            } else if (subGame == 1) {
                if (random() < 0.03) {
                    ball.push(Bodies.circle(disWidth * w[0], disHeight / 10 * (7.8 - 1.65 * i - 0.5), disHeight / 10 * 0.05, {isStatic: false, angle: 0}));
                    World.add(engine.world, [ball[ball.length - 1]]);
                    Body.setVelocity(ball[ball.length - 1], createVector(disWidth * 0.02 * w[1], - 0.0037 * disHeight));
                    ball[ball.length - 1].restitution = 1;
                    ball[ball.length - 1].collisionFilter.group = 3;
                    Body.setMass(ball[ball.length - 1], ball[ball.length - 1].mass * 3);
                }
            }
        }
    Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / 2, (window.innerHeight - disHeight) / 2), false);

    for (var i = 0; i < ball.length; i++) {
        if (ball[i].position.y > window.innerHeight) {
            World.remove(engine.world, [ball[i]]);
            ball.splice(i, 1);
            i--;
        } else {
            push();
                stroke(30);
                fill(80);
                drawVertices(ball[i].vertices);
            pop();
        }
    }

    for (var i = 0; i < 3; i++) {
        var w = [0.95, -1, 15];
        if (i == 1) w = [0.05, 1, -15];
        push();
            stroke(30);
            fill(150);
            setLineDash([disWidth / 40, disWidth / 80]);
            rectMode(CENTER);
            translate((window.innerWidth - disWidth) / 2 + disWidth * w[0], (window.innerHeight - disHeight) / 2 + disHeight / 10 * (7.8 - 1.65 * i - 0.5));
            rotate(radians(w[2]));
            if (subGame == 0) {
                rect(0, 0, disWidth / 10 * 1.3, disHeight / 22);
            } else if (subGame == 1) {
                rect(0, 0, disWidth / 10 * 1.2, disHeight / 40);
            }
        pop();
    }

    push();
        fill(212, 212, 212, 200);
        strokeWeight(environment.thick);
        drawVertices(platform.vertices);
        drawVertices(gameObj[gameObj.length - 1].vertices);

        fill(232, 232, 232, 200);
        strokeWeight(environment.thick / 1.5);
        for (var i = 0; i < gameObj.length - 1; i++) {
            drawVertices(gameObj[i].vertices);
        }
    pop();

    onon.draw();
    ziv.draw();

    if (!(Matter.Collision.collides(character.body, platform))) {
        Body.setPosition(platform, createVector(platform.position.x, platform.position.y + disHeight * 0.0005));
    }

    if (character.body.position.y > disHeight * 0.96 + (window.innerHeight - disHeight) / 2 && gameStats == 0) lose();
    if (Matter.Collision.collides(ziv.body, onon.body) && Math.abs(ziv.body.position.y - onon.body.position.y) < disHeight / 1920 * 3 && gameStats == 0) win();
}