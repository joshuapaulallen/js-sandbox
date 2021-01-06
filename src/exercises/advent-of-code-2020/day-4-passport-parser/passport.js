const passportFields = [
    { name: 'birthYear', required: true },
    { name: 'issueYear', required: true },
    { name: 'expirationYear', required: true },
    { name: 'height', required: true },
    { name: 'hairColor', required: true },
    { name: 'eyeColor', required: true },
    { name: 'passportId', required: true },
    { name: 'countryId', required: false },
];

class Passport {

    /**
     * @typedef {object} PassportInput
     * @param {string} birthYear
     * @param {string} issueYear
     * @param {string} expirationYear
     * @param {string} height
     * @param {string} hairColor
     * @param {string} eyeColor
     * @param {string} passportId
     * @param {string} [countryId]
     */

    /**
     * @constructor
     * @param {PassportInput} passwordInput
     */
    constructor(passwordInput) {
        for (const field of passportFields) {
            if (typeof passwordInput[field.name] !== 'undefined') {
                this[field.name] = passwordInput[field.name];
            }
        }
    }

    /**
     * @return {boolean} true if the current object is valid, i.e., has values for all required fields; returns false otherwise
     */
    validate() {
        return passportFields.filter((field) => field.required)
            .reduce((accumulator, currentField) => {
                return accumulator && !!this[currentField.name]
            }, true);
    }
}

module.exports = Passport;
