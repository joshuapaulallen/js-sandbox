const fs = require('fs');
const sumFinder = require('../../../../src/exercises/advent-of-code-2020/day-1-report-repair/sum-finder');

describe('Advent of Code 2020 - Day 1', () => {
   it('should find the two numbers whose sum is 2020 and multiply them', async () => {
       const numbers = await fs.readFileSync('./test/exercises/advent-of-code-2020/day-1-report-repair/input.txt', 'utf-8').split('\n').map((line) => Number(line));
       const start = new Date();
       const result = sumFinder.findTwoTupleWithSum(numbers, 2020);
       expect(result).to.not.be.null;
       console.log(`${result[0]} * ${result[1]} = ${result[0] * result[1]}: ${new Date() - start} ms`);
   });
});
