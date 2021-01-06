const heightValidator = (v) => {
    if (!v) {
        return false;
    }

    const matches = v.match(/(\d+)(cm|in)/);
    if (matches === null) {
        return false;
    }

    const num = matches[1];
    const unit = matches[2];

    if (unit === 'in') {
        return num >= 59 && num <= 76;
    }
    if (unit === 'cm') {
        return num >= 150 && num <= 193;
    }

    return false;
};

const passportFields = [
    { name: 'birthYear', validate: (v) => !!v && v.length === 4 && Number(v) >= 1920 && Number(v) <= 2002 },
    { name: 'issueYear', validate: (v) => !!v && v.length === 4 && Number(v) >= 2010 && Number(v) <= 2020 },
    { name: 'expirationYear', validate: (v) => !!v && v.length === 4 && Number(v) >= 2020 && Number(v) <= 2030 },
    { name: 'height', validate: heightValidator },
    { name: 'hairColor', validate: (v) => !!v && v.match(/\#[0-9a-z]{6}/) !== null },
    { name: 'eyeColor', validate: (v) => !!v && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].find((color) => color === v) !== undefined },
    { name: 'passportId', validate: (v) => !!v && v.length === 9 && v.match(/[0-9]{9}/) !== null },
    { name: 'countryId' },
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
        return passportFields.filter((field) => typeof field.validate === 'function')
            .reduce((accumulator, currentField) => {
                const valid = currentField.validate(this[currentField.name]);
                return accumulator && valid;
            }, true);
    }
}

module.exports = Passport;
