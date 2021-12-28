const fs = require('fs');
const { binaryToDecimal, calculateGamma, calculateEpsilon, calculateOxygenGeneratorRating, calculateCO2ScrubberRating} = require('../../../../src/exercises/advent-of-code-2021/day-3-binary-diagnostic/diagnostic-calculator');

describe('Advent of Code 2021 - Day 3', () => {
    const inputFile = './test/exercises/advent-of-code-2021/day-3-binary-diagnostic/input.txt';

    it('should convert binary number strings to a decimal number', () => {
       expect(binaryToDecimal('0')).to.equal(0);
       expect(binaryToDecimal('1')).to.equal(1);
       expect(binaryToDecimal('10')).to.equal(2);
    });

    it('should calculate gamma and epsilon rates from a small set of input and multiply them together', () => {
        const input = [
            '00100',
            '11110',
            '10110',
            '10111',
            '10101',
            '01111',
            '00111',
            '11100',
            '10000',
            '11001',
            '00010',
            '01010'
        ];

        const gamma = calculateGamma(input);
        const epsilon = calculateEpsilon(input)

        expect(gamma * epsilon).to.equal(198);
    });

    it('should calculate gamma and epsilon rates from an input file and multiply them together', async () => {
        const input = await fs.readFileSync(inputFile, 'utf-8').split('\n');
        const start = new Date();

        const gamma = calculateGamma(input);
        const epsilon = calculateEpsilon(input)

        console.log(`${gamma * epsilon}: ${new Date() - start} ms`);
    });

    it('should calculate oxygen and CO2 ratings from a small set of input and multiply them together', () => {
        const input = [
            '00100',
            '11110',
            '10110',
            '10111',
            '10101',
            '01111',
            '00111',
            '11100',
            '10000',
            '11001',
            '00010',
            '01010'
        ];

        const oxy = calculateOxygenGeneratorRating(input);
        const co2 = calculateCO2ScrubberRating(input);

        expect(oxy * co2).to.equal(230);
    });

    it('should calculate gamma and epsilon rates from an input file and multiply them together', async () => {
        const input = await fs.readFileSync(inputFile, 'utf-8').split('\n');
        const start = new Date();

        const oxy = calculateOxygenGeneratorRating(input);
        const co2 = calculateCO2ScrubberRating(input);

        console.log(`${oxy * co2}: ${new Date() - start} ms`);
    });

});