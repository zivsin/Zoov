// mouse and click control

function touchStarted() {touching = true;}
function touchEnded() {
    if (touches.length == 0) {
        touching = false;
    }
}
function mousePressed() {clicking = true;}
function mouseReleased() {clicking = false;}

function checkButton() {
    if (touches.length > 0 && touching == true) {
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].x < disWidth / 10 * 3 + (window.innerWidth - disWidth) / 2 && touches[i].y < disHeight / 100 * 7 + (window.innerHeight - disHeight) / 2) {
                window.location.href = "../index.html";
                touching = false;
            }
        }
    }

    if (clicking == true) {
        if (mouseX < disWidth / 10 * 3 + (window.innerWidth - disWidth) / 2 && mouseY < disHeight / 100 * 7 + (window.innerHeight - disHeight) / 2) {
            window.location.href = "../index.html";
            clicking = false;
        }
    }

    var buttonPressed = controlButton[0] + controlButton[1] + controlButton[2];

    if (gameStats == 0 && showInstructions == false && buttonPressed > 0) {
        if (controlButton[1] == 1) {
            if (character.onSurface == true) {
                Body.setVelocity(character.body, createVector(character.body.velocity.x, - character.jumpForce))
                character.onSurface = false;
            }
        } 
        if (controlButton[0] == 1) {
            Body.setVelocity(character.body, createVector(maxSpeed[0], character.body.velocity.y));
        } 
        if (controlButton[2] == 1) {
            Body.setVelocity(character.body, createVector(maxSpeed[1], character.body.velocity.y));
        }

    }

    if (character.onSurface == true){
        if (gameStats == 0 && showInstructions == false) {
            character.stats = 'stand';
            if (controlButton[0] == 1) {
                character.stats = 'left';
            } 
            if (controlButton[2] == 1) {
                character.stats = 'right';
            }
        }
    } else {
        if (gameStats == 0 && showInstructions == false) {
            character.stats = 'jump';
            if (controlButton[0] == 1) {
                character.stats = 'leftJump';
            }
            if (controlButton[2] == 1) {
                character.stats = 'rightJump';
            }
        }
    }

    if (showInstructions == true && buttonPressed > 0) {
        setTimeout(showIns, 500);
        touching = false;
    }
    
}

function showIns() {
    showInstructions = false;
}

// function touchStarted() {touching = true;}
// function touchEnded() {
//     if (touches.length == 0) {
//         touching = false;
//     }
// }
// function checkTouch() {
//     for (var i = 0; i < touches.length; i++) {
//         if (touches[i].x < disWidth / 10 * 3 + (window.innerWidth - disWidth) / 2 && touches[i].y < disHeight / 100 * 7 + (window.innerHeight - disHeight) / 2) {
//             window.location.href = "../index.html";
//             touching = false;
//         }

//         if (gameStats == 0 && showInstructions == false) {
//             if (touches[i].y > window.innerHeight * 0.8) {
//                 if (character.onSurface == true) {
//                     Body.setVelocity(character.body, createVector(character.body.velocity.x, - character.jumpForce))
//                     character.onSurface = false;
//                 }
//             } else if (touches[i].x < window.innerWidth * 0.5 && touches[i].y < window.innerHeight * 0.8) {
//                 // if (character.body.velocity.x > maxSpeed[0] && character.onSurface == false) {
//                 //     Body.setVelocity(character.body, createVector(character.body.velocity.x + maxSpeed[0] / 20, character.body.velocity.y));
//                 // }
//                 // if (character.onSurface == true) 
//                 Body.setVelocity(character.body, createVector(maxSpeed[0], character.body.velocity.y));
//             } else if (touches[i].x > window.innerWidth * 0.5 && touches[i].y < window.innerHeight * 0.8) {
//                 // if (character.body.velocity.x < maxSpeed[1] && character.onSurface == false) {
//                 //     Body.setVelocity(character.body, createVector(character.body.velocity.x + maxSpeed[1] / 20, character.body.velocity.y));
//                 // }
//                 // if (character.onSurface == true) 
//                 Body.setVelocity(character.body, createVector(maxSpeed[1], character.body.velocity.y));
//             }

//             if (character.onSurface == true){
//                 if (touches[i].x < window.innerWidth * 0.5 && touches[i].y < window.innerHeight * 0.8) {
//                     character.stats = 'left';
//                 } else if (touches[i].x > window.innerWidth * 0.5 && touches[i].y < window.innerHeight * 0.8) {
//                     character.stats = 'right';
//                 } else {
//                     if (character.stats != 'left' && character.stats != 'right') character.stats = 'stand';
//                 }
//             } else {
//                 if (touches[i].x < window.innerWidth * 0.5 && touches[i].y < window.innerHeight * 0.8) {
//                     character.stats = 'leftJump';
//                 } else if (touches[i].x > window.innerWidth * 0.5 && touches[i].y < window.innerHeight * 0.8) {
//                     character.stats = 'rightJump';
//                 } else {
//                     if (character.stats != 'leftJump' && character.stats != 'rightJump') character.stats = 'jump';
//                 }
//             }
//         }
//     }

