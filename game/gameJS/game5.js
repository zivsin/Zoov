var platform;
var gameStart = false;
var gameObj = [];
var gameStats = 0;
var subGame = 0;
var gameObjExist = [];
var disappear = [];
var ball = [];
var hole = [];

function game5() {

    if (gameStart == false){

        Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / -2, (window.innerHeight - disHeight) / -2), false);

            platform = Bodies.rectangle(disWidth / 2 , disHeight - 0.025 * disHeight, disWidth * 0.98, 0.05 * disHeight,{isStatic: true, inertia: Infinity, angle: 0});
            World.add(engine.world, [platform]);

            World.remove(engine.world, [environment.wallDown, environment.wallUp]);
            environment.wallDown = null;
            environment.wallUp = null;

            if (random() < 0.5) subGame = 1;

            if (subGame == 0) {
                engine.gravity.y = disHeight / 1150 * 0.5;
                character.jumpForce = 0.55 * character.size;

                for (var j = 0; j < 3; j++) {
                    var removeNum = 0;
                    if (j == 1) removeNum = 3;
                    for (var i = 0; i < 4; i++) {
                        gameObj.push(Bodies.rectangle(disWidth * 0.98 / 4 / 2 * (i * 2 + 1) + disWidth * 0.01, disHeight / 10 * (7.8 - 1.65 * j), disWidth *0.98 / 4, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
                        if (i == removeNum) {
                            gameObjExist.push(0);
                        } else {
                            gameObjExist.push(1);
                        }
                        disappear.push(0);
                    }
                }
            } else if (subGame == 1) {
                engine.gravity.y = disHeight / 1150 * 0.5;
                character.jumpForce = 0.55 * character.size;

                var temp = 99;
                for (var j = 0; j < 3; j++) {
                    var chosenNum = 98;
                    while (temp == chosenNum || chosenNum == 98) chosenNum = Math.floor(random() * 4);
                    temp = chosenNum;
                    for (var i = 0; i < 4; i++) {
                        gameObj.push(Bodies.rectangle(disWidth * 0.98 / 4 / 2 * (i * 2 + 1) + disWidth * 0.01, disHeight / 10 * (7.8 - 1.65 * j), disWidth *0.98 / 4, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
                        if (i == chosenNum) {
                            hole.push(1);
                        } else {
                            hole.push(0);
                        }
                        gameObjExist.push(1);
                        disappear.push(0);
                    }
                }
            }
            gameObj.push(Bodies.rectangle(disWidth / 10 * 3, disHeight / 10 * 2.8, disWidth / 10 * 6, disHeight / 10 * 0.2, {isStatic: true, inertia: Infinity, angle: 0}));
            World.add(engine.world, [gameObj[gameObj.length - 1]]);
            for (var i = 0; i < gameObj.length - 1; i++) {
                if (gameObjExist[i] == 1) World.add(engine.world, [gameObj[i]]);
            }

        Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / 2, (window.innerHeight - disHeight) / 2), false);

    }
    gameStart = true;

    if (subGame == 0) {
        character.body.friction = 0;
    } else if (subGame == 1) {
        character.body.friction = 0;
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
            if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 > gameObj[i].position.y && hole[i] == 1) {
                gameObj[i].collisionFilter.group = 3;
                gameObj[i].collisionFilter.mask = 0;
            } else {
                gameObj[i].collisionFilter.group = 1;
                gameObj[i].collisionFilter.mask = 3;
            }
        }

        if (Matter.Collision.collides(character.body, gameObj[i])) {
            if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 < gameObj[i].position.y && character.body.velocity.y >= 0) {
                // var k = i;
                // setTimeout(function() {World.remove(engine.world, [gameObj[k]]);
                //                        gameObjExist[k] = 0;}, t);
                if (disappear[i] == 0) disappear[i] = timeDelta_update;
            }
        }

        var t = 3000;
        if (subGame == 1) t = 5000;
        if (disappear[i] != 0 && timeDelta_update - disappear[i] >= t / 1000 && gameObjExist[i] == 1) {
            World.remove(engine.world, [gameObj[i]]);
            gameObjExist[i] = 0;
        }
    }

    if (subGame == 0) {
        for (var i = 0; i < 3; i++) {
            var w = [0.95, -1];
            if (i == 1) w = [0.05, 1];
            if (subGame == 0) {
                Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / -2, (window.innerHeight - disHeight) / -2), false);
                    if (Math.round((timeDelta % 6) * 10) == Math.round((0.6 + 2.4 * i) * 10) && timeDelta < timeDelta_update) {
                        ball.push(Bodies.circle(disWidth * w[0], disHeight / 10 * (7.8 - 1.65 * i - 0.5), disHeight / 10 * 0.2, {isStatic: false, angle: 0}));
                        World.add(engine.world, [ball[ball.length - 1]]);
                        Body.setVelocity(ball[ball.length - 1], createVector(disWidth * 0.02 * w[1], - 0.0037 * disHeight));
                        ball[ball.length - 1].restitution = 0.9;
                        ball[ball.length - 1].collisionFilter.group = 3;
                        Body.setMass(ball[ball.length - 1], ball[ball.length - 1].mass * 30);
                    }
                Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / 2, (window.innerHeight - disHeight) / 2), false);
            }
        }

        for (var i = 0; i < ball.length; i++) {
            if (ball[i] != null) {

                for (var j = 0; j < Matter.Detector.collisions(engine.detector).length; j++) {
                    if (Matter.Detector.collisions(engine.detector)[0]) {
                        if (Matter.Detector.collisions(engine.detector)[j].bodyA.id == ball[i].id || Matter.Detector.collisions(engine.detector)[j].bodyB.id == ball[i].id) {
                            var k = i;
                            var t = 1000;
                            if (Matter.Detector.collisions(engine.detector)[j].bodyA.id == character.body.id || Matter.Detector.collisions(engine.detector)[j].bodyB.id == character.body.id) {
                                t = 100;
                                Body.setVelocity(character.body, createVector(character.body.velocity.x / 10, character.body.velocity.y));
                            }
                            setTimeout(function() {if (ball[k] != null) {
                                                        World.remove(engine.world, [ball[k]]);
                                                        ball[k] = null;}}, t);
                        }
                    }
                }

                if (ball[i].position.y > window.innerHeight) {
                    World.remove(engine.world, [ball[i]]);
                    ball[i] = null;
                } else {
                    push();
                        stroke(30);
                        fill(80);
                        setLineDash([disWidth / 50, disWidth / 100]);
                        drawVertices(ball[i].vertices);
                    pop();
                }
            }
        }

        for (var i = 0; i < 3; i++) {
            var w = [0.98, -1, 15];
            if (i == 1) w = [0.02, 1, -15];
            push();
                stroke(30);
                fill(150);
                setLineDash([disWidth / 40, disWidth / 80]);
                rectMode(CENTER);
                translate((window.innerWidth - disWidth) / 2 + disWidth * w[0], (window.innerHeight - disHeight) / 2 + disHeight / 10 * (7.8 - 1.65 * i - 0.45));
                rotate(radians(w[2]));
                if (subGame == 0) {
                    rect(0, 0, disWidth / 10 * 0.8, disHeight / 22);
                }
            pop();
        }

    }

    push();
        fill(212, 212, 212, 200);
        strokeWeight(environment.thick);
        drawVertices(platform.vertices);
        drawVertices(gameObj[gameObj.length - 1].vertices);

        setLineDash([disWidth / 50, disWidth / 50]);

        strokeWeight(environment.thick / 1.5);
        for (var i = 0; i < gameObj.length - 1; i++) {
            if (gameObjExist[i] == 1) {

                if (subGame == 0) {
                    push();
                        var s = 0;
                        var c = 200;
                        if (disappear[i] != 0) {
                            s = (timeDelta_update - disappear[i]) * (250 / 3.2);
                            c = 200 - (timeDelta_update - disappear[i]) * (200 / 3.2);
                        }
                        fill(212, 212, 212, c);
                        stroke(s);
                        drawVertices(gameObj[i].vertices);

                    pop();
                } else if (subGame == 1) {
                    push();
                        var s = 0;
                        var c = 200;
                        if (disappear[i] != 0) {
                            s = (timeDelta_update - disappear[i]) * (250 / 5.4);
                            c = 200 - (timeDelta_update - disappear[i]) * (200 / 5.4);
                        }
                        if (hole[i] == 1) {
                            fill(232, 232, 232, c);
                        } else {
                            fill(212, 212, 212, c);
                        }
                        stroke(s);
                        drawVertices(gameObj[i].vertices);

                    pop();
                }
            }
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