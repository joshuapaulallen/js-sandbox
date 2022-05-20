class DigitDescrambler {

    /**
     * @constructor
     * @param clues {string[]}
     * @param encodedDigits {string[]}
     */
    constructor(clues, encodedDigits) {
        this.clues = [ ...clues ];
        this.encodedDigits = [ ...encodedDigits ];
    }

    static parse(line) {
        const parts = line.split(' | ');
        const clues = parts[0].split(' ');
        const encodedDigits = parts[1].split(' ');

        return new DigitDescrambler(clues, encodedDigits);
    }

    /**
     * @param line {string}
     * @return {string} the digits that could be decoded, or '?' if a digit could not be decoded
     */
    static decode(line) {
        const descrambler = this.parse(line);

        const decodeMap = {};
        descrambler.clues.forEach(clue => {
            const normalizedClue = this.normalizeEncodedDigit(clue);
            if (normalizedClue.length === 2) {
                decodeMap["1"] = normalizedClue;
            }
            if (normalizedClue.length === 4) {
                decodeMap["4"] = normalizedClue;
            }
            if (normalizedClue.length === 3) {
                decodeMap["7"] = normalizedClue;
            }
            if (normalizedClue.length === 7) {
                decodeMap["8"] = normalizedClue;
            }
        });

        let decodedDigits = "";
        descrambler.encodedDigits.forEach(encodedDigit => {
            const normalizedEncodedDigit = this.normalizeEncodedDigit(encodedDigit);
            const found = Object.keys(decodeMap).find(k => normalizedEncodedDigit === decodeMap[k]);
            if (found) {
                decodedDigits += found;
            } else {
                decodedDigits += '?';
            }
        });

        return decodedDigits;
    }

    static normalizeEncodedDigit(encodedDigit) {
        return encodedDigit.split('').sort().join('');
    }

}

module.exports = {
    DigitDescrambler
};
