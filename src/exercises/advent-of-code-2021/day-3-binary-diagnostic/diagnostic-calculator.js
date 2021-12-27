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
 * Calculate the "Epsilon rate" for the given rows of Strings representing binary numbers.
 *
 * The Epsilon rate is calculated by choosing the LESS common digit (1 vs 0) in each bit in sequence, appending them
 * together (creating a binary number), and finally converting to decimal and returning a Number.
 *
 * @param inputRows {String[]} The rows of binary numbers.
 * @return {Number} the epsilon rate (see above).
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

/**
 * Calculate the "Oxygen generator rating" for the given rows of Strings representing binary numbers.
 *
 * The Oxygen generator rating is determined by calculating the MORE common digit (1 vs 0) in each bit in sequence,
 * and then filtering out numbers that do not share that digit in that position.  This should repeat until only one
 * number remains.
 *
 * @param inputRows {String[]} The rows of binary numbers.
 * @return {Number} the oxygen generator rating (see above).
 */
function calculateOxygenGeneratorRating(inputRows) {
    var numbers = [ ...inputRows ];

    // assume every string is of the same length
    for (var i = 0; i < numbers[0].length; i++) {
        const numZeros = numbers.map(row => row[i]).filter(ch => ch === '0').length;
        const numOnes = numbers.map(row => row[i]).filter(ch => ch === '1').length;
        const searchBit = numOnes >= numZeros ? '1' : '0';
        numbers = numbers.filter(n => n[i] === searchBit);

        if (numbers.length === 1) {
            break;
        }
    }

    if (numbers.length > 1) {
        throw Error(`${numbers.length} numbers remain after processing all digits, expected 1`);
    }

    return binaryToDecimal(numbers[0]);
}

/**
 * Calculate the "CO2 scrubber rating" for the given rows of Strings representing binary numbers.
 *
 * The CO2 scrubber rating is determined by calculating the LESS common digit (1 vs 0) in each bit in sequence,
 * and then filtering out numbers that do not share that digit in that position.  This should repeat until only one
 * number remains.
 *
 * @param inputRows {String[]} The rows of binary numbers.
 * @return {Number} the oxygen generator rating (see above).
 */
function calculateCO2ScrubberRating(inputRows) {
    var numbers = [ ...inputRows ];

    // assume every string is of the same length
    for (var i = 0; i < numbers[0].length; i++) {
        const numZeros = numbers.map(row => row[i]).filter(ch => ch === '0').length;
        const numOnes = numbers.map(row => row[i]).filter(ch => ch === '1').length;
        const searchBit = numOnes < numZeros ? '1' : '0';
        numbers = numbers.filter(n => n[i] === searchBit);

        if (numbers.length === 1) {
            break;
        }
    }

    if (numbers.length > 1) {
        throw Error(`${numbers.length} numbers remain after processing all digits, expected 1`);
    }

    return binaryToDecimal(numbers[0]);
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
    calculateEpsilon,
    calculateOxygenGeneratorRating,
    calculateCO2ScrubberRating
}