class Lanternish {

    constructor(daysUntilSpawn = 0) {
        this.daysUntilSpawn = Number(daysUntilSpawn);
    }

    tick() {
        this.daysUntilSpawn--;
    }

    spawn() {
        this.daysUntilSpawn = 6;

        return new Lanternish(8);
    }

}

class LanternfishFlock {

    /**
     * @constructor
     * @param lanternfishes {Lanternish[]}
     */
    constructor(lanternfishes) {
        this.lanternfishes = lanternfishes.splice(0);
    }

    /**
     * @param lanternfishesStr {string}
     */
    static parse(lanternfishesStr) {
        return new LanternfishFlock(lanternfishesStr.split(',').map(l => new Lanternish(l)));
    }

    tick() {
        let newLanternfishes = [];
        this.lanternfishes.forEach(l => {
            l.tick();
            if (l.daysUntilSpawn < 0) {
                newLanternfishes.push(l.spawn());
            }
        });

        this.lanternfishes = this.lanternfishes.concat(newLanternfishes);
    }

    count() {
        return this.lanternfishes.length;
    }

    toString() {
        return this.lanternfishes.map(l => l.daysUntilSpawn).join(',');
    }

}

module.exports = {
    LanternfishFlock
};
