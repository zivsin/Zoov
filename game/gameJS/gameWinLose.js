function lose() {
    gameStats = -1;
    character.body.collisionFilter.group = 2;
    character.body.collisionFilter.mask = 0;
    character.body.frictionAir = 0;
    if (Math.round(engine.gravity.y / disHeight * 1150 * 10) / 10 == 1.5) {  
        Body.setVelocity(character.body, createVector(0, - engine.gravity.y * 35));
    } else if (Math.round(engine.gravity.y / disHeight * 1150 * 10) / 10 == 0.5) {  
        Body.setVelocity(character.body, createVector(0, - engine.gravity.y * 60));
    }
    engine.gravity.y = engine.gravity.y * 5;
    character.stats = 'jump';
    setTimeout(function() {window.location.href = "../game/game.html"}, 2500);
}

function win() {   
    character.body.isStatic = true;
    Body.setPosition(onon.body, createVector(onon.body.position.x, ziv.body.position.y));
    if (gameStats == 0) gameStats = 1;
    setTimeout(function() {
        onon.stats = 'left';
        ziv.stats = 'left';
    }, 0);
    setTimeout(function() {
        onon.stats = 'right';
        ziv.stats = 'right';
    }, 500);
    setTimeout(function() {
        onon.stats = 'leftJump';
        ziv.stats = 'leftJump';
    }, 1000);
    setTimeout(function() {
        onon.stats = 'rightJump';
        ziv.stats = 'rightJump';
    }, 1500);
    setTimeout(function() {
        onon.stats = 'stand';
        ziv.stats = 'stand';
    }, 2000);
    setTimeout(function() {
        onon.stats = 'jump';
        ziv.stats = 'jump';
    }, 2500);
    // setTimeout(function() {window.location.href = "../ARlinks/ARlinks.html"}, 3000);

    if (gameStats == 1) setTimeout(ARpage, 3000);
    gameStats = 99;
}

// Grey fill is hard
// black stroke keeps still
// Dashed line will fade

function ARpage() {
    Engine.clear(engine);
    canvas.remove();
    var elem1 = document.getElementById('buttonLeft');
    var elem2 = document.getElementById('buttonRight');
    var elem3 = document.getElementById('buttonUp');
    elem1.parentNode.removeChild(elem1);
    elem2.parentNode.removeChild(elem2);
    elem3.parentNode.removeChild(elem3);

    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "../ARlinks/ARlinks.html");
    ifrm.style.width = "100vw";
    ifrm.style.height = "95vh";
    document.body.appendChild(ifrm);
}