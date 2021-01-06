const Passport = require('./passport');

const passportFields = [
    { name: 'birthYear', key: 'byr' },
    { name: 'issueYear', key: 'iyr' },
    { name: 'expirationYear', key: 'eyr' },
    { name: 'height', key: 'hgt' },
    { name: 'hairColor', key: 'hcl' },
    { name: 'eyeColor', key: 'ecl' },
    { name: 'passportId', key: 'pid' },
    { name: 'countryId', key: 'cid' },
];

/**
 *
 * @param {string} input - A string with encoded passport data, with blank lines delineating each passport.
 * @return {Passport[]}
 */
function parseBlob(input) {
    return input
        .split(/\n{2,}/g)
        .map((p) => {
            const passportInput = {};
            p.split(/\s+/g)
                .forEach((field) => {
                    const fieldKeyValue = field.split(':');
                    const passportField = passportFields.find((field) => field.key === fieldKeyValue[0]);
                    if (passportField) {
                        passportInput[passportField.name] = fieldKeyValue[1];
                    }

                });

            return new Passport(passportInput);
        });
}

module.exports = {
    parseBlob,
};
