// draw onon
class Onon {
     constructor(x, y, s, shape, rotate, bounce, friction, jumpForce, walkSpeed) {
          this.setup(x, y, s, shape, rotate, bounce, friction, jumpForce, walkSpeed);
     }

     setup(x, y, s, shape, rotate, bounce, friction, jumpForce, walkSpeed) {

          this.size = s;
          this.headCheek = [];
          this.headEdge = [];
          this.body;
          this.thick = thickness * this.size / 10;
          this.stats = 'stand';
          this.onSurface = true;
          this.jumpForce = jumpForce * this.size;
          this.walkSpeed = walkSpeed * this.size;
          
          // the body
          if (shape < 3) this.body = Bodies.circle(x, y, this.size * 2, {isStatic: false, angle: 0});
          if (shape == 4) this.body = Bodies.rectangle(x, y, this.size * 4, this.size * 4, {isStatic: false, angle: 0});
          if (shape == 104) {
               this.body = Bodies.trapezoid(x, y, this.size * 3.2, this.size * 8, -0.7, {isStatic: false, angle: 0});
               Body.setCentre(this.body, createVector(0, this.size * 2.2), true);
               Body.setMass(this.body, this.body.mass / 2 * 0.8 / 6 * 4);
          }
          if (rotate == false) Body.setInertia(this.body, Infinity);
          this.body.restitution = bounce;
          this.body.friction = friction;

          World.add(engine.world, [this.body]);

          this.body.collisionFilter.group = 1;

     }

