const fs = require('fs');
const { Coordinates, AimCoordinates, Vector, move, moveWithAim } = require('../../../../src/exercises/advent-of-code-2021/day-2-sub-coordinates/sub-joystick');

describe('Advent of Code 2021 - Day 2', () => {
    const inputFile = './test/exercises/advent-of-code-2021/day-2-sub-coordinates/input.txt';

    it('should apply a few moves and multiply the forward magnitude and depth',  () => {
        const moves = [
            new Vector('forward', 5),
            new Vector('down', 5),
            new Vector('forward', 8),
            new Vector('up', 3),
            new Vector('down', 8),
            new Vector('forward', 2)
        ];

        var coordinates = new Coordinates(0, 0, 0);
        moves.forEach(m => {
            coordinates = move(coordinates, m);
        });

        expect(coordinates.x * coordinates.z).to.equal(150);
    });

    it('should load moves from a file, apply them, and multiply the forward magnitude and depth', async () => {
        const moves = (await fs.readFileSync(inputFile, 'utf-8').split('\n')).map((line) => {
            const lineParts = line.split(' ');
            return new Vector(lineParts[0], Number(lineParts[1]));
        });

        const start = new Date();
        var coordinates = new Coordinates(0, 0, 0);
        moves.forEach(m => {
            coordinates = move(coordinates, m);
        });

        console.log(`${coordinates.x * coordinates.z}: ${new Date() - start} ms`);
    });

    it('should apply a few AimCoordinates moves and multiply the forward magnitude and depth',  () => {
        const moves = [
            new Vector('forward', 5),
            new Vector('down', 5),
            new Vector('forward', 8),
            new Vector('up', 3),
            new Vector('down', 8),
            new Vector('forward', 2)
        ];

        var coordinates = new AimCoordinates(0, 0, 0);
        moves.forEach(m => {
            coordinates = moveWithAim(coordinates, m);
        });

        expect(coordinates.xPos * coordinates.depth).to.equal(900);
    });

    it('should load moves from a file, apply the AimCoordinates moves and multiply the forward magnitude and depth',  async () => {
        const moves = (await fs.readFileSync(inputFile, 'utf-8').split('\n')).map((line) => {
            const lineParts = line.split(' ');
            return new Vector(lineParts[0], Number(lineParts[1]));
        });

        const start = new Date();
        var coordinates = new AimCoordinates(0, 0, 0);
        moves.forEach(m => {
            coordinates = moveWithAim(coordinates, m);
        });

        console.log(`${coordinates.xPos * coordinates.depth}: ${new Date() - start} ms`);
    });

});