const fs = require('fs');
const {
    parseAndCountCharsPerGroup,
    parseAndCountCharsAppearAllLinesPerGroup,
} = require('../../../../src/exercises/advent-of-code-2020/day-6-customs-survey/customs-counter');

describe('customs counter', () => {
    describe('letters appear at least once in a group', () => {
        it('should sum the unique character count for several groups of strings', () => {
            const manyGroupsStr =
                'abc\n' +
                '\n' +
                'a\n' +
                'b\n' +
                'c\n' +
                '\n' +
                'ab\n' +
                'ac\n' +
                '\n' +
                'a\n' +
                'a\n' +
                'a\n' +
                'a\n' +
                '\n' +
                'b';
            expect(parseAndCountCharsPerGroup(manyGroupsStr).reduce((a, c) => a + c, 0)).to.equal(11);
        });
        it('should sum the unique character count for the given input file', async () => {
            const inputFile = './test/exercises/advent-of-code-2020/day-6-customs-survey/input.txt';
            const input = await fs.readFileSync(inputFile, 'utf-8')
            console.log(parseAndCountCharsPerGroup(input).reduce((a, c) => a + c, 0));
        });
    });

    describe('letters appear in every string in a group', () => {
        it('should sum the character count that appears in all lines in a group', () => {
            const tests = [
                {
                    str: 'a',
                    count: 1
                },
                {
                    str: 'v\n' +
                        'vx\n' +
                        'v\n' +
                        'vx\n' +
                        'nclmbv',
                    count: 1
                },                {
                    str: 'v\n' +
                        'vx\n' +
                        'v\n' +
                        'vx\n' +
                        'nclmbv\n' + // 1
                        '\n' +
                        'ow\n' +
                        'wo\n' + // 2
                        '\n' +
                        'phegq\n' +
                        'eqgph\n' +
                        'hgpque\n' + // 5
                        '\n' +
                        'xispjzq\n' +
                        'sqkzcupi\n' +
                        'ikspqyzue\n' + // 5
                        '\n' +
                        'w\n' +
                        'z\n' +
                        'r\n' +
                        'w\n' +
                        'r\n' + // 0
                        '\n' +
                        'a\n' +
                        '\n' +
                        'flxwhbzkei\n' +
                        'lwkhxfezbi\n' +
                        'xelfwbzhik\n' +
                        'bhzefxkliw\n' +
                        'klizhwbfxe\n' + // 10
                        '\n' +
                        'pc\n' +
                        'pc\n' +
                        'ikyp\n', // 1
                    count: 25
                },
            ];

            tests.forEach((test) => {
                expect(parseAndCountCharsAppearAllLinesPerGroup(test.str).reduce((a, c) => a + c, 0)).to.equal(test.count);
            });
        });
        it('should sum the character count that appears in all lines in a group for several groups of strings', () => {
            const manyGroupsStr =
                'abc\n' +
                '\n' +
                'a\n' +
                'b\n' +
                'c\n' +
                '\n' +
                'ab\n' +
                'ac\n' +
                '\n' +
                'a\n' +
                'a\n' +
                'a\n' +
                'a\n' +
                '\n' +
                'b\n';
            expect(parseAndCountCharsAppearAllLinesPerGroup(manyGroupsStr).reduce((a, c) => a + c, 0)).to.equal(6);
        });
        it('should sum character count that appears in all lines for the given input file', async () => {
            const inputFile = './test/exercises/advent-of-code-2020/day-6-customs-survey/input.txt';
            const input = await fs.readFileSync(inputFile, 'utf-8')
            console.log(parseAndCountCharsAppearAllLinesPerGroup(input).reduce((a, c) => a + c, 0));
        });
    });
});
