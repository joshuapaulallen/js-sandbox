const fs = require('fs');
const BinaryBoardingPass = require('../../../../src/exercises/advent-of-code-2020/day-5-binary-boarding-pass/binary-boarding-pass');

describe('binary boarding pass', () => {
    it('should parse a string representation of the seat and calculate the seat id', () => {
       expect(BinaryBoardingPass.parse('FBFBBFFRLR').getSeatId()).to.equal(357);
       expect(BinaryBoardingPass.parse('FFFFFFFLLL').getSeatId()).to.equal(0);
       expect(BinaryBoardingPass.parse('BBBBBBBRRR').getSeatId()).to.equal(1023);
    });
    it('should parse many boarding pass strings and calculate the seat id with the highest value', async () => {
        const inputFile = './test/exercises/advent-of-code-2020/day-5-binary-boarding-pass/input.txt';
        const boardingPassStrs = await fs.readFileSync(inputFile, 'utf-8').split('\n').filter((s) => s.length > 0);
        const maxSeatId = boardingPassStrs
            .map((boardingPassStr) => BinaryBoardingPass.parse(boardingPassStr).getSeatId())
            // .map((seatId) => console.log(seatId));
            .reduce((a, c) => a > c ? a : c, 0);
        console.log(maxSeatId);
    })
});
