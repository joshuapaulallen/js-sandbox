/**
 * Finds two numbers in the given array that sum to the given value.
 * @param {number[]} numbers
 * @param {number} sum
 * @return {null|number[]} An array of two numbers if a result was found, or null if not.
 */
function findTwoTupleWithSum(numbers, sum) {
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === sum) {
                return [numbers[i], numbers[j]];
            }
        }
    }

    return null;
}

module.exports = {
    findTwoTupleWithSum,
};
