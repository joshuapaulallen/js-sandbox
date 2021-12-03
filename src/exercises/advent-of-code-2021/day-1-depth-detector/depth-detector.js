/**
 * Given a list of numbers, calculate how often the number increases.
 *
 * @param numbers A list of numbers.
 * @return The number of times an increase occurs from one number to the next.
 */
function calculateNumIncreases(numbers) {
    var numIncreases = 0;
    for (var i = 1; i < numbers.length; i++) {
        if (numbers[i - 1] < numbers[i]) {
            numIncreases++;
        }
    }

    return numIncreases;
}

module.exports = {
    calculateNumIncreases,
};
