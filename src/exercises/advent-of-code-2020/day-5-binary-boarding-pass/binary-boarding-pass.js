class BinaryBoardingPass {

    /**
     * @constructor
     * @param {number} row - Zero-based row number, with the "front" starting at 0.
     * @param {number} column - Zero-based column number, with the "left" at 0.
     */
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }

    getSeatId() {
        return (this.row * 8) + this.column;
    }

    /**
     * Parses the given string, which uses Binary Space Partitioning to uniquely identify a seat (row/column).
     * @param {string} str - A special string of 'F|B' (front vs back) followed by 'L|R' (left vs right). Implies max row/column.
     * @return {BinaryBoardingPass}
     */
    static parse(str) {
        const matches = str.match(/([F|B]+)([L|R]+)/);
        if (matches === null) {
            throw new Error('invalid input, expected one or more F|B followed by one or more L|R');
        }

        const rowPositionStr = matches[1];
        const columnPositionStr = matches[2];

        const row = this.binarySpacePartition(rowPositionStr, 'F', 'B');
        const column = this.binarySpacePartition(columnPositionStr, 'L', 'R');

        return new BinaryBoardingPass(row, column);
    }

    /**
     * @param {string} str - A string consisting of two characters that indicates a unique position in a given space.
     * @param {string} lowerChar - The character in 'str' which represents the 'lower' half.
     * @param {string} upperChar - The character in 'str' which represents the 'upper' half.
     * @return {number}
     * @private
     */
    static binarySpacePartition(str, lowerChar, upperChar) {
        let minRange = 0;
        let maxRange = Math.pow(2, str.length);;
        for (const char of str) {
            if (char === lowerChar) {
                maxRange = maxRange - ((maxRange - minRange) / 2);
            } else if (char === upperChar) {
                minRange = minRange + ((maxRange - minRange) / 2);
            }
        }
        return minRange;
    }
}

module.exports = BinaryBoardingPass;
