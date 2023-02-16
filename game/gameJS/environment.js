// the ship
class Environment {
    constructor(x, y, s) {
        this.setup(x, y, s);
    }

    setup() {

        this.wallLeft;
        this.wallRight;
        this.wallUp;
        this.wallDown;
        this.thick = disWidth / 100 * 1.2;

        // wall
        this.wallLeft = Bodies.rectangle((window.innerWidth - disWidth) / -4 - 0.03 * disWidth, disHeight / 2, (window.innerWidth - disWidth) / 2 + 0.055 * disWidth, window.innerHeight * 1.2,{isStatic: true, inertia: Infinity, angle: 0}); // left 
        this.wallRight = Bodies.rectangle((window.innerWidth - disWidth) / 4 + 1.03 * disWidth, disHeight / 2, (window.innerWidth - disWidth) / 2 + 0.055 * disWidth, window.innerHeight * 1.2,{isStatic: true, inertia: Infinity, angle: 0}); // right
        this.wallLeft.friction = 0;
        this.wallRight.friction = 0;
        this.wallUp = Bodies.rectangle(disWidth / 2 , 0 - 0.05 * disHeight, disWidth, 0.1 * disHeight,{isStatic: true, inertia: Infinity, angle: 0}); // up
        this.wallDown = Bodies.rectangle(disWidth / 2 , disHeight + 0.05 * disHeight, disWidth, 0.1 * disHeight,{isStatic: true, inertia: Infinity, angle: 0}); // down
        World.add(engine.world, [this.wallLeft, this.wallRight, this.wallUp, this.wallDown]);

    }

    draw() {

        push();

            strokeWeight(this.thick);

            push();
                strokeWeight(this.thick * 1.5);
                if (this.wallLeft) drawVertices(this.wallLeft.vertices);
                if (this.wallRight) drawVertices(this.wallRight.vertices);
                if (this.wallUp) drawVertices(this.wallUp.vertices);
                if (this.wallDown) drawVertices(this.wallDown.vertices);
            pop();

            rect((window.innerWidth - disWidth) / 2, 0, disWidth / 10 * 3, disHeight / 100 * 7);
            textSize(this.thick * 6.4);
            text('Restart', (window.innerWidth - disWidth) / 2 + disWidth / 100 * 2.5, disHeight / 100 * 5);

        pop();
    }

}