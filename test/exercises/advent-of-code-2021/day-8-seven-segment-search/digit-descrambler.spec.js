const fs = require('fs');
const { DigitDescrambler } = require('../../../../src/exercises/advent-of-code-2021/day-8-seven-segment-search/digit-descrambler');

describe('Advent of Code 2021 - Day 8', () => {
    const inputFile = './test/exercises/advent-of-code-2021/day-8-seven-segment-search/input.txt';

    describe('simple', () => {
        it('should find the number of digits matching 1, 4, 7, or 8 in a small sample', () => {
            const input = 'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\n' +
                'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\n' +
                'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\n' +
                'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\n' +
                'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\n' +
                'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\n' +
                'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\n' +
                'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\n' +
                'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\n' +
                'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce';
            const inputLines = input.split('\n');
            const decodedLines = inputLines.map(l => DigitDescrambler.decodeSimple(l));

            const numDigits = decodedLines.map(line => {
                let digitsInLine = 0;
                for (let char of line) {
                    if (char !== '?') {
                        digitsInLine++;
                    }
                }
                return digitsInLine;
            }).reduce((a, c) => a + c, 0);

            expect(numDigits).to.equal(26);
        });

        it('should find the number of digits matching 1, 4, 7, or 8 in a large sample', async () => {
            const input = await fs.readFileSync(inputFile, 'utf-8').trim();

            const start = new Date();
            const inputLines = input.split('\n');
            const decodedLines = inputLines.map(l => DigitDescrambler.decodeSimple(l));

            const numDigits = decodedLines.map(line => {
                let digitsInLine = 0;
                for (let char of line) {
                    if (char !== '?') {
                        digitsInLine++;
                    }
                }
                return digitsInLine;
            }).reduce((a, c) => a + c, 0);

            console.log(`${numDigits}: ${new Date() - start} ms`);
        });
    });

    describe('complete', () => {
        it('should decode and sum all digits in sample of one', () => {
            const input = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
            const inputLines = [input];
            const decodedLines = inputLines.map(l => DigitDescrambler.decodeComplete(l));

            expect(decodedLines.length).to.equal(1);
            expect(decodedLines[0]).to.equal('5353');
        });

        it('should decode and sum all digits in a small sample', () => {
            const input = 'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\n' +
                'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\n' +
                'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\n' +
                'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\n' +
                'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\n' +
                'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\n' +
                'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\n' +
                'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\n' +
                'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\n' +
                'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce';
            const inputLines = input.split('\n');
            const decodedLines = inputLines.map(l => DigitDescrambler.decodeComplete(l));

            const sum = decodedLines.map(line => {
                return Number(line)
            }).reduce((a, c) => a + c, 0);

            expect(sum).to.equal(61229);
        });

        it.only('should find the number of digits matching 1, 4, 7, or 8 in a large sample', async () => {
            const input = await fs.readFileSync(inputFile, 'utf-8').trim();

            const start = new Date();
            const inputLines = input.split('\n');
            const decodedLines = inputLines.map(l => DigitDescrambler.decodeComplete(l));

            const sum = decodedLines.map(line => {
                return Number(line)
            }).reduce((a, c) => a + c, 0);

            console.log(`${sum}: ${new Date() - start} ms`);
        });
    });

    describe('utilities', () => {
        it('should find common characters in a set of strings', () => {
            expect(DigitDescrambler.findCommonChars(['abcd', 'bcde', 'bdeg'])).to.equal('bd');
        });
    });
});