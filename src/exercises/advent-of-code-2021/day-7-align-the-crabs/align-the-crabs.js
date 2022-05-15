class Crab {

    /**
     * @constructor
     * @param x - The horizontal position.
     */
    constructor(x) {
        this.x = Number(x);
    }

}

class CrabAlignerResult {

    constructor(x, fuel) {
        this.x = Number(x);
        this.fuel = Number(fuel);
    }

}

class CrabAligner {

    /**
     * @constructor
     * @param crabs {Crab[]} - The crabs.
     */
    constructor(crabs) {
        this.crabs = [ ...crabs ];
    }

    static parse(crabsStr) {
        return new CrabAligner(crabsStr.split(',').map(crabStr => new Crab(crabStr)));
    }

    /**
     * By brute force, calculate the xPos that aligns all the crabs using the minimal amount of fuel.
     *
     * @return CrabAlignerResult
     */
    calculateOptimalAlignment() {
        const minX = this.calcMinX();
        const maxX = this.calcMaxX();
        console.log(`from ${minX} to ${maxX}`);

        let optimalX = null;
        let optimalFuel = null;
        for (let x = minX; x <= maxX; x++) {
            const fuelNeeded = this.calculateFuelToAlign(x);
            if (!optimalFuel || optimalFuel > fuelNeeded) {
                optimalX = x;
                optimalFuel = fuelNeeded;
            }
        }

        return new CrabAlignerResult(optimalX, optimalFuel);
    }

    calculateFuelToAlign(x) {
        return this.crabs
            // calculate the distance of each crab to the target X position
            .map(c => Math.abs(c.x - x))
            // sum them all
            .reduce((a, c) => a + c, 0);
    }

    calcMinX() {
        return this.crabs.map(c => c.x).reduce((a, c) => a > c ? c : a);
    }

    calcMaxX() {
        return this.crabs.map(c => c.x).reduce((a, c) => a < c ? c : a);
    }
}

module.exports = {
    CrabAligner,
    CrabAlignerResult
};
