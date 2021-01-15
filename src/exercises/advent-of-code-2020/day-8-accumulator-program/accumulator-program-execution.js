class AccumulatorProgramExecution {
    constructor(lines) {
        this.currentLine = 0;
        this.accumulator = 0;
        this.program = lines.slice();
        this.programLog = lines.map((line) => { return { line, executionCount: 0 } });
    }

    step() {
        // grab the line to be executed
        const lineToExecute = this.programLog[this.currentLine];

        // do the thing
        const command = this.programLog[this.currentLine].line;
        switch(command.operation) {
            case 'nop':
                this.currentLine += 1;
                break;
            case 'acc':
                this.accumulator += command.argument;
                this.currentLine += 1;
                break;
            case 'jmp':
                this.currentLine += command.argument;
                break;
            default:
                throw new Error (`unknown operation: ${command.operation}`);
        }

        // increment the counter
        lineToExecute.executionCount++;
    }

    execute() {
        while (this.currentLine < this.programLog.length) {
            // if the line has been previously executed, throw an error
            if (this.programLog[this.currentLine].executionCount > 0) {
                throw new Error(`line '${this.currentLine}' was already executed, stopping execution to prevent infinite loop`);
            }

            // execute the next line
            this.step();
        }
    }

    getAccumulator() {
        return this.accumulator;
    }
}

module.exports = AccumulatorProgramExecution;
