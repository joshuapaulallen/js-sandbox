const fs = require('fs');
const passwordPolicies = require('../../../../src/exercises/advent-of-code-2020/day-2-password-policy/password-policy');

describe('Advent of Code 2020 - Day 2', () => {
    const inputFile =  './test/exercises/advent-of-code-2020/day-2-password-policy/input.txt';

    describe('password policy letter frequency', () => {
        it('should count the passwords that meet the policy', async () => {
            const lines = await fs.readFileSync(inputFile, 'utf-8').split('\n').filter((line) => line.length > 0);
            const linesPassing = lines.filter(passwordPolicies.checkPasswordLetterFrequency);
            console.log(`${linesPassing.length} / ${lines.length} pass the password policy`);
        });

        it('should identify passwords that do meet the given policy', async () => {
            const goodPasswords = [
                '3-9 c: ccc',
                '3-9 c: ccccccccc',
                '3-9 c: cacacacacacacacac',
                '3-9 c: acacacacacacacacaca',
            ];
            goodPasswords.forEach((password) => {
                expect(passwordPolicies.checkPasswordLetterFrequency(password)).to.equal(true);
            });
        });

        it('should identify passwords that do NOT meet the given policy', async () => {
            const badPasswords = [
                '3-9 c: ccaaaaa',
                '3-9 c: aaaaacc',
                '3-9 c: aaaccaaa',
                '3-9 c: cccccccccc',
                '3-9 c: cacacacacacacacacac',
                '3-9 c: bbb',
            ];
            badPasswords.forEach((password) => {
                expect(passwordPolicies.checkPasswordPositional(password)).to.equal(false);
            });
        });
    });

    describe('password policy positional', () => {
        it('should count the passwords that meet the policy', async () => {
            const lines = await fs.readFileSync(inputFile, 'utf-8').split('\n').filter((line) => line.length > 0);
            const linesPassing = lines.filter(passwordPolicies.checkPasswordPositional);
            console.log(`${linesPassing.length} / ${lines.length} pass the password policy`);
        });

        it('should identify passwords that do meet the given policy', async () => {
            const goodPasswords = [
                '3-9 c: aacaaaaaa',
                '3-9 c: aaaaaaaac',
            ];
            goodPasswords.forEach((password) => {
                expect(passwordPolicies.checkPasswordPositional(password)).to.equal(true);
            });
        });

        it('should identify passwords that do NOT meet the given policy', async () => {
            const goodPasswords = [
                '3-9 c: aaaaaaaaa',
                '3-9 c: aacaaaaac',
                '3-9 c: aaacaaaaaa',
                '3-9 c: aaaaaaaaac',
            ];
            goodPasswords.forEach((password) => {
                expect(passwordPolicies.checkPasswordPositional(password)).to.equal(false);
            });
        });
    });
});
