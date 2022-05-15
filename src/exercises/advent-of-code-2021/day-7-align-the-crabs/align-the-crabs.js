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
     * @param calculateFuel {function}
     * @return CrabAlignerResult
     */
    calculateOptimalAlignment(calculateFuel = this.calculateFuelToAlignSimple) {
        const minX = this.calcMinX();
        const maxX = this.calcMaxX();

        let optimalX = null;
        let optimalFuel = null;
        for (let x = minX; x <= maxX; x++) {
            const fuelNeeded = calculateFuel(x, this.crabs);
            if (!optimalFuel || optimalFuel > fuelNeeded) {
                optimalX = x;
                optimalFuel = fuelNeeded;
            }
        }

        return new CrabAlignerResult(optimalX, optimalFuel);
    }

    /**
     * Calculate the fuel needed to move all crabs to the given position, assuming every unit of distance requires one
     * fuel.
     *
     * @param x {number}
     * @param crabs {Crab[]}
     * @return {number}
     */
    calculateFuelToAlignSimple(x, crabs) {
        return crabs
            // calculate the distance of each crab to the target X position
            .map(c => Math.abs(c.x - x))
            // sum them all
            .reduce((a, c) => a + c, 0);
    }

    /**
     * Calculate the fuel needed to move all crabs to the given position, assuming the first unit of distance costs
     * one fuel, the second costs two, the third costs three, etc
     * fuel.
     *
     * @param x {number}
     * @param crabs {Crab[]}
     * @return {number}
     */
    calculateFuelToAlignIncremental(x, crabs) {
        return crabs
            // calculate the distance of each crab to the target X position
            .map(c => Math.abs(c.x - x))
            // transform the delta into the true fuel cost (instead of one fuel per unit, it's 1 for the first, 2 for
            // the second, etc)
            .map(i => {
                let fuelCost = 0;
                for (let j = i; j > 0; j--) {
                    fuelCost += j;
                }
                return fuelCost;
            })
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
