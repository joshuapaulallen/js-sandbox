const fs = require('fs');
const sumFinder = require('../../../../src/exercises/advent-of-code-2020/day-1-sum-finder/sum-finder');

describe('Advent of Code 2020 - Day 1', () => {
   const inputFile =  './test/exercises/advent-of-code-2020/day-1-sum-finder/input.txt';

   it('should find the two numbers whose sum is 2020 and multiply them', async () => {
       const numbers = await fs.readFileSync(inputFile, 'utf-8').split('\n').map((line) => Number(line));
       const start = new Date();
       const result = sumFinder.findTupleWithSum(numbers, 2, 2020);
       expect(result).to.not.be.null;
       console.log(`${result.join(' * ')} = ${result.reduce((a, c) => a * c, 1)}: ${new Date() - start} ms`);
   });

    it('should find the three numbers whose sum is 2020 and multiply them', async () => {
        const numbers = await fs.readFileSync(inputFile, 'utf-8').split('\n').map((line) => Number(line));
        const start = new Date();
        const result = sumFinder.findTupleWithSum(numbers, 3, 2020);
        expect(result).to.not.be.null;
        console.log(`${result.join(' * ')} = ${result.reduce((a, c) => a * c, 1)}: ${new Date() - start} ms`);
    });
});
