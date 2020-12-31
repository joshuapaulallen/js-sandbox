const fs = require('fs');
const checkPassword = require('../../../../src/exercises/advent-of-code-2020/day-2-password-policy/password-policy');

describe('Advent of Code 2020 - Day 2', () => {
    const inputFile =  './test/exercises/advent-of-code-2020/day-2-password-policy/input.txt';

    it('should count the passwords that meet the policy', async () => {
        const lines = await fs.readFileSync(inputFile, 'utf-8').split('\n').filter((line) => line.length > 0);
        const linesPassing = lines.filter(checkPassword);
        console.log(`${linesPassing.length} / ${lines.length} pass the password policy`);
    });

    it('should identify passwords that do meet the given policy', async () => {
        const goodPasswords = [
            '3-9 c: ccc',
            '3-9 c: ccccccccc',
            '3-9 c: cacacacacacacacac',
            '3-9 c: acacacacacacacacaca',
        ];
        goodPasswords.forEach((badPassword) => {
           expect(checkPassword(badPassword)).to.equal(true);
        });
    });

    it('should identify passwords that do NOT meet the given policy', async () => {
        const badPasswords = [
            '3-9 c: ccaaaaa',
            '3-9 c: aaaaacc',
            '3-9 c: aaaccaaa',
            '3-9 c: cccccccccc',
            '3-9 c: cacacacacacacacacac',
            '3-9 c: bbb',
        ];
        badPasswords.forEach((badPassword) => {
            expect(checkPassword(badPassword)).to.equal(false);
        });
    });
});
