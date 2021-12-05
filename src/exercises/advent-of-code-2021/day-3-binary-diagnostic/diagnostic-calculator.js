/**
 * Calculate the "Gamma rate" for the given rows of Strings representing binary numbers.
 *
 * The Gamma rate is calculated by choosing the MORE common digit (1 vs 0) in each bit in sequence, appending them
 * together (creating a binary number), and finally converting to decimal and returning a Number.
 *
 * @param inputRows {String[]} The rows of binary numbers.
 * @return {Number} the gamma rate (see above).
 */
function calculateGamma(inputRows) {
    var binaryGammaStr = '';

    // assume every string is of the same length
    for (var i = 0; i < inputRows[0].length; i++) {
        const numZeros = inputRows.map(row => row[i]).filter(ch => ch === '0').length;
        if (numZeros > (inputRows.length / 2)) {
            binaryGammaStr += '0';
        } else {
            binaryGammaStr += '1';
        }
    }

    return binaryToDecimal(binaryGammaStr);
}

/**
 * Calculate the "Epsilo rate" for the given rows of Strings representing binary numbers.
 *
 * The Gamma rate is calculated by choosing the LESS common digit (1 vs 0) in each bit in sequence, appending them
 * together (creating a binary number), and finally converting to decimal and returning a Number.
 *
 * @param inputRows {String[]} The rows of binary numbers.
 * @return {Number} the gamma rate (see above).
 */
function calculateEpsilon(inputRows) {
    var binaryEpsilonStr = '';

    // assume every string is of the same length
    for (var i = 0; i < inputRows[0].length; i++) {
        const numZeros = inputRows.map(row => row[i]).filter(ch => ch === '0').length;
        if (numZeros < (inputRows.length / 2)) {
            binaryEpsilonStr += '0';
        } else {
            binaryEpsilonStr += '1';
        }
    }

    return binaryToDecimal(binaryEpsilonStr);
}

function binaryToDecimal(binaryNumberStr) {
    var decimal = 0;
    for (var i = 0; i < binaryNumberStr.length; i++) {
        decimal += (Number(binaryNumberStr[binaryNumberStr.length - 1 - i])) * Math.pow(2, i);
    }

    return decimal;
}

module.exports = {
    binaryToDecimal,
    calculateGamma,
    calculateEpsilon
}