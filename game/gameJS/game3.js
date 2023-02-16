var platform;
var gameStart = false;
var gameObj = [];
var gameStats = 0;
var subGame = 0;
var gameObjExist = [];
var disappear = [];

function game3() {

    if (gameStart == false){

        Matter.Composite.translate(engine.world, createVector((window.innerWidth - disWidth) / -2, (window.innerHeight - disHeight) / -2), false);

            platform = Bodies.rectangle(disWidth / 2 , disHeight - 0.025 * disHeight, disWidth * 0.98, 0.05 * disHeight,{isStatic: true, inertia: Infinity, angle: 0});
            World.add(engine.world, [platform]);

            World.remove(engine.world, [environment.wallDown, environment.wallUp]);
            environment.wallDown = null;
            environment.wallUp = null;

            if (random() < 0.5) subGame = 1;

            if (subGame == 0) {
                engine.gravity.y = disHeight / 1150 * 1.5;
                character.jumpForce = 0.95 * character.size;

                var temp = 99;
                for (var j = 0; j < 3; j++) {
                    var randomRemoveNum = 98;
                    while (temp == randomRemoveNum || randomRemoveNum == 98) randomRemoveNum = Math.floor(random() * 4);
                    temp = randomRemoveNum;
                    for (var i = 0; i < 4; i++) {
                        gameObj.push(Bodies.rectangle(disWidth * 0.98 / 4 / 2 * (i * 2 + 1) + disWidth * 0.01, disHeight / 10 * (7.8 - 1.65 * j), disWidth *0.98 / 4, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
                        if (i == randomRemoveNum) {
                            gameObjExist.push(0);
                        } else {
                            gameObjExist.push(1);
                        }
                        disappear.push(0);
                    }
                }
            } else if (subGame == 1) {
                engine.gravity.y = disHeight / 1150 * 1.5;
                character.jumpForce = 0.95 * character.size;
                for (var j = 0; j < 3; j++) {
                    for (var i = 0; i < 4; i++) {
                        gameObj.push(Bodies.rectangle(disWidth * 0.98 / 4 / 2 * (i * 2 + 1) + disWidth * 0.01, disHeight / 10 * (7.8 - 1.65 * j), disWidth *0.98 / 4, disHeight / 10 * 0.15, {isStatic: true, inertia: Infinity, angle: 0}));
                        gameObjExist.push(1);
                        disappear.push(0);
                    }
                }
            }
            gameObj.push(Bodies.rectangle(disWidth / 10 * 1.5, disHeight / 10 * 2.8, disWidth / 10 * 3, disHeight / 10 * 0.2, {isStatic: true, inertia: Infinity, angle: 0}));
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
            if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 < gameObj[i].position.y) {
                gameObj[i].collisionFilter.group = 1;
                gameObj[i].collisionFilter.mask = 3;
            } else {
                gameObj[i].collisionFilter.group = 3;
                gameObj[i].collisionFilter.mask = 0;
            }
        }

        if (Matter.Collision.collides(character.body, gameObj[i])) {
            if (character.body.position.y + character.size * 2 + disHeight / 10 * 0.15 / 2 < gameObj[i].position.y && character.body.velocity.y >= 0) {
                // var k = i;
                // setTimeout(function() {World.remove(engine.world, [gameObj[k]]);
                //                        gameObjExist[k] = 0;}, 1500);
                if (disappear[i] == 0) disappear[i] = timeDelta_update;
            }
        }

        if (disappear[i] != 0 && timeDelta_update - disappear[i] >= 1.5 && gameObjExist[i] == 1) {
            World.remove(engine.world, [gameObj[i]]);
            gameObjExist[i] = 0;
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
                push();
                
                    var s = 0;
                    var c = 200;
                    if (disappear[i] != 0) {
                        s = (timeDelta_update - disappear[i]) * (250 / 1.6);
                        c = 200 - (timeDelta_update - disappear[i]) * (200 / 1.6);
                    }
                    if (subGame == 0) {
                        fill(212, 212, 212, c);
                    } else if (subGame == 1) {
                        fill(232, 232, 232, c);
                    }
                    stroke(s);
                    drawVertices(gameObj[i].vertices);

                pop();
            }
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