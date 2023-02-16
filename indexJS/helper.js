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