const fs = require('fs');
const { Vector, HypothermalGrid } = require('../../../../src/exercises/advent-of-code-2021/day-5-hypothermal-grid/hypothermal-grid');

describe('Advent of Code 2021 - Day 5', () => {
    const inputFile = './test/exercises/advent-of-code-2021/day-5-hypothermal-grid/input.txt';

    it('should count overlapping points in a hypothermal grid', () => {
        const inputStr = '0,9 -> 5,9\n' +
            '8,0 -> 0,8\n' +
            '9,4 -> 3,4\n' +
            '2,2 -> 2,1\n' +
            '7,0 -> 7,4\n' +
            '6,4 -> 2,0\n' +
            '0,9 -> 2,9\n' +
            '3,4 -> 1,4\n' +
            '0,0 -> 8,8\n' +
            '5,5 -> 8,2';
        const vectorStrs = inputStr.split('\n');
        const vectors = vectorStrs.map(vectorStr => Vector.parse(vectorStr));
        const grid = new HypothermalGrid(vectors);

        const pointsByVentCount = grid.getPointsByVentCount();
        const pointsWithMultipleVents = Object.keys(pointsByVentCount)
            .filter(ventCount => Number(ventCount) > 1)
            .map(ventCount => pointsByVentCount[ventCount].length)
            .reduce((a, c) => a + c, 0);

        expect(pointsWithMultipleVents).to.equal(12);

        // console.log(grid.toPrintableGrid());
    });

    it('should count overlapping points in a large hypothermal grid', async () => {
        const vectorStrs = await fs.readFileSync(inputFile, 'utf-8').trim().split('\n');
        const start = new Date();

        const vectors = vectorStrs.map(vectorStr => Vector.parse(vectorStr));
        const grid = new HypothermalGrid(vectors);

        const pointsByVentCount = grid.getPointsByVentCount();
        const pointsWithMultipleVents = Object.keys(pointsByVentCount)
            .filter(ventCount => Number(ventCount) > 1)
            .map(ventCount => pointsByVentCount[ventCount].length)
            .reduce((a, c) => a + c, 0);

        console.log(`${pointsWithMultipleVents}: ${new Date() - start} ms`);
    });

});