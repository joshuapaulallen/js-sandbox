const open = '.';
const tree = '#';

/**
 * Calculate the number of trees encountered when traveling down a slope on a linear path.
 * @param {string[]} slopeLines - Represents the slope, assumes each line is the same length and represents a repeating pattern.
 * @param {number} xDelta - With each jump down, determines how far "right" (+) or "left" (-) to travel.
 * @param {number} yDelta - The number of lines to jump down with each jump.
 * @return {number}
 */
function calculateTreesOnLinearPath(slopeLines, xDelta, yDelta) {
    // start at the top-left
    let x = 0;
    let y = 0;
    let treeCount = 0;
    let slopeLineWidth = slopeLines[0].length;
    let slopeLineCount = slopeLines.length;

    // navigate down the slope, one jump at a time, checking for trees
    while (y < slopeLineCount) {
        if (slopeLines[y][x] === tree) {
            treeCount++;
        }

        // apply the 'vertical' delta
        y += yDelta;

        // apply the 'horizontal' delta to use on the next jump
        x = (x + xDelta) % slopeLineWidth;
    }

    return treeCount;
}

module.exports = {
    calculateTreesOnLinearPath,
};
