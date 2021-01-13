const fs = require('fs');
const BagType = require('../../../../src/exercises/advent-of-code-2020/day-7-bag-rules/bag-type');
const BagRule = require('../../../../src/exercises/advent-of-code-2020/day-7-bag-rules/bag-rule');
const BagRuleSet = require('../../../../src/exercises/advent-of-code-2020/day-7-bag-rules/bag-rule-set');

describe('bag rule set', () => {
    describe('bag type', () => {
        it('should toString to an expected value', () => {
            expect(new BagType('blue', 'shiny').toString()).to.equal('shiny-blue');
        });
    });
    describe('bag rule', () => {
       it('should parse a string into a bag rule', () => {
           const bagRuleStr = 'dark olive bags contain 3 faded blue bags, 1 dotted black bag.';
           const bagRule = BagRule.parse(bagRuleStr);

           expect(bagRule.bagType).to.deep.equal({ color: 'olive', colorModifier: 'dark' });
           expect(bagRule.bagTypeCounts).to.deep.equal([
               { count: 3, bagType: { color: 'blue', colorModifier: 'faded' } },
               { count: 1, bagType: { color: 'black', colorModifier: 'dotted' } },
           ]);
       });
       it('should parse a string indicating a bag type can contain no bags into a bag rule', () => {
           const bagRuleStr = 'dotted black bags contain no other bags.';
           const bagRule = BagRule.parse(bagRuleStr);

           expect(bagRule.bagType).to.deep.equal({ color: 'black', colorModifier: 'dotted' });
           expect(bagRule.bagTypeCounts).to.deep.equal([]);
       });
       it('should indicate how many bags can fit in a bag of a certain bag type', () => {
           const bagRuleStr = 'dark olive bags contain 3 faded blue bags, 1 dotted black bag.';
           const bagRule = BagRule.parse(bagRuleStr);

           expect(bagRule.calculateTotalBagCapacity()).to.equal(4);
           expect(bagRule.calculateCapacityForTargetBagType(new BagType('blue', 'faded'))).to.equal(3);
           expect(bagRule.calculateCapacityForTargetBagType(new BagType('black', 'dotted'))).to.equal(1);
           expect(bagRule.calculateCapacityForTargetBagType(new BagType('red', 'dotted'))).to.equal(0);
       });
    });

    describe('bag rule set', () => {
        it('should indicate whether a bag can eventually contain a bag of a given bag type for a limited rule set', () => {
            const bagRuleStrs = [
                'light red bags contain 1 bright white bag, 2 muted yellow bags.',
                'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
                'bright white bags contain 1 shiny gold bag.',
                'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
                'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
                'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
                'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
                'faded blue bags contain no other bags.',
                'dotted black bags contain no other bags.',
            ];
            const bagRules = bagRuleStrs.map(BagRule.parse);
            const bagRuleSet = new BagRuleSet(bagRules);

            // make sure the rule set has expected properties
            expect(bagRuleSet.getBagTypes().length).to.equal(bagRuleStrs.length);

            // some trivial tests for "direct" relationships
            expect(bagRuleSet.calculateBagCapacityForTargetBagType(new BagType('red', 'light'), new BagType('white', 'bright'))).to.equal(1);
            expect(bagRuleSet.calculateBagCapacityForTargetBagType(new BagType('red', 'light'), new BagType('yellow', 'muted'))).to.equal(2);
            expect(bagRuleSet.calculateBagCapacityForTargetBagType(new BagType('red', 'light'), new BagType('chartreuse', 'muted'))).to.equal(0);
            expect(bagRuleSet.calculateBagCapacityForTargetBagType(new BagType('blue', 'faded'), new BagType('black', 'dotted'))).to.equal(0);

            // tests for "indirect" relationships (i.e., bag A contains bag B contains bag C)
            expect(bagRuleSet.calculateBagCapacityForTargetBagType(new BagType('red', 'light'), new BagType('gold', 'shiny'))).to.equal((1 * 1) + (2 * 2));

            // finally, find the number of bag types that can eventually contain at least one shiny gold bag
            const canContainShinyGoldBag = bagRuleSet.getBagTypes()
                .filter((bagType) => bagRuleSet.calculateBagCapacityForTargetBagType(bagType, new BagType('gold', 'shiny')) > 0)
            expect(canContainShinyGoldBag.length).to.equal(4);
        });

        it('should accept many rules from a file and determine the number of bags that can eventually contain at least one shiny gold bag', async () => {
            const inputFile = './test/exercises/advent-of-code-2020/day-7-bag-rules/input.txt';
            const input = await fs.readFileSync(inputFile, 'utf-8').trim().split('\n');
            const bagRules = input.map(BagRule.parse);
            const bagRuleSet = new BagRuleSet(bagRules);

            // find the number of bag types that can eventually contain at least one shiny gold bag
            const canContainShinyGoldBag = bagRuleSet.getBagTypes()
                .filter((bagType) => bagRuleSet.calculateBagCapacityForTargetBagType(bagType, new BagType('gold', 'shiny')) > 0)
            console.log(canContainShinyGoldBag.length);
        });

        it('should accept many rules from a file and determine the total number of bags that can eventually be contained in a shiny gold bag', async () => {
            const inputFile = './test/exercises/advent-of-code-2020/day-7-bag-rules/input.txt';
            const input = await fs.readFileSync(inputFile, 'utf-8').trim().split('\n');
            const bagRules = input.map(BagRule.parse);
            const bagRuleSet = new BagRuleSet(bagRules);

            // find the number of bag types that can eventually contain at least one shiny gold bag
            console.log(bagRuleSet.calculateTotalBagCapacity(new BagType('gold', 'shiny')));
        });
    });
});
