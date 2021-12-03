const fs = require('fs');
const depthDetectorSpec = require('../../../../src/exercises/advent-of-code-2021/day-1-depth-detector/depth-detector');

describe('Advent of Code 2021 - Day 1', () => {
    const inputFile = './test/exercises/advent-of-code-2021/day-1-depth-detector/input.txt';

    it('should calculate the number of times an increase occurs in a small list of numbers', async () => {
        const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
        const result = depthDetectorSpec.calculateNumIncreases(depths);
        expect(result).to.equal(7);
    });

    it('should calculate the number of times an increase occurs in a list of numbers', async () => {
        const depths = await fs.readFileSync(inputFile, 'utf-8').split('\n').map((line) => Number(line));
        const start = new Date();
        const result = depthDetectorSpec.calculateNumIncreases(depths);
        expect(result).to.not.be.null;
        console.log(`${result}: ${new Date() - start} ms`);
    });
});