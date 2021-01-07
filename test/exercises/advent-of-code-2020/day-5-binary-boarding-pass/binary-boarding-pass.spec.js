const fs = require('fs');
const BinaryBoardingPass = require('../../../../src/exercises/advent-of-code-2020/day-5-binary-boarding-pass/binary-boarding-pass');

describe('binary boarding pass', () => {
    it('should parse a string representation of the seat and calculate the seat id', () => {
        expect(BinaryBoardingPass.parse('FBFBBFFRLR').getSeatId()).to.equal(357);
        expect(BinaryBoardingPass.parse('FFFFFFFLLL').getSeatId()).to.equal(0);
        expect(BinaryBoardingPass.parse('BBBBBBBRRR').getSeatId()).to.equal(1023);
    });

    describe('from file', () => {
        const inputFile = './test/exercises/advent-of-code-2020/day-5-binary-boarding-pass/input.txt';

        it('should parse many boarding pass strings and calculate the seat id with the highest value', async () => {
            const boardingPassStrs = await fs.readFileSync(inputFile, 'utf-8').split('\n').filter((s) => s.length > 0);
            const maxSeatId = boardingPassStrs
                .map((boardingPassStr) => BinaryBoardingPass.parse(boardingPassStr).getSeatId())
                .reduce((a, c) => a > c ? a : c, 0);
            console.log(maxSeatId);
        })

        it('should find the id of lone available seat, disregarding the front and back row', async () => {
            // get seats for all recorded boarding passes
            const allBoardingPassStrs = await fs.readFileSync(inputFile, 'utf-8').split('\n').filter((s) => s.length > 0);
            const occupiedSeatIds = allBoardingPassStrs
                .map((boardingPassStr) => BinaryBoardingPass.parse(boardingPassStr))
                .map((s) => s.getSeatId());

            const seatMinId = occupiedSeatIds.reduce((a, c) => a < c ? a : c, Number.MAX_SAFE_INTEGER);
            const seatMaxId = occupiedSeatIds.reduce((a, c) => a > c ? a : c, 0);

            // only one seat should be empty, meaning the number of occupied seats is one less than the INCLUSIVE range of occupied seat ids
            expect(occupiedSeatIds.length).to.equal(seatMaxId - seatMinId + 1 - 1);

            let emptySeatId = null;
            for (let i = seatMinId; i <= seatMaxId; i++) {
                if (occupiedSeatIds.find((id) => id === i) === undefined) {
                    emptySeatId = i;
                    break;
                }
            }

            console.log(`seat ids from ${seatMinId} to ${seatMaxId}, empty seat: ${emptySeatId}`);
        });
    });

});
