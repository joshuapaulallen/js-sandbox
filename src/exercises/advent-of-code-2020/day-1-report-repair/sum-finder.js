/**
 * Finds a tuple from the numbers in the given array that sum to the given value.
 * @param {number[]} numbers
 * @param {number} tupleSize
 * @param {number} sum
 * @return {null|number[]} An array of numbers with a length of the tuple size if a result was found, or null if not.
 */
function findTupleWithSum(numbers, tupleSize, sum) {
    // invalid case
    if (tupleSize <= 0) {
        throw new Error('invalid tuple size');
    }
    // the base case: look for a single number that matches the sum
    if (tupleSize === 1) {
        const found = numbers.find((i) => i === sum);
        return found ? [found] : null;
    }

    // divide into subproblems: look for a tuple that adds up to the sum less the "current" number
    for (let i = 0; i < numbers.length; i++) {
        const current = numbers[i];
        const numbersWithoutCurrent = numbers.slice(0, i).concat(numbers.slice(i + 1));
        const subtuple = findTupleWithSum(numbersWithoutCurrent, tupleSize - 1, sum - current);
        if (subtuple) {
            subtuple.push(current);
            return subtuple;
        }
    }

    return null;
}

module.exports = {
    findTupleWithSum,
};
