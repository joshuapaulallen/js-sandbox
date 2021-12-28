const fs = require('fs');
const { BingoBoard, BingoGame } = require('../../../../src/exercises/advent-of-code-2021/day-4-squid-bingo/squid-bingo');

describe('Advent of Code 2021 - Day 4', () => {
    const inputFile = './test/exercises/advent-of-code-2021/day-4-squid-bingo/input.txt';

    it('should parse, mark, and check for solved puzzle', () => {
        const boardStr = ' 1  2  3  4  5\n' +
                         ' 6  7  8  9 10\n' +
                         '11 12 13 14 15\n' +
                         '16 17 18 19 20\n' +
                         '21 22 23 24 25';
        const bingoBoard = BingoBoard.parse(boardStr);

        expect(bingoBoard.isSolved()).to.be.false;

        expect(bingoBoard.mark(1)).to.be.true;
        expect(bingoBoard.mark(6)).to.be.true;
        expect(bingoBoard.mark(11)).to.be.true;
        expect(bingoBoard.mark(16)).to.be.true;
        expect(bingoBoard.isSolved()).to.be.false;
        expect(bingoBoard.mark(21)).to.be.true;

        expect(bingoBoard.isSolved()).to.be.true;
    });

    it('should apply numbers to a series of bingo cards until one of them is solved', () => {
        const nums = '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1'.split(',');
        const bingoBoards = [
            BingoBoard.parse(
                '22 13 17 11  0\n' +
                ' 8  2 23  4 24\n' +
                '21  9 14 16  7\n' +
                ' 6 10  3 18  5\n' +
                ' 1 12 20 15 19'
            ),
            BingoBoard.parse(
                ' 3 15  0  2 22\n' +
                ' 9 18 13 17  5\n' +
                '19  8  7 25 23\n' +
                '20 11 10 24  4\n' +
                '14 21 16 12  6'
            ),
            BingoBoard.parse(
                '14 21 17 24  4\n' +
                '10 16 15  9 19\n' +
                '18  8 23 26 20\n' +
                '22 11 13  6  5\n' +
                ' 2  0 12  3  7'
            )
        ];

        const winningBoardScore = BingoGame.play(nums, bingoBoards);
        expect(winningBoardScore).to.equal(4512);
    });

    it('from a large input file, should apply numbers to a series of bingo cards until one of them is solved', async () => {
        const input = await fs.readFileSync(inputFile, 'utf-8').split('\n');
        const start = new Date();

        const nums = input[0].split(',');
        const bingoBoardInput = input.slice(2);
        const bingoBoardStrs = bingoBoardInput.join('\n').split('\n\n');
        const bingoBoards = bingoBoardStrs.map(bingoBoardStr => BingoBoard.parse(bingoBoardStr));
        const winningBoardScore = BingoGame.play(nums, bingoBoards);

        console.log(`${winningBoardScore}: ${new Date() - start} ms`);
    });

});