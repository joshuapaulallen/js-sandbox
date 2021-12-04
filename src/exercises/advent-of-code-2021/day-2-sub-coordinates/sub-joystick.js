class Coordinates {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

}

class Vector {

    constructor(direction, magnitude) {
        this.direction = direction;
        this.magnitude = magnitude;
    }

}

/**
 * Move the sub from the given coordinates.
 *
 * @param from {Coordinates} The starting three-dimensional coordinates.
 * @param vector {Vector}    The direction/magnitude of the desired move.
 */
function move(from, vector) {
    var newCoordinates = { ...from };

    switch (vector.direction) {
        case 'forward':
            newCoordinates.x += vector.magnitude;
            break;
        case 'up':
            newCoordinates.z -= vector.magnitude;
            break;
        case 'down':
            newCoordinates.z += vector.magnitude;
            break;
    }

    return newCoordinates;
}

module.exports = {
    Coordinates,
    Vector,
    move
}