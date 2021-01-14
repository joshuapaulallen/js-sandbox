class AccumulatorProgramLine {
    constructor(operation, argument) {
        this.operation = operation;
        this.argument = argument;
    }

    static parse(str) {
        const matches = str.match(/(\S+) ([\+|-]\d+)/);
        if (matches === null) {
            throw new Error(`invalid str: ${str}`);
        }

        return new AccumulatorProgramLine(matches[1], Number(matches[2]));
    }
}

module.exports = AccumulatorProgramLine;
