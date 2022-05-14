class LanternfishFlock {

    /**
     * @constructor
     * @param countByDaysUntilSpawn {object} - A map whose keys are the # days left until spawning and whose values are
     *                                         the number of lanternfish meeting that criteria.
     */
    constructor(countByDaysUntilSpawn) {
        this.countByDaysUntilSpawn = { ...countByDaysUntilSpawn };
    }

    /**
     * @param lanternfishesStr {string}
     */
    static parse(lanternfishesStr) {
        const countByDaysUntilSpawn = {};
        lanternfishesStr.split(',').forEach(daysUntilSpawn => {

            const k = Object.keys(countByDaysUntilSpawn).find(k => k === daysUntilSpawn.toString());
            if (k) {
                countByDaysUntilSpawn[k]++;
            } else {
                countByDaysUntilSpawn[daysUntilSpawn.toString()] = 1;
            }
        })

        return new LanternfishFlock(countByDaysUntilSpawn);
    }

    tick() {
        // define a new map of days until spawn -> fish count
        let newCountByDaysUntilSpawn = {};

        // for every index > 0, decrement the index
        for (let i = 1; i <= 8; i++) {
            if (this.countByDaysUntilSpawn[i.toString()]) {
                newCountByDaysUntilSpawn[(i - 1).toString()] = this.countByDaysUntilSpawn[i.toString()];
            }
        }

        // for index === 0, "spawn" a new set of fish at 8, and reset the timer at 6
        if (this.countByDaysUntilSpawn["0"]) {
            newCountByDaysUntilSpawn["8"] = this.countByDaysUntilSpawn["0"];
            if (newCountByDaysUntilSpawn["6"]) {
                // add to the existing bunch of fish at 6 days till spawn
                newCountByDaysUntilSpawn["6"] += this.countByDaysUntilSpawn["0"];
            } else {
                newCountByDaysUntilSpawn["6"] = this.countByDaysUntilSpawn["0"];
            }

        }

        // replace the map
        this.countByDaysUntilSpawn = { ...newCountByDaysUntilSpawn };
    }

    count() {
        return Object.values(this.countByDaysUntilSpawn).reduce((a, c) => a + c, 0);
    }

}

module.exports = {
    LanternfishFlock
};
