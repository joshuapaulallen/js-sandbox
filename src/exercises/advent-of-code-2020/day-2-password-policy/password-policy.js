class PasswordPolicyLetterFrequency {

    constructor(letter, minCount, maxCount) {
        this.letter = letter;
        this.minCount = minCount;
        this.maxCount = maxCount;
    }

    /**
     * @param str
     * @return {boolean} true if the given password meets the password policy, false otherwise
     */
    check(str) {
        const numChars = this.numCharsInString(str, this.letter);
        return numChars >= this.minCount && numChars <= this.maxCount;
    }

    numCharsInString(str, char) {
        let result = 0;
        let i = 0;
        while ((i = str.indexOf(char, i)) >= 0) {
            i++;
            result++;
        }

        return result;
    }
}

class PasswordPolicyPositional {

    constructor(letter, firstPosition, secondPosition) {
        this.letter = letter;
        this.firstPosition = firstPosition;
        this.secondPosition = secondPosition;
    }

    /**
     *
     * @param str
     * @return {boolean} true if the given password meets the password policy, false otherwise
     */
    check(str) {
        const firstLetterMatches = str[this.firstPosition - 1] === this.letter;
        const secondLetterMatches = str[this.secondPosition - 1] === this.letter;
        return (firstLetterMatches && !secondLetterMatches) || (!firstLetterMatches && secondLetterMatches)
    }
}

const passwordRegex = /(\d+)-(\d+) ([a-z]{1}): (.*)/

function checkPasswordLetterFrequency(line) {
    const matches = line.match(passwordRegex);
    return new PasswordPolicyLetterFrequency(matches[3], Number(matches[1]), Number(matches[2])).check(matches[4]);
}

function checkPasswordPositional(line) {
    const matches = line.match(passwordRegex);
    return new PasswordPolicyPositional(matches[3], Number(matches[1]), Number(matches[2])).check(matches[4]);
}

module.exports = {
    checkPasswordLetterFrequency,
    checkPasswordPositional
};