//     if (showInstructions == true) {
//         showInstructions = false;
//         touching = false;
//     }
// }

// function mousePressed() {clicking = true;}
// function mouseReleased() {clicking = false;}
// function checkMouse() {
//     if (mouseX < disWidth / 10 * 3 + (window.innerWidth - disWidth) / 2 && mouseY < disHeight / 100 * 7 + (window.innerHeight - disHeight) / 2) {
//         window.location.href = "../index.html";
//         clicking = false;
//     }

//     if (gameStats == 0 && showInstructions == false) {
//         if (mouseY > window.innerHeight * 0.8) {
//             if (character.onSurface == true) {
//                 Body.setVelocity(character.body, createVector(character.body.velocity.x, - character.jumpForce))
//                 character.onSurface = false;
//             }
//         } else if (mouseX < window.innerWidth * 0.5 && mouseY < window.innerHeight * 0.8) {
//             // if (character.body.velocity.x > maxSpeed[0] && character.onSurface == false) {
//             //     Body.setVelocity(character.body, createVector(character.body.velocity.x + maxSpeed[0] / 20, character.body.velocity.y));
//             // }
//             // if (character.onSurface == true) 
//             Body.setVelocity(character.body, createVector(maxSpeed[0], character.body.velocity.y));
//         } else if (mouseX > window.innerWidth * 0.5 && mouseY < window.innerHeight * 0.8) {
//             // if (character.body.velocity.x < maxSpeed[1] && character.onSurface == false) {
//             //     Body.setVelocity(character.body, createVector(character.body.velocity.x + maxSpeed[1] / 20, character.body.velocity.y));
//             // }
//             // if (character.onSurface == true) 
//             Body.setVelocity(character.body, createVector(maxSpeed[1], character.body.velocity.y));
//         }

//         if (character.onSurface == true){
//             if (mouseX < window.innerWidth * 0.5 && mouseY < window.innerHeight * 0.8) {
//                 character.stats = 'left';
//             } else if (mouseX > window.innerWidth * 0.5 && mouseY < window.innerHeight * 0.8) {
//                 character.stats = 'right';
//             } else {
//                 if (character.stats != 'left' && character.stats != 'right') character.stats = 'stand';
//             }
//         } else {
//             if (mouseX < window.innerWidth * 0.5 && mouseY < window.innerHeight * 0.8) {
//                 character.stats = 'leftJump';
//             } else if (mouseX > window.innerWidth * 0.5 && mouseY < window.innerHeight * 0.8) {
//                 character.stats = 'rightJump';
//             } else {
//                 if (character.stats != 'leftJump' && character.stats != 'rightJump') character.stats = 'jump';
//             }
//         }
//     }

//     if (showInstructions == true) {
//         showInstructions = false;
//         clicking = false;
//     }
// }


// function checkKeyDown(character) {

//     if (gameStats == 0 && showInstructions == false) {

//         if (keyIsDown(UP_ARROW)) {
//             if (character.onSurface == true) {
//                 Body.setVelocity(character.body, createVector(character.body.velocity.x, - character.jumpForce))
//                 character.onSurface = false;
//             }
//         }

//         if (keyIsDown(LEFT_ARROW)) {
//             if (character.body.velocity.x > maxSpeed[0] && character.onSurface == false) {
//                 Body.setVelocity(character.body, createVector(character.body.velocity.x + maxSpeed[0] / 20, character.body.velocity.y));
//             }
//             if (character.onSurface == true) Body.setVelocity(character.body, createVector(maxSpeed[0], character.body.velocity.y));
//         } else if (keyIsDown(RIGHT_ARROW)) {
//             if (character.body.velocity.x < maxSpeed[1] && character.onSurface == false) {
//                 Body.setVelocity(character.body, createVector(character.body.velocity.x + maxSpeed[1] / 20, character.body.velocity.y));
//             }
//             if (character.onSurface == true) Body.setVelocity(character.body, createVector(maxSpeed[1], character.body.velocity.y));
//         }

//         if (character.onSurface == true){
//             if (keyIsDown(LEFT_ARROW)) {
//                 character.stats = 'left';
//             } else if (keyIsDown(RIGHT_ARROW)) {
//                 character.stats = 'right';
//             } else {
//                 character.stats = 'stand';
//             }
//         } else {
//             if (keyIsDown(LEFT_ARROW)) {
//                 character.stats = 'leftJump';
//             } else if (keyIsDown(RIGHT_ARROW)) {
//                 character.stats = 'rightJump';
//             } else {
//                 character.stats = 'jump';
//             }
//         }

//     }

// }