     draw() {

          push();

               strokeWeight(this.thick);
               fill(color(250, 250, 250, 0));

               arc(this.body.position.x, this.body.position.y - this.size * 4.5, this.size * 5, this.size * 5, radians(0), radians(180));

               arc(this.body.position.x - this.size * 2.5, this.body.position.y - this.size * 5.7, this.size * 4.5, this.size * 4.5, radians(180), radians(360));
               arc(this.body.position.x - this.size * 2.5, this.body.position.y - this.size * 5.7, this.size * 3, this.size * 3, radians(180), radians(360));
               arc(this.body.position.x - this.size * 2.5, this.body.position.y - this.size * 5.7, this.size * 1.5, this.size * 1.5, radians(180), radians(360));
               arc(this.body.position.x + this.size * 2.5, this.body.position.y - this.size * 5.7, this.size * 4.5, this.size * 4.5, radians(180), radians(360));
               arc(this.body.position.x + this.size * 2.5, this.body.position.y - this.size * 5.7, this.size * 3, this.size * 3, radians(180), radians(360));
               arc(this.body.position.x + this.size * 2.5, this.body.position.y - this.size * 5.7, this.size * 1.5, this.size * 1.5, radians(180), radians(360));

               line(this.body.position.x - this.size * 2.5, this.body.position.y - this.size * 4.5, 
                    this.body.position.x - this.size * 2.5, this.body.position.y - this.size * 5.7);
               line(this.body.position.x + this.size * 2.5, this.body.position.y - this.size * 4.5, 
                    this.body.position.x + this.size * 2.5, this.body.position.y - this.size * 5.7);

               push();
                    strokeWeight(this.thick * 2);
                    point(this.body.position.x - this.size * 1, this.body.position.y - this.size * 4.5);
                    point(this.body.position.x + this.size * 1, this.body.position.y - this.size * 4.5);
               pop();

               // the mouth
               arc(this.body.position.x, this.body.position.y - this.size * 4.5 + this.size * 0.6, this.size * 1.5, this.size * 1.5, radians(45), radians(135));

               line(this.body.position.x, this.body.position.y - this.size * 2,
                    this.body.position.x, this.body.position.y + this.size * 0.5);

               if (this.stats == 'stand') {
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                         this.body.position.x - this.size * 1, this.body.position.y - this.size * 0.5);
                    ellipse(this.body.position.x - this.size * 1.6, this.body.position.y - this.size * 0.2, this.size * 1);
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                         this.body.position.x + this.size * 1, this.body.position.y - this.size * 0.5);
                    ellipse(this.body.position.x + this.size * 1.6, this.body.position.y - this.size * 0.2, this.size * 1);
                    line(this.body.position.x, this.body.position.y + this.size * 0.5,
                         this.body.position.x - this.size * 1, this.body.position.y + this.size * 2);
                    line(this.body.position.x, this.body.position.y + this.size * 0.5,
                         this.body.position.x + this.size * 1, this.body.position.y + this.size * 2);
               } else if (this.stats == 'leftJump') {
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                         this.body.position.x - this.size * 1, this.body.position.y - this.size * 1.5);
                    ellipse(this.body.position.x - this.size * 1.6, this.body.position.y - this.size * 1.8, this.size * 1);
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                    this.body.position.x + this.size * 1, this.body.position.y - this.size * 1.5);
                    ellipse(this.body.position.x + this.size * 1.6, this.body.position.y - this.size * 1.8, this.size * 1);
                    line(this.body.position.x, this.body.position.y + this.size * 0.5,
                         this.body.position.x - this.size * 1, this.body.position.y);
                    line(this.body.position.x - this.size * 1, this.body.position.y,
                         this.body.position.x - this.size * 1.3, this.body.position.y + this.size * 1.1);
                    line(this.body.position.x, this.body.position.y + this.size * 0.5,
                         this.body.position.x + this.size * 1, this.body.position.y + this.size * 2);
                    if (gameStats == 0) {
                         push();
                              strokeWeight(this.thick / 2);
                              line(this.body.position.x + this.size * 1.4, this.body.position.y + this.size * 2.1,
                                   this.body.position.x + this.size * 1.8, this.body.position.y + this.size * 2.3);
                              line(this.body.position.x + this.size * 0.9, this.body.position.y + this.size * 2.4,
                                   this.body.position.x + this.size * 0.85, this.body.position.y + this.size * 2.9);
                              arc(this.body.position.x + this.size * 1.37, this.body.position.y + this.size * 2.68, this.size * 0.5, this.size * 0.5, radians(150), radians(330));
                              point(this.body.position.x + this.size * 1.45, this.body.position.y + this.size * 2.77);
                         pop();
                    }
               } else if (this.stats == 'rightJump') {
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                         this.body.position.x - this.size * 1, this.body.position.y - this.size * 1.5);
                    ellipse(this.body.position.x - this.size * 1.6, this.body.position.y - this.size * 1.8, this.size * 1);
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                    this.body.position.x + this.size * 1, this.body.position.y - this.size * 1.5);
                    ellipse(this.body.position.x + this.size * 1.6, this.body.position.y - this.size * 1.8, this.size * 1);
                    line(this.body.position.x, this.body.position.y + this.size * 0.5,
                         this.body.position.x + this.size * 1, this.body.position.y);
                    line(this.body.position.x + this.size * 1, this.body.position.y,
                         this.body.position.x + this.size * 1.3, this.body.position.y + this.size * 1.1);
                    line(this.body.position.x, this.body.position.y + this.size * 0.5,
                         this.body.position.x - this.size * 1, this.body.position.y + this.size * 2);
                    if (gameStats == 0) {
                         push();
                              strokeWeight(this.thick / 2);
                              line(this.body.position.x - this.size * 1.4, this.body.position.y + this.size * 2.1,
                                   this.body.position.x - this.size * 1.8, this.body.position.y + this.size * 2.3);
                              line(this.body.position.x - this.size * 0.9, this.body.position.y + this.size * 2.4,
                                   this.body.position.x - this.size * 0.85, this.body.position.y + this.size * 2.9);
                              arc(this.body.position.x - this.size * 1.37, this.body.position.y + this.size * 2.68, this.size * 0.5, this.size * 0.5, radians(210), radians(390));
                              point(this.body.position.x - this.size * 1.45, this.body.position.y + this.size * 2.77);
                         pop();
                    }
               } else if (this.stats == 'jump') {
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                         this.body.position.x - this.size * 1, this.body.position.y - this.size * 1.5);
                    ellipse(this.body.position.x - this.size * 1.6, this.body.position.y - this.size * 1.8, this.size * 1);
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                    this.body.position.x + this.size * 1, this.body.position.y - this.size * 1.5);
                    ellipse(this.body.position.x + this.size * 1.6, this.body.position.y - this.size * 1.8, this.size * 1);
                    line(this.body.position.x, this.body.position.y + this.size * 0.5,
                         this.body.position.x - this.size * 1, this.body.position.y);
                    line(this.body.position.x - this.size * 1, this.body.position.y,
                         this.body.position.x - this.size * 1.3, this.body.position.y + this.size * 1.1);
                    line(this.body.position.x, this.body.position.y + this.size * 0.5,
                         this.body.position.x + this.size * 1, this.body.position.y);
                    line(this.body.position.x + this.size * 1, this.body.position.y,
                         this.body.position.x + this.size * 1.3, this.body.position.y + this.size * 1.1);
                    if (gameStats == 0) {
                         push();
                              strokeWeight(this.thick / 2);
                              line(this.body.position.x + this.size * 1.65, this.body.position.y + this.size * 1.35,
                                   this.body.position.x + this.size * 1.85, this.body.position.y + this.size * 1.75);
                              line(this.body.position.x + this.size * 0.95, this.body.position.y + this.size * 1.35,
                                   this.body.position.x + this.size * 0.75, this.body.position.y + this.size * 1.75);
                              arc(this.body.position.x + this.size * 1.3, this.body.position.y + this.size * 1.75, this.size * 0.5, this.size * 0.5, radians(180), radians(360));
                              point(this.body.position.x + this.size * 1.3, this.body.position.y + this.size * 1.85);
                              line(this.body.position.x - this.size * 1.65, this.body.position.y + this.size * 1.35,
                                   this.body.position.x - this.size * 1.85, this.body.position.y + this.size * 1.75);
                              line(this.body.position.x - this.size * 0.95, this.body.position.y + this.size * 1.35,
                                   this.body.position.x - this.size * 0.75, this.body.position.y + this.size * 1.75);
                              arc(this.body.position.x - this.size * 1.3, this.body.position.y + this.size * 1.75, this.size * 0.5, this.size * 0.5, radians(180), radians(360));
                              point(this.body.position.x - this.size * 1.3, this.body.position.y + this.size * 1.85);
                         pop();
                    }
               } else if (this.stats == 'left') {
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                         this.body.position.x - this.size * 1.2, this.body.position.y - this.size * 1.2);
                    ellipse(this.body.position.x - this.size * 1.8, this.body.position.y - this.size * 1.3, this.size * 1);
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                         this.body.position.x + this.size * 0.9, this.body.position.y - this.size * 1.2);
                    line(this.body.position.x + this.size * 1, this.body.position.y - this.size * 1.2,
                         this.body.position.x + this.size * 0.9, this.body.position.y - this.size * 0.5);
                    ellipse(this.body.position.x + this.size * 0.8, this.body.position.y, this.size * 1);
                    push();
                    strokeWeight(this.thick / 10 * 8);
                    translate(this.body.position.x - this.size * 0.15, this.body.position.y + this.size * 1.25);
                    rotate(radians(30));
                    arc(0, 0, this.size * 2.6, this.size * 1.3, radians(90), radians(255));
                    arc(0, this.size * 0.2, this.size * 2, this.size * 0.9, radians(270), radians(450));
                    arc(0, 0, this.size * 1.5, this.size * 0.5, radians(30), radians(270));
                    pop();
               } else if (this.stats == 'right') {
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                         this.body.position.x + this.size * 1.2, this.body.position.y - this.size * 1.2);
                    ellipse(this.body.position.x + this.size * 1.8, this.body.position.y - this.size * 1.3, this.size * 1);
                    line(this.body.position.x, this.body.position.y - this.size * 1,
                         this.body.position.x - this.size * 0.9, this.body.position.y - this.size * 1.2);
                    line(this.body.position.x - this.size * 1, this.body.position.y - this.size * 1.2,
                         this.body.position.x - this.size * 0.9, this.body.position.y - this.size * 0.5);
                    ellipse(this.body.position.x - this.size * 0.8, this.body.position.y, this.size * 1);
                    push();
                         strokeWeight(this.thick / 10 * 8);
                         translate(this.body.position.x + this.size * 0.15, this.body.position.y + this.size * 1.25);
                         rotate(radians(-30));
                         arc(0, 0, this.size * 2.6, this.size * 1.3, radians(285), radians(450));
                         arc(0, this.size * 0.2, this.size * 2, this.size * 0.9, radians(90), radians(270));
                         arc(0, 0, this.size * 1.5, this.size * 0.5, radians(210), radians(510));
                    pop();
               }

          pop();

     }

}