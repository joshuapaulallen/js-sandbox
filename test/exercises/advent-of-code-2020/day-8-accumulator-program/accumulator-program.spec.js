const fs = require('fs');
const AccumulatorProgramLine = require('../../../../src/exercises/advent-of-code-2020/day-8-accumulator-program/accumulator-program-line');
const AccumulatorProgramExecution = require('../../../../src/exercises/advent-of-code-2020/day-8-accumulator-program/accumulator-program-execution');
const accumulatorProgramService = require('../../../../src/exercises/advent-of-code-2020/day-8-accumulator-program/accumulator-program-service');

describe('accumulator program', () => {
    describe('stop execution after encountering the same line twice', () => {
        it('with limited input', () => {
            const input = 'nop +0\n' +
                'acc +1\n' +
                'jmp +4\n' +
                'acc +3\n' +
                'jmp -3\n' +
                'acc -99\n' +
                'acc +1\n' +
                'jmp -4\n' +
                'acc +6';
            const program = new AccumulatorProgramExecution(input.split('\n').map(AccumulatorProgramLine.parse));
            try {
                program.execute();
            } catch (err) {
                if (err.message.includes('stopping execution to prevent infinite loop')) {
                    expect(program.getAccumulator()).to.equal(5);
                } else {
                    throw err;
                }
            }
        });
        it('with a large file', async () => {
            const inputFile = './test/exercises/advent-of-code-2020/day-8-accumulator-program/input.txt';
            const inputLines = await fs.readFileSync(inputFile, 'utf-8').trim().split('\n');
            const program = new AccumulatorProgramExecution(inputLines.map(AccumulatorProgramLine.parse));
            try {
                program.execute();
            } catch (err) {
                if (err.message.includes('stopping execution to prevent infinite loop')) {
                    console.log(program.getAccumulator());
                } else {
                    throw err;
                }
            }
        });
    });
    describe('search for a fixed program execution by swapping a single jmp or nop command and calculate accumulator of finished program', () => {
        it('with limited input', () => {
            const input = 'nop +0\n' +
                'acc +1\n' +
                'jmp +4\n' +
                'acc +3\n' +
                'jmp -3\n' +
                'acc -99\n' +
                'acc +1\n' +
                'jmp -4\n' +
                'acc +6';
            const brokenProgram = new AccumulatorProgramExecution(input.split('\n').map(AccumulatorProgramLine.parse)).program;
            const fixedProgramExecution = accumulatorProgramService.repairAndExecute(brokenProgram);
            expect(fixedProgramExecution).to.not.be.null;
            expect(fixedProgramExecution.getAccumulator()).to.equal(8);
        });
        it('with a large file', async () => {
            const inputFile = './test/exercises/advent-of-code-2020/day-8-accumulator-program/input.txt';
            const inputLines = await fs.readFileSync(inputFile, 'utf-8').trim().split('\n');
            const brokenProgram = new AccumulatorProgramExecution(inputLines.map(AccumulatorProgramLine.parse)).program;
            const fixedProgramExecution = accumulatorProgramService.repairAndExecute(brokenProgram);
            expect(fixedProgramExecution).to.not.be.null;
            console.log(fixedProgramExecution.getAccumulator());
        });
    });
});
