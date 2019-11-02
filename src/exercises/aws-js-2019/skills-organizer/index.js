/**
 * @typedef {object} SkilledPerson
 * @property {number} id
 * @property {string} name
 * @property {string[]} skills
 */

/**
 * @param {SkilledPerson[]} skilledPeople
 * @return {object} An object whose keys are skills and whose values is an array of people's names with those skills.
 */
function organizeSkills(skilledPeople) {
    const organizedSkills = {};
    skilledPeople.forEach((person) => {
        person.skills.forEach((skill) => {
            if (organizedSkills[skill]) {
                organizedSkills[skill].push(person.name);
            } else {
                organizedSkills[skill] = [person.name];
            }
        });
    });
    return organizedSkills;
}

module.exports = { organizeSkills };
