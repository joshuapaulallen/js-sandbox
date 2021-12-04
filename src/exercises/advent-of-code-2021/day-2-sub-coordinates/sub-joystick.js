class Coordinates {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

}

class AimCoordinates {

    constructor(xPos, depth, aim) {
        this.xPos = xPos;
        this.depth = depth;
        this.aim = aim;
    }

}

class Vector {

    constructor(moveType, magnitude) {
        this.direction = moveType;
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

/**
 * Move the sub from the given coordinates.
 *
 * @param from {AimCoordinates} The starting three-dimensional aim coordinates.
 * @param vector {Vector}       The direction/magnitude of the desired move.
 */
function moveWithAim(from, vector) {
    var newCoordinates = { ...from };

    switch (vector.direction) {
        case 'forward':
            newCoordinates.xPos += vector.magnitude;
            newCoordinates.depth += (vector.magnitude * from.aim);
            break;
        case 'up':
            newCoordinates.aim -= vector.magnitude;
            break;
        case 'down':
            newCoordinates.aim += vector.magnitude;
            break;
    }

    return newCoordinates;
}

module.exports = {
    Coordinates,
    AimCoordinates,
    Vector,
    move,
    moveWithAim
}