/**
 * Given a list of numbers, calculate how often the number increases among sets of X numbers.
 *
 * @param numbers A list of numbers.
 * @param windowSize The number of numbers to consider when detecting increases.
 * @return The number of times an increase occurs from the sum of a set of numbers to the next.
 */
function calculateNumIncreases(numbers, windowSize = 1) {
    var numIncreases = 0;
    for (var i = windowSize; i < numbers.length; i++) {
        if (numbers[i - windowSize] < numbers[i]) {
            numIncreases++;
        }
    }

    return numIncreases;
}

module.exports = {
    calculateNumIncreases,
};
