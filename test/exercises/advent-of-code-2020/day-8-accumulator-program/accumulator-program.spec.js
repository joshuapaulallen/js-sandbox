const fs = require('fs');
const AccumulatorProgramLine = require('../../../../src/exercises/advent-of-code-2020/day-8-accumulator-program/accumulator-program-line');
const AccumulatorProgramExecution = require('../../../../src/exercises/advent-of-code-2020/day-8-accumulator-program/accumulator-program-execution');

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
});
