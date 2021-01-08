function parseAndCountCharsPerGroup(blob) {
    return blob.split(/\n{2,}/g)
        .map((groupStr) => calculateUniqueCharsForGroup(groupStr.split('\n')));
}

function parseAndCountCharsAppearAllLinesPerGroup(blob) {
    const groups = blob.split(/\n{2,}/g)
    return groups.map((groupStr) => calculateCharsAppearAllLinesForGroup(groupStr.trim().split('\n')));
}

function calculateUniqueCharsForGroup(strGroup) {
    return Object.keys(calculateCountForGroup(strGroup)).length;
}

function calculateCharsAppearAllLinesForGroup(strGroup) {
    const groupCountByChar = calculateCountForGroup(strGroup);
    const numLines = strGroup.length;
    const lettersInAllLines = Object.keys(groupCountByChar).filter((letter) => groupCountByChar[letter] === numLines);
    return lettersInAllLines.length;
}

function calculateCountForGroup(strGroup) {
    const groupCountByChar = {}
    for (const str of strGroup) {
        const countByChar = calculateCountByChar(str);
        for (const k of Object.keys(countByChar)) {
            if (!groupCountByChar[k]) {
                groupCountByChar[k] = countByChar[k];
            } else {
                groupCountByChar[k] += countByChar[k]
            }
        }
    }

    return groupCountByChar;
}

function calculateCountByChar(str) {
    const countByChar = {};
    for (const char of str) {
        if (!countByChar[char]) {
            countByChar[char] = 1;
        } else {
            countByChar[char]++;
        }
    }

    return countByChar;
}

module.exports = {
    parseAndCountCharsPerGroup,
    parseAndCountCharsAppearAllLinesPerGroup,
    calculateCountByChar,
};
