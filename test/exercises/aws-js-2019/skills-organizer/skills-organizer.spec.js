const { organizeSkills } = require('../../../../src/exercises/aws-js-2019/skills-organizer');

describe('AWS JS coding challenge 2019: skills organizer', () => {
    it('should organize the skills of a set of skilled peoples', () => {
        const skilledPeople = [
            {
                id: 0,
                name: "John",
                skills: ["javascript", "html", "css", "c#"]
            },
            {
                id: 1,
                name: "Brian",
                skills: ["javascript", "java", "c", "c#", "c++", "html"]
            },
            {
                id: 2,
                name: "Michael",
                skills: ["c", "c++", "go", "rust"]
            }
        ];

        const expectedOrganizedSkills = {
            "c": ["Brian", "Michael"],
            "c#": ["John", "Brian"],
            "c++": ["Brian", "Michael"],
            "css": ["John"],
            "go": ["Michael"],
            "html": ["John", "Brian"],
            "java": ["Brian"],
            "javascript": ["John", "Brian"],
            "rust": ["Michael"]
        };

        expect(organizeSkills(skilledPeople)).to.deep.equal(expectedOrganizedSkills);
    });
});
