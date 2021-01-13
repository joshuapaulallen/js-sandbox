const BagType = require('./bag-type');
const BagTypeCount = require('./bag-type-count');

/**
 * Describes what bags a given bag type can contain.
 */
class BagRule {
    /**
     * @constructor
     * @param {BagType} bagType
     * @param {BagTypeCount[]} bagTypeCounts
     */
    constructor(bagType, bagTypeCounts) {
        this.bagType = bagType;
        this.bagTypeCounts = bagTypeCounts.slice();
    }

    /**
     * A helper method to parse a given string with a specific format into a {@link BagRule}
     * @param {string} bagRuleStr - A string with details about the bag rule, e.g., 'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.'
     * @returns {BagRule}
     */
    static parse(bagRuleStr) {
        const matches = bagRuleStr.match(/([a-z]+) ([a-z]+) bags contain (.*)\./);
        const bagTypeColor = matches[2];
        const bagTypeColorModifier = matches[1];
        const bagTypeContainsRuleStr = matches[3];
        const bagType = new BagType(bagTypeColor, bagTypeColorModifier);

        const bagTypeCounts = [];
        if (bagTypeContainsRuleStr !== 'no other bags') {
            const bagTypeContainsRuleStrs = bagTypeContainsRuleStr.split(', ');
            for (const bagTypeContainsRuleStr of bagTypeContainsRuleStrs) {
                const containsMatches = bagTypeContainsRuleStr.match(/(\d+) ([a-z]+) ([a-z]+) bags?/);
                const bagCount = containsMatches[1];
                const bagCountColor = containsMatches[3];
                const bagCountColorModifier = containsMatches[2];
                bagTypeCounts.push(new BagTypeCount(new BagType(bagCountColor, bagCountColorModifier), Number(bagCount)));
            }
        }

        return new BagRule(bagType, bagTypeCounts);
    }

    /**
     * Calculate how many bags of a given bag type can be directly contained in this bag.
     * @param {BagType} bagType
     * @returns {number}
     */
    calculateCapacity(bagType) {
        // look for a bag type in our list of counts
        const foundBagTypeCount = this.bagTypeCounts.find((bagTypeCount) => bagType.toString() === bagTypeCount.bagType.toString());
        if (!foundBagTypeCount) {
            return 0;
        }

        return foundBagTypeCount.count;
    }
}

module.exports = BagRule;
