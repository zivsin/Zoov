// draw connect each vertice of a body
function drawVertices(vertices) {
    beginShape();
        for (var i = 0; i < vertices.length; i++) {
            vertex(vertices[i].x, vertices[i].y);
        }
    endShape(CLOSE);
}

// draw constraint
function drawConstraint(constraint) {

    var offsetA = constraint.pointA;
    var posA = {x: 0, y: 0};
    if (constraint.bodyA) posA = constraint.bodyA.position;

    var offsetB = constraint.pointB;
    var posB = {x: 0, y: 0};
    if (constraint.bodyB) posB = constraint.bodyB.position;

    line(posA.x + offsetA.x, posA.y + offsetA.y,
         posB.x + offsetB.x, posB.y + offsetB.y);

}

function setLineDash(list) {
    drawingContext.setLineDash(list);
}

// function handleOrientation(event) {
//     const alpha = event.alpha;
//     const beta = event.beta;
//     phoneRotate = alpha;
//     phonePosition = beta;
// }

// function moveCharacter(character) {
//     if (gameStats == 0 && showInstructions == false) {

//         var walkScale = 0;

//         if (phoneRotate > 272.5 && phoneRotate < 360) {
//             walkScale = - (phoneRotate - 270) / 60;  
//         } else if (phoneRotate > 180 && phoneRotate < 267.5) {
//             walkScale = + (270 - phoneRotate) / 60;
//         }
//         if (phonePosition > 30 & phonePosition <= 90) {
//             walkScale *= (1 + 1.5 * (90 - phonePosition) / 60);
//         } else if (phonePosition > 90 & phonePosition < 150) {
//             walkScale *= (-1 - 1.5 * (phonePosition - 90) / 60);
//         } else {
//             walkScale = 0;
//         }

//         if (character.body.velocity.x > - Math.abs(walkScale * maxSpeed[0]) && character.onSurface == false && walkScale < 0) {
//             Body.setVelocity(character.body, createVector(character.body.velocity.x + walkScale * Math.abs(maxSpeed[0]) / 15, character.body.velocity.y));
//         } else if (character.body.velocity.x < + Math.abs(walkScale * maxSpeed[1]) && character.onSurface == false && walkScale > 0) {
//             Body.setVelocity(character.body, createVector(character.body.velocity.x + walkScale * Math.abs(maxSpeed[1]) / 15, character.body.velocity.y));
//         }
//         if (character.onSurface == true && walkScale < 0) {
//             Body.setVelocity(character.body, createVector(walkScale * Math.abs(maxSpeed[0]), character.body.velocity.y));
//         } else if (character.onSurface == true && walkScale > 0) {
//             Body.setVelocity(character.body, createVector(walkScale * Math.abs(maxSpeed[1]), character.body.velocity.y));
//         }

//         if (character.onSurface == true){
//             if (phoneRotate > 272.5 && phoneRotate < 360) {
//                 if (phonePosition > 30 & phonePosition <= 90) character.stats = 'left';
//                 if (phonePosition > 90 & phonePosition < 150) character.stats = 'right';
//             } else if (phoneRotate > 180 && phoneRotate < 267.5) {
//                 if (phonePosition > 30 & phonePosition <= 90) character.stats = 'right';
//                 if (phonePosition > 90 & phonePosition < 150) character.stats = 'left';
//             } else {
//                 character.stats = 'stand';
//             }
//         } else {
//             if (phoneRotate > 272.5 && phoneRotate < 360) {
//                 if (phonePosition > 30 & phonePosition <= 90) character.stats = 'leftJump';
//                 if (phonePosition > 90 & phonePosition < 150) character.stats = 'rightJump';
//             } else if (phoneRotate > 180 && phoneRotate < 267.5) {
//                 if (phonePosition > 30 & phonePosition <= 90) character.stats = 'rightJump';
//                 if (phonePosition > 90 & phonePosition < 150) character.stats = 'leftJump';
//             } else {
//                 character.stats = 'jump';
//             }
//         }

//     }

// }


