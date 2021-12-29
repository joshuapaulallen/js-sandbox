class BingoBoardItem {
    constructor(val, x, y) {
        this.val = val;
        this.x = x;
        this.y = y;
        this.marked = false;
    }

    mark() {
        this.marked = true;
    }

    isMarked() {
        return this.marked;
    }
}

class BingoBoard {

    constructor(items) {
        this.items = [ ...items ];
    }

    /**
     * Parse the given string into a BingoBoard.
     *
     * @param boardAsString The string to parse. Rows are assumed to be separated by a single newline character, and
     *                      columns by a single space.
     */
    static parse(boardAsString) {
        const items = [];

        const rows = boardAsString.trim().split(/\s*\n\s*/);
        for (var i = 0; i < rows.length; i++) {
            const values = rows[i].split(/\s+/);
            for(var j = 0; j < rows.length; j++) {
                items.push(new BingoBoardItem(Number(values[j]), i, j));
            }
        }

        return new BingoBoard(items);
    }

    /**
     * Mark the board item with the given value
     *
     * @param val The number to mark.
     * @returns {boolean} true if an unmarked item was found and marked, false otherwise.
     */
    mark(val) {
        const valStr = val;
        const matchingItem = this.items.find((i) => i.val === valStr);
        if (matchingItem && !matchingItem.isMarked()) {
            matchingItem.mark();
        }

        return !!matchingItem;
    }

    isSolved() {
        return this.hasFullyMarkedRow() || this.hasFullyMarkedColumn();
    }

    hasFullyMarkedRow() {
        const byRow = {};
        this.items.forEach(i => {
            if (byRow[i.x]) {
                byRow[i.x].push(i);
            } else {
                byRow[i.x] = [i];
            }
        });

        return Object.values(byRow)
            .map(rowItems => rowItems.map(i => i.isMarked()).reduce((a, c) => a && c, true))
            .reduce((a, c) => a || c, false);
    }

    hasFullyMarkedColumn() {
        const byColumn = {};
        this.items.forEach(i => {
            if (byColumn[i.y]) {
                byColumn[i.y].push(i);
            } else {
                byColumn[i.y] = [i];
            }
        });

        return Object.values(byColumn)
            .map(columnItems => columnItems.map(i => i.isMarked()).reduce((a, c) => a && c, true))
            .reduce((a, c) => a || c, false);
    }

    sum() {
        return this.items.reduce((a, c) => a.val + c);
    }

    sumUnmarked() {
        return this.items.filter(i => !i.isMarked()).reduce((a, c) => a + c.val, 0);
    }
}

class BingoGame {

    /**
     * Play a bingo game with the given set of input numbers and bingo boards. As soon as the first winning board is
     * encountered, return the score of that board.
     *
     * @returns {null|number} The score of the *first* winning BingoBoard, or null if there was no winner.
     */
    static playQuick(nums, bingoBoards) {
        for (var i = 0; i < nums.length; i++) {
            const num = Number(nums[i]);
            for (var j = 0; j < bingoBoards.length; j++) {
                bingoBoards[j].mark(num);
                if (bingoBoards[j].isSolved()) {
                    return bingoBoards[j].sumUnmarked() * num;
                }
            }
        }

        return null;
    }

    /**
     * Play a bingo game with the given set of input numbers and bingo boards. Play until all numbers are used or
     * until every bingo board is a winner.
     *
     * @returns {null|number} The score of the *last* winning BingoBoard, or null if there was no winner.
     */
    static playFull(nums, bingoBoards) {
        const boards = [ ...bingoBoards ];

        for (var i = 0; i < nums.length; i++) {
            const num = Number(nums[i]);
            for (var j = 0; j < boards.length; j++) {
                boards[j].mark(num);
                if (boards[j].isSolved()) {
                    if (boards.length === 1) {
                        return boards[j].sumUnmarked() * num;
                    } else {
                        boards.splice(j, 1);
                    }

                }
            }
        }

        return null;
    }
}

module.exports = {
    BingoBoard,
    BingoGame,
};
