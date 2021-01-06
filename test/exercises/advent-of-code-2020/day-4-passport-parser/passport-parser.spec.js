const fs = require('fs');
const passportParser = require('../../../../src/exercises/advent-of-code-2020/day-4-passport-parser/passport-parser');

describe('passport parser', () => {
   it('should parse and validate a handful of text lines describing passports', () => {
      const text = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n' +
          'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
          '\n' +
          'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884\n' +
          'hcl:#cfa07d byr:1929\n' +
          '\n' +
          'hcl:#ae17e1 iyr:2013\n' +
          'eyr:2024\n' +
          'ecl:brn pid:760753108 byr:1931\n' +
          'hgt:179cm';
       const passports = passportParser.parseBlob(text);
       expect(passports[0].validate()).to.equal(true);
       expect(passports[1].validate()).to.equal(false);
       expect(passports[2].validate()).to.equal(true);
   });

   it('should validate eye color', () => {
       // a valid passport, along with copies with variations on eye color
       const text = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n' +
           'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
           '\n' +
           'ecl:abc pid:860033327 eyr:2020 hcl:#fffffd\n' +
           'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
           '\n' +
           'pid:860033327 eyr:2020 hcl:#fffffd\n' +
           'byr:1937 iyr:2017 cid:147 hgt:183cm\n';
       const passports = passportParser.parseBlob(text);
       expect(passports[0].validate()).to.equal(true);
       expect(passports[1].validate()).to.equal(false);
       expect(passports[2].validate()).to.equal(false);
   });

    it('should validate passport id', () => {
        // a valid passport, along with copies with variations on pasport id
        const text = 'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd\n' +
            'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
            '\n' +
            'ecl:gry pid:8600333278 eyr:2020 hcl:#fffffd\n' +
            'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
            '\n' +
            'ecl:gry pid:86003332 eyr:2020 hcl:#fffffd\n' +
            'byr:1937 iyr:2017 cid:147 hgt:183cm\n' +
            '\n' +
            'ecl:gry pid:86003332a eyr:2020 hcl:#fffffd\n' +
            'byr:1937 iyr:2017 cid:147 hgt:183cm\n';
        const passports = passportParser.parseBlob(text);
        expect(passports[0].validate()).to.equal(true);
        expect(passports[1].validate()).to.equal(false);
        expect(passports[2].validate()).to.equal(false);
        expect(passports[3].validate()).to.equal(false);
    });

   it('should parse and validate the input file describing passports and count the valid ones', async () => {
       const inputFile = './test/exercises/advent-of-code-2020/day-4-passport-parser/input.txt';
       const text = await fs.readFileSync(inputFile, 'utf-8');
       const passports = passportParser.parseBlob(text);
       const validPassports = passports.filter((passport) => passport.validate());
       console.log(`${validPassports.length} / ${passports.length} are valid`);
   });
});
