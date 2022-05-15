const fs = require('fs');
const { CrabAligner, CrabAlignerResult } = require('../../../../src/exercises/advent-of-code-2021/day-7-align-the-crabs/align-the-crabs');

describe('Advent of Code 2021 - Day 7', () => {
    const inputFile = './test/exercises/advent-of-code-2021/day-7-align-the-crabs/input.txt';

    it('should calculate minimal fuel needed for crab alignment from a small set', () => {
        const crabAligner = CrabAligner.parse('16,1,2,0,4,2,7,1,2,14');
        const result = crabAligner.calculateOptimalAlignment();

        expect(result.x).to.equal(2);
        expect(result.fuel).to.equal(37);
    });

    it('should calculate minimal fuel needed for crab alignment from a large file and print the result', async () => {
        const crabAligner = CrabAligner.parse(await fs.readFileSync(inputFile, 'utf-8').trim());
        const start = new Date();

        const result = crabAligner.calculateOptimalAlignment();
        console.log(`x: ${result.x}, fuel: ${result.fuel}: ${new Date() - start} ms`);
    });
    
});