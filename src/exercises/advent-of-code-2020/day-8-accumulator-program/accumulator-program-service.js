const AccumulatorProgramExecution = require('./accumulator-program-execution');

/**
 * Analyze and repair the given programLog in-place, i.e., switch 'nop' for 'jmp' and vice-versa, until the programLog
 * executes without error.
 * @param {AccumulatorProgramLine[]} program
 * @return {AccumulatorProgramExecution} A repaired programLog execution that executed to completion.
 */
function repairAndExecute(program) {
    let fixedExecution = null;
    for (let lineNum = 0; lineNum < program.length; lineNum++) {
        const programPossibleFix = program.map((line) => { return { ...line } });
        const lineToFix = programPossibleFix[lineNum];
        if (lineToFix.operation === 'nop') {
            lineToFix.operation = 'jmp';
        } else if (lineToFix.operation === 'jmp') {
            lineToFix.operation = 'nop';
        } else {
            continue;
        }

        const possibleFixProgramExecution = new AccumulatorProgramExecution(programPossibleFix);
        try {
            possibleFixProgramExecution.execute();
        } catch (err) {
            if (err.message.includes('stopping execution to prevent infinite loop')) {
                continue;
            } else {
                throw err;
            }
        }

        fixedExecution = possibleFixProgramExecution;
        break;
    }

    return fixedExecution;
}

module.exports = {
    repairAndExecute,
};
