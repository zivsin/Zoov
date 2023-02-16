// the ship
class Ship {
    constructor(x, y, s) {
        this.setup(x, y, s);
    }

    setup(x, y, s) {

        this.size = s;
        this.body = [];
        this.bodyIsStatic = false;
        this.bodyStiffness = 0.1;
        this.bodyDamping = 0.0001;
        this.constraint = [];
        this.thick = thickness * this.size / 5;
        this.hang_L;
        this.hang_R;
        this.hangStiffness = 0.1;
        this.hangDamping = 0.0001;
        this.hangStiffness_buttonUp = 0.1;
        this.hangDamping_buttonUp = 0.0001;
        this.hangStiffness_buttonDown = 0.1;
        this.hangDamping_buttonDown = 0.0001;
        this.bullet = [];

        // the ship body shape
        this.bodyVert = [{x : -this.size * 30 - 0.05, y : 0}, {x : this.size * 15 , y : 0}, {x : -this.size * 25, y: this.size * 15}];
        this.body.push(Bodies.fromVertices(x - this.size * 2, y, this.bodyVert, {isStatic: this.bodyIsStatic, inertia: Infinity, angle: 0})); // body - 0
        // the hang
        this.hang_L = Constraint.create({bodyA: ziv.body[2], pointA: {x: 0, y: ziv.size * 1.5},
                                        bodyB: this.body[0], pointB: {x: - this.size * 15, y: - this.size * 5},
                                        stiffness: this.hangStiffness, damping: this.hangDamping});
        this.hang_R = Constraint.create({bodyA: ziv.body[2], pointA: {x: 0, y: ziv.size * 1.5},
                                         bodyB: this.body[0], pointB: {x: + this.size * 27, y: - this.size * 5},
                                         stiffness: this.hangStiffness, damping: this.hangDamping});
        World.add(engine.world, this.body);
        World.add(engine.world, [this.hang_L, this.hang_R]);

        // set the mass and collisionFilter
        for (var i = 0; i < this.body.length; i++) {
            Body.setMass(this.body[i], this.body[i].mass * massControl);
            this.body[i].collisionFilter.group = 1;
        }

    }

    draw() {

        push();

            strokeWeight(this.thick);

            // draw the ship body
            beginShape();
                vertex(this.body[0].vertices[1].x, this.body[0].vertices[1].y);
                vertex(this.body[0].vertices[0].x + this.size * 9, this.body[0].vertices[0].y + this.size * 9);
                vertex(this.body[0].vertices[0].x, this.body[0].vertices[0].y);
                vertex(this.body[0].vertices[1].x, this.body[0].vertices[1].y);
                vertex(this.body[0].vertices[2].x, this.body[0].vertices[2].y);
                vertex(this.body[0].vertices[0].x + this.size * 6.3, this.body[0].vertices[0].y + this.size * 6.7);
            endShape();        
            
            // click box
            push();
                rect(this.body[0].vertices[1].x - this.size * 33, this.body[0].vertices[1].y - this.size * 8, this.size * 18, this.size * 8);
                textSize(this.thick * 8);
                textAlign(CENTER, CENTER);
                text('Start', this.body[0].vertices[1].x - this.size * 24.15, this.body[0].vertices[1].y - this.size * 3.5);

                // rect(this.body[0].vertices[1].x - this.size * 29, this.body[0].vertices[1].y - this.size * 8, this.size * 10, this.size * 8);
                // strokeWeight(this.thick * 0.2);
                // fill(150, 150, 150, 200);
                // translate(this.body[0].vertices[1].x - this.size * 25.5, this.body[0].vertices[1].y - this.size * 5.8);
                // var k = 4;
                // triangle(0, 0,
                //          0, this.size * 1 * k,
                //          this.size * 1 * k, this.size * 0.5 * k);
            pop();

            // the lines behind ship
            line(this.body[0].vertices[0].x + this.size * 4, this.body[0].vertices[0].y + this.size * 7.5,
                 this.body[0].vertices[0].x - this.size * 3, this.body[0].vertices[0].y + this.size * 9);
            line(this.body[0].vertices[0].x + this.size * 2, this.body[0].vertices[0].y + this.size * 4,
                 this.body[0].vertices[0].x - this.size * 2.5, this.body[0].vertices[0].y + this.size * 5);
            line(this.body[0].vertices[0].x + this.size * 4, this.body[0].vertices[0].y + this.size * 11.1,
                 this.body[0].vertices[0].x - this.size * 1, this.body[0].vertices[0].y + this.size * 12.2);

            // the hanging lines
            drawConstraint(this.hang_L);
            drawConstraint(this.hang_R);

        pop();
    }

}