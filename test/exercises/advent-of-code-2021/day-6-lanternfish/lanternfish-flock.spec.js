const fs = require('fs');
const { LanternfishFlock } = require('../../../../src/exercises/advent-of-code-2021/day-6-lanternfish/lanternfish-flock');

describe.only('Advent of Code 2021 - Day 6', () => {
    const inputFile = './test/exercises/advent-of-code-2021/day-6-lanternfish/input.txt';

    it('should count lanternfish of small sample after 18 days', () => {
        const lanternfishStr = '3,4,3,1,2';
        const days = 18;

        const lanternfishFlock = LanternfishFlock.parse(lanternfishStr);
        for (let i = 0; i < days; i++) {
            lanternfishFlock.tick();
        }

        expect(lanternfishFlock.count()).to.equal(26);
    });

    it('should count lanternfish of small sample after 80 days', () => {
        const lanternfishStr = '3,4,3,1,2';
        const days = 80;

        const lanternfishFlock = LanternfishFlock.parse(lanternfishStr);
        for (let i = 0; i < days; i++) {
            lanternfishFlock.tick();
        }

        expect(lanternfishFlock.count()).to.equal(5934);
    });

    it('should count lanternfish of large sample after 80 days', async () => {
        const lanternfishStr = await fs.readFileSync(inputFile, 'utf-8').trim();
        const start = new Date();

        const days = 80;
        const lanternfishFlock = LanternfishFlock.parse(lanternfishStr);
        for (let i = 0; i < days; i++) {
            lanternfishFlock.tick();
        }

        console.log(`${lanternfishFlock.count()}: ${new Date() - start} ms`);
    });
});