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
    static decodeSimple(line) {
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

    /**
     * @param line {string}
     * @return {string} the decoded digits
     */
    static decodeComplete(line) {
        const descrambler = this.parse(line);

        // create a map of clues by length
        // 2: 1
        // 3: 7
        // 4: 4
        // 5: 2, 3, 5
        // 6: 0, 6, 9
        // 7: 8
        const cluesByLength = {};
        descrambler.clues.forEach(clue => {
            const normalizedClue = this.normalizeEncodedDigit(clue)
            const i = Object.keys(cluesByLength).find(k => Number(k) === clue.length);
            if (i) {
                cluesByLength[i].push(normalizedClue);
            } else {
                cluesByLength[clue.length.toString()] = [normalizedClue];
            }
        });

        // 1, 4, 7, and 8 have unique lengths
        const decodeMap = {};
        decodeMap["1"] = cluesByLength["2"][0];
        decodeMap["4"] = cluesByLength["4"][0];
        decodeMap["7"] = cluesByLength["3"][0];
        decodeMap["8"] = cluesByLength["7"][0];

        // create a map of letters to digit positions
        const letterByPosition = {};

        // the top-center position is the one in the 7 that is not included in the 1
        letterByPosition["topCenter"] = decodeMap["7"].split('').find(c => !decodeMap["1"].includes(c));

        // the center position is the one common to 2, 3, and 5 that is also common to 4
        letterByPosition["center"] = this.findCommonChars(cluesByLength["5"]).split('')
            .filter(c => decodeMap["4"].includes(c)).join('');

        // the 0 is the clue of length 6 that does not have the center letter
        decodeMap["0"] = cluesByLength["6"].find(clue => !clue.includes(letterByPosition["center"]));

        // the 9 is the clue of length 6 that is not the 0 and also contains both letters in 1
        decodeMap["9"] = cluesByLength["6"].find(
            clue => clue !== decodeMap["0"]
                && clue.includes(decodeMap["1"][0]) && clue.includes(decodeMap["1"][1])
        );

        // the 6 is the clue of length 6 that is neither the 0 nor 9
        decodeMap["6"] = cluesByLength["6"].find(clue => clue !== decodeMap["0"] && clue !== decodeMap["9"]);

        // the 3 is the clue of length 5 that contains both letters in 1
        decodeMap["3"] = cluesByLength["5"].find(
            clue => clue.includes(decodeMap["1"][0]) && clue.includes(decodeMap["1"][1])
        );

        // the 5 is the clue of length 5 that also contains all segments in 6
        decodeMap["5"] = cluesByLength["5"].find(
            clue => this.findCommonChars([clue, decodeMap["6"]]).length === 5
        );

        // the 2 is the clue of length 5 that is neither the 3 nor 5
        decodeMap["2"] = cluesByLength["5"].find(clue => clue !== decodeMap["3"] && clue !== decodeMap["5"]);

        // now that we have our complete decode map, translate to a digit
        let decodedDigits = "";
        descrambler.encodedDigits.forEach(encodedDigit => {
            const normalizedEncodedDigit = this.normalizeEncodedDigit(encodedDigit);
            const found = Object.keys(decodeMap).find(k => normalizedEncodedDigit === decodeMap[k]);
            if (found) {
                decodedDigits += found;
            } else {
                console.error(`did not find encoded digit '${encodedDigit}`);
            }
        });

        // console.log(`${line} - ${decodedDigits}`);

        return decodedDigits;
    }

    /**
     * Finds the common characters in the given array of strings.
     *
     * @param strArray {string[]}
     * @return {string}
     */
    static findCommonChars(strArray) {
        if (strArray.length === 0 ) {
            return '';
        }
        let commonChars = strArray[0];
        for (let i = 1; i < strArray.length; i++) {
            commonChars = commonChars.split('').filter(c => strArray[i].includes(c)).join('');
        }

        return commonChars;
    }

    static normalizeEncodedDigit(encodedDigit) {
        return encodedDigit.split('').sort().join('');
    }

}

module.exports = {
    DigitDescrambler
};
