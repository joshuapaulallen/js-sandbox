const simpleNumberToWordMap = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '10': 'ten',
    '11': 'eleven',
    '12': 'twelve',
    '13': 'thirteen',
    '14': 'fourteen',
    '15': 'fifteen',
    '16': 'sixteen',
    '17': 'seventeen',
    '18': 'eighteen',
    '19': 'nineteen'
};

const tensDigitToWordMap = {
    '2': 'twenty',
    '3': 'thirty',
    '4': 'forty',
    '5': 'fifty',
    '6': 'sixty',
    '7': 'seventy',
    '8': 'eighty',
    '9': 'ninety'
};

const digitGroupToWord = {
    '0': '',
    '1': 'thousand',
    '2': 'million',
    '3': 'billion',
    '4': 'trillion',
    '5': 'quadrillion'
};

function capitalizeFirstLetter(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

function wordifyDigitGroup(digitGroupStr) {
    let wordified = '';
    if (digitGroupStr.length === 1) {
        wordified = simpleNumberToWordMap[digitGroupStr];
    } else {
        let hundredsWordified = '';
        if (digitGroupStr.length === 3 && digitGroupStr.substring(0, 1) !== '0') {
            hundredsWordified = `${simpleNumberToWordMap[digitGroupStr.slice(0, 1)]} hundred`;
        }

        let tensAndOnesWordified = '';
        const tensDigit = digitGroupStr.substring(digitGroupStr.length - 2, digitGroupStr.length - 1);
        const onesDigit = digitGroupStr.substring(digitGroupStr.length - 1);
        if (tensDigit === '0') {
            if (onesDigit !== '0') {
                tensAndOnesWordified = simpleNumberToWordMap[onesDigit];
            }
        } else if (tensDigit === '1') {
            tensAndOnesWordified = simpleNumberToWordMap[`${tensDigit}${onesDigit}`];
        } else {
            if (onesDigit === '0') {
                tensAndOnesWordified = tensDigitToWordMap[tensDigit];
            } else {
                tensAndOnesWordified = `${tensDigitToWordMap[tensDigit]}-${simpleNumberToWordMap[onesDigit]}`;
            }
        }

        if (hundredsWordified) {
            wordified += hundredsWordified;
            if (tensAndOnesWordified) {
                wordified += ' and ';
            }
        }
        wordified += tensAndOnesWordified;
    }

    return wordified;
}

function wordifyInteger(integerStr) {
    // split into digit groups, starting from groups closest to the decimal
    const digitGroups = [];
    let i = integerStr.length;
    while (i > 0) {
        digitGroups.push(integerStr.slice(Math.max(0, i - 3), i));
        i -= 3;
    }

    // wordify every digit group
    const digitGroupsWordified = digitGroups.map(wordifyDigitGroup);

    // add suffixes to each digit group
    const digitGroupsWordifiedWithSuffix = [];
    for (i = 0; i < digitGroupsWordified.length; i++) {
        const digitGroupWordified = digitGroupsWordified[i];
        if (digitGroupWordified) {
            const suffix = digitGroupToWord[i];
            const digitGroupWordifiedWithSuffix = suffix ? `${digitGroupsWordified[i]} ${suffix}` : digitGroupsWordified[i];
            digitGroupsWordifiedWithSuffix.push(digitGroupWordifiedWithSuffix);
        }

    }

    // reverse and join the wordified digit groups together
    digitGroupsWordifiedWithSuffix.reverse();

    if (digitGroupsWordifiedWithSuffix.length === 2) {
        return digitGroupsWordifiedWithSuffix.join(' and ');
    }
    return digitGroupsWordifiedWithSuffix.join(', ');
}

function trimLeadingZeros(numberStr) {
    let trimmed = numberStr;
    while(trimmed.length > 0 && trimmed[0] === '0') {
        trimmed = trimmed.substring(1);
    }

    return trimmed;
}

function wordifyDecimal(decimalStr) {
    let numerator = trimLeadingZeros(decimalStr);

    const denominator = '1'.padEnd(decimalStr.length + 1, '0');
    return `${numerator}/${denominator}`;
}

/**
 * Wordify the given number.
 * @param {number} number
 * @return {string} That number, but WORDIFIED.
 */
function wordify(number) {
    const numberStr = number.toString();
    const decimalIndex = numberStr.indexOf('.');

    let wordified = null;
    if (decimalIndex === -1) {
        wordified = wordifyInteger(numberStr);
    } else {
        const wordifiedInteger = wordifyInteger(numberStr.substr(0, decimalIndex));
        const wordifiedDecimal = wordifyDecimal(numberStr.substr(decimalIndex + 1));
        wordified = `${wordifiedInteger} and ${wordifiedDecimal}`;
    }

    return capitalizeFirstLetter(wordified);
}

module.exports = { wordify };
