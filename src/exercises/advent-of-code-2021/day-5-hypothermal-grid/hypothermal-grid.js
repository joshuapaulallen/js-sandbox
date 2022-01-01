class Point {

    /**
     * @param x {number}
     * @param y {number}
     */
    constructor(x, y) {
        this.x = Number(x);
        this.y = Number(y);
    }

    static parse(pointStr) {
        const parts = pointStr.trim().split(",");
        return new Point(Number(parts[0]), Number(parts[1]))
    }
}

class Vector {

    /**
     * @param from {Point}
     * @param to {Point}
     */
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    static parse(vectorStr) {
        const parts = vectorStr.trim().split("->");
        return new Vector(Point.parse(parts[0]), Point.parse(parts[1]));
    }
}

class HypothermalGridPoint {

    /**
     * @param x {number}
     * @param y {number}
     */
    constructor(x, y) {
        this.point = new Point(x, y);
        this.ventCount = 0;
    }

    markVent() {
        this.ventCount++;
    }

}

class HypothermalGrid {

    /**
     * @param vectors {Vector[]}
     */
    constructor(vectors) {
        const points = [];
        vectors.forEach(v => {
            points.push(v.from, v.to);
        });

        const xMax = this.findXMax(points);
        const yMax = this.findYMax(points);
        this.points = this.initPoints(xMax, yMax);

        vectors.forEach(v => this.markVents(v));
    }

    /**
     * @param points {Point[]}
     * @returns {number}
     */
    findXMax(points) {
        return points.reduce((a, c) => c.x > a ? c.x : a, -1);
    }

    /**
     * @param points {Point[]}
     * @returns {number}
     */
    findYMax(points) {
        return points.reduce((a, c) => c.y > a ? c.y : a, -1);
    }

    initPoints(xMax, yMax) {
        const points = {};
        for (let i = 0; i <= xMax; i++) {
            points[i] = {};
            for (let j = 0; j <= yMax; j++) {
                points[i][j] = new HypothermalGridPoint(i, j);
            }
        }

        return points;
    }

    /**
     * @param x {number}
     * @param y {number}
     * @returns {Point}
     */
    getPoint(x, y) {
        return this.points[x.toString()][y.toString()];
    }

    /**
     * @param vector {Vector}
     */
    markVents(vector) {
        const xDelta = vector.to.x - vector.from.x;
        const yDelta = vector.to.y - vector.from.y;

        const pointsToMark = [];
        if (xDelta !== 0 && yDelta === 0) {
            // this is a horizontal line
            const fromX = Math.min(vector.from.x, vector.to.x);
            const toX = Math.max(vector.from.x, vector.to.x);
            for (let x = fromX; x <= toX; x++) {
                pointsToMark.push(this.getPoint(x, vector.from.y));
            }
        } else if (xDelta === 0 && yDelta !== 0) {
            // this is a vertical line
            const fromY = Math.min(vector.from.y, vector.to.y);
            const toY = Math.max(vector.from.y, vector.to.y);
            for (let y = fromY; y <= toY; y++) {
                pointsToMark.push(this.getPoint(vector.from.x, y));
            }
        }

        pointsToMark.forEach(p => p.markVent());
    }

    getPointsByVentCount() {
        const pointsByVentCount = {};
        const allPoints = [];
        Object.values(this.points).forEach(row => {
            Object.values(row).forEach(point => allPoints.push(point));
        });

        allPoints.forEach(p => {
           if (pointsByVentCount[p.ventCount]) {
               pointsByVentCount[p.ventCount].push(p);
           } else {
               pointsByVentCount[p.ventCount] = [p];
           }
        });

        return pointsByVentCount;
    }

}

module.exports = {
    Vector,
    HypothermalGrid
};