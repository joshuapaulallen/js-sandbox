const fs = require('fs');
const slopeMapper = require('../../../../src/exercises/advent-of-code-2020/day-3-toboggan-trajectory/slope-mapper');

describe('Advent of Code 2020 - Day 3', () => {
    const inputFile = './test/exercises/advent-of-code-2020/day-3-toboggan-trajectory/input.txt';

    it('should count the "trees" encountered on a given linear trajectory down the slope (from the input file)', async () => {
        const lines = await fs.readFileSync(inputFile, 'utf-8').split('\n');
        const numTrees = slopeMapper.calculateTreesOnLinearPath(lines, 3, 1);
        console.log(`num trees: ${numTrees}`);
    });

    it('should count the "trees" encountered on a given one-line-at-a-time trajectory down the slope (test input)', () => {
        const lines = [
            '#........',
            '...#.....',
            '......#..',
            '#........',
        ];
        expect(slopeMapper.calculateTreesOnLinearPath(lines, 3, 1)).to.equal(4);
    });

    it('should count the "trees" encountered on a given two-lines-at-a-time trajectory down the slope (test input)', () => {
        const lines = [
            '#........',
            '.........',
            '..#......',
            '.........',
            '....#....',
            '.........',
        ];
        expect(slopeMapper.calculateTreesOnLinearPath(lines, 2, 2)).to.equal(3);
    });

    it('should count the "trees" encountered on several linear trajectories down the slope (from the input file) and multiply them together', async () => {
        const lines = await fs.readFileSync(inputFile, 'utf-8').split('\n');
        const xySteps = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
        const product = xySteps.map((xyPair) => slopeMapper.calculateTreesOnLinearPath(lines, xyPair[0], xyPair[1]))
            .reduce((a, c) => a * c, 1);
        console.log(`product: ${product}`);
    });
});
