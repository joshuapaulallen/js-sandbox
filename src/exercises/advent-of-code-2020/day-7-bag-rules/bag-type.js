/**
 * Describes a bag.
 */
class BagType {
    /**
     * @constructor
     * @param {string} color - e.g., 'red' or 'turquoise'
     * @param {string} colorModifier - e.g., 'bright' or 'faded'
     */
    constructor(color, colorModifier) {
        this.color = color;
        this.colorModifier = colorModifier;
    }

    /**
     * @return {string}
     */
    toString() {
        return `${this.colorModifier}-${this.color}`;
    }
}

module.exports = BagType;
