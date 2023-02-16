// draw ziv
class Ziv {
    constructor(x, y, s) {
        this.setup(x, y, s);
    }

    setup(x, y, s) {

        this.size = s;
        this.head;
        this.headCheek = [];
        this.headEdge = [];
        this.body = [];
        this.constraint = [];
        this.headIsStatic = false;
        this.bodyIsStatic = false;
        this.handIsStatic = false;
        this.footIsStatic = false;
        this.bodyStiffness = 0.1;
        this.bodyDamping = 0.0001;
        this.thick = thickness * this.size / 5;
        this.hangBody;
        this.hangBody_L;
        this.hangBody_R;
        this.hang;
        this.hangStiffness = 0.1;
        this.hangDamping = 0.0001;

        // the head
        this.head = Bodies.circle(x, y, this.size * 5, {isStatic: this.headIsStatic, inertia: Infinity, angle: 0});
        World.add(engine.world, [this.head]);
        // the hangBody middle
        this.hangBody = Bodies.circle(x, y - this.size * 6, 1, {isStatic: true, inertia: Infinity, angle: 0});
        this.hang = Constraint.create({bodyA: this.hangBody, pointA: {x: 0, y: 0},
                                       bodyB: this.head, pointB: {x: 0, y: 0},
                                       stiffness: this.hangStiffness, damping: this.hangDamping});
        World.add(engine.world, [this.hang, this.hangBody]);

        // the body
        this.body.push(Bodies.circle(x + this.size * 3, y + this.size * 7.5, this.size * 0.1, {isStatic: this.bodyIsStatic, inertia: Infinity, angle: 0})); // upper - 0
        Matter.Body.setMass(this.body[0], this.body[0].mass * 10000);
        this.body.push(Bodies.circle(x + this.size * 13, y + this.size * 11.5, this.size * 0.1, {isStatic: this.bodyIsStatic, inertia: Infinity, angle: 0})); // lower - 1
        Matter.Body.setMass(this.body[1], this.body[1].mass * 10000);
        // hands
        this.body.push(Bodies.circle(disWidth / 100 * 44, y + this.size * 9, this.size * 1.5, {isStatic: this.handIsStatic, inertia: Infinity, angle: 0})); // left - 2
        this.body.push(Bodies.circle(x + this.size * 11.4, y + this.size * 5, this.size * 1.5, {isStatic: this.handIsStatic, inertia: Infinity, angle: 0})); // right - 3
        // foot
        this.body.push(Bodies.circle(x + this.size * 20, y + this.size * 14, this.size * 1.5, {isStatic: this.footIsStatic, angle: 0})); // left - 4
        this.body.push(Bodies.circle(x + this.size * 20, y + this.size * 10, this.size * 1.5, {isStatic: this.footIsStatic, angle: 0})); // right - 5
        World.add(engine.world, this.body);

        // the hang body left and right
        this.hangBody_R = Bodies.circle(this.body[4].position.x, this.hangBody.position.y, 1, {isStatic: true, inertia: Infinity, angle: 0});
        this.hangBody_L = Bodies.circle(this.hangBody.position.x - this.hangBody_R.position.x, this.hangBody.position.y, 1, {isStatic: true, inertia: Infinity, angle: 0});
        World.add(engine.world, [this.hangBody_L, this.hangBody_R]);

        // connect each body and hang each body
        this.constraint.push(Constraint.create({bodyA: this.head, pointA: {x: 0, y: this.size * 5},
                                                bodyB: this.body[0], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));
        this.constraint.push(Constraint.create({bodyA: this.body[0], pointA: {x: 0, y: 0},
                                                bodyB: this.body[1], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));     
        this.constraint.push(Constraint.create({bodyA: this.body[0], pointA: {x: 0, y: 0},
                                                bodyB: this.body[2], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));     
        this.constraint.push(Constraint.create({bodyA: this.body[0], pointA: {x: 0, y: 0},
                                                bodyB: this.body[3], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));      
        this.constraint.push(Constraint.create({bodyA: this.body[1], pointA: {x: 0, y: 0},
                                                bodyB: this.body[4], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));     
        this.constraint.push(Constraint.create({bodyA: this.body[1], pointA: {x: 0, y: 0},
                                                bodyB: this.body[5], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));     
        this.constraint.push(Constraint.create({bodyA: this.hangBody_L, pointA: {x: 0, y: 0},
                                                bodyB: this.head, pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));      
        this.constraint.push(Constraint.create({bodyA: this.hangBody_R, pointA: {x: 0, y: 0},
                                                bodyB: this.body[0], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));  
        this.constraint.push(Constraint.create({bodyA: this.hangBody_R, pointA: {x: 0, y: 0},
                                                bodyB: this.body[1], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));  
        this.constraint.push(Constraint.create({bodyA: this.hangBody, pointA: {x: 0, y: 0},
                                                bodyB: this.body[1], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));        
        this.constraint.push(Constraint.create({bodyA: this.hangBody_L, pointA: {x: 0, y: 0},
                                                bodyB: this.body[2], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));     
        this.constraint.push(Constraint.create({bodyA: this.hangBody_R, pointA: {x: 0, y: 0},
                                                bodyB: this.body[3], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));           
        this.constraint.push(Constraint.create({bodyA: this.hangBody_R, pointA: {x: 0, y: 0},
                                                bodyB: this.body[4], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));     
        this.constraint.push(Constraint.create({bodyA: this.hangBody_R, pointA: {x: 0, y: 0},
                                                bodyB: this.body[5], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));          
        this.constraint.push(Constraint.create({bodyA: this.body[4], pointA: {x: 0, y: 0},
                                                bodyB: this.body[5], pointB: {x: 0, y: 0},
                                                stiffness: this.bodyStiffness, damping: this.bodyDamping}));    
        World.add(engine.world, this.constraint);

        // set the mass and collisionFilter
        Body.setMass(this.head, this.head.mass * massControl);
        for (var i = 0; i < this.body.length; i++) {
            Body.setMass(this.body[i], this.body[i].mass * massControl);
            this.body[i].collisionFilter.group = 1;
        }
        this.head.collisionFilter.group = 1;
        this.hangBody.collisionFilter.group = 1;

    }

    draw() {

        push();

            fill(color(250, 250, 250, 0));

            strokeWeight(this.thick);

            // draw body connections
            for (var i = 0; i < this.constraint.length; i++) {
                if (i < 6) {
                    drawConstraint(this.constraint[i])
                }
            }

            // draw hand and foot
            push();
                fill(color(250, 250, 250, 255));
                for (var i = 0; i < this.body.length; i++) {
                    if (i > 1) drawVertices(this.body[i].vertices);
                }
            pop();

            // add stats for the drawing of the head
            this.headCheek = [];
            for (var i = 0; i < this.head.vertices.length; i++) {
                if (this.head.vertices[i].y >= this.head.position.y) {
                    this.headCheek.push(this.head.vertices[i]);
                }
            }
            this.headEdge = [];
            this.headEdge.push(createVector(this.headCheek[this.headCheek.length - 1].x, this.headCheek[this.headCheek.length - 1].y));
            this.headEdge.push(createVector(this.headCheek[0].x, this.headCheek[0].y));
            this.headEdge.push(createVector(this.headEdge[0].x, this.headEdge[0].y - this.size * 4));
            this.headEdge.push(createVector(this.headEdge[1].x, this.headEdge[1].y - this.size * 4));

            // the drawing of the head
            push();

                fill(color(250, 250, 250, 0));
                
                // hair
                arc(this.headEdge[3].x, this.headEdge[3].y - this.size * 3, this.size * 6, this.size * 3, radians(15), radians(90));
                arc(this.headEdge[3].x, this.headEdge[3].y - this.size * 6, this.size * 12, this.size * 6, radians(15), radians(90));
                arc(this.headEdge[3].x, this.headEdge[3].y - this.size * 9, this.size * 16, this.size * 9, radians(15), radians(90));
                arc(this.headEdge[3].x, this.headEdge[3].y, this.size * 16, this.size * 9, radians(180), radians(270));
                arc(this.headEdge[3].x, this.headEdge[3].y, this.size * 10, this.size * 6, radians(180), radians(270));
                arc(this.headEdge[3].x, this.headEdge[3].y, this.size * 4, this.size * 3, radians(180), radians(270));

                // head edge
                line(this.headEdge[0].x, this.headEdge[0].y, 
                     this.headEdge[2].x, this.headEdge[2].y);
                line(this.headEdge[1].x, this.headEdge[1].y, 
                     this.headEdge[3].x, this.headEdge[3].y);

                // the cheek
                beginShape();
                    for (var i = 0; i < this.headCheek.length; i++) {
                        vertex(this.headCheek[i].x, this.headCheek[i].y);
                    }
                endShape();

                // the eyebow
                arc(this.head.position.x - this.size * 4.1, this.head.position.y - this.size * 0.15, this.size * 6, this.size * 3, radians(280), radians(350));
                arc(this.head.position.x + this.size * 4.1, this.head.position.y - this.size * 0.15, this.size * 6, this.size * 3, radians(190), radians(260));

            pop();

            // the eye
            push();
                strokeWeight(this.size * 1.2);
                point(this.head.position.x - this.size * 1.7, this.head.position.y - this.size * 0.6);
                point(this.head.position.x + this.size * 1.7, this.head.position.y - this.size * 0.6);
            pop();
            
            // the mouth
            arc(this.head.position.x, this.head.position.y + this.size * 1.2, this.size * 3, this.size * 3, radians(45), radians(135));

        pop();
    }

    // the punching action
    punch() {
        var punchSpeed = createVector(0, disHeight / 100 * 3);
        Body.setMass(this.body[2], this.body[3].mass * 1);
        Body.setVelocity(this.body[2], punchSpeed);
    }

}