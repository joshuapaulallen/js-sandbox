class BagRuleSet {

    /**
     * @constructor
     * @param {BagRule[]} bagRules
     */
    constructor(bagRules) {
        // keep a copy of the raw bag rules
        this.bagRules = bagRules.slice();
        this.bagTypes = this.bagRules.map((bagRule) => bagRule.bagType);

        // create a convenient dictionary allowing us to look up a rule by bag type
        this.bagRuleLookup = {};
        this.bagRules.forEach((bagRule) => {
            this.bagRuleLookup[bagRule.bagType.toString()] = bagRule;
        });
    }

    getBagTypes() {
        return this.bagTypes;
    }

    /**
     * Calculate how many bags of a given "target" bag type can eventually be contained in bag of the given bag type.
     * @param {BagType} bagType - The bag type in which to look.
     * @param {BagType} targetBagType - the sought-after bag type
     */
    calculateBagCapacityForTargetBagType(bagType, targetBagType) {
        const bagRule = this.bagRuleLookup[bagType.toString()];
        if (!bagRule) {
            return 0;
        }

        let containsCount = bagRule.calculateCapacityForTargetBagType(targetBagType);

        for (const bagRuleCount of bagRule.bagTypeCounts) {
            containsCount += this.calculateBagCapacityForTargetBagType(bagRuleCount.bagType, targetBagType) * bagRuleCount.count;
        }

        return containsCount;
    }

    /**
     * Calculate how many bags of any bag type can be eventually contained a bag with the given type.
     * @param {BagType} bagType
     * @returns {number}
     */
    calculateTotalBagCapacity(bagType) {
        const bagRule = this.bagRuleLookup[bagType.toString()];
        if (!bagRule) {
            return 0;
        }

        let containsCount = bagRule.calculateTotalBagCapacity();

        for (const bagRuleCount of bagRule.bagTypeCounts) {
            containsCount += this.calculateTotalBagCapacity(bagRuleCount.bagType) * bagRuleCount.count;
        }

        return containsCount;
    }
}

module.exports = BagRuleSet;
