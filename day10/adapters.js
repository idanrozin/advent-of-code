/* https://adventofcode.com/2020/day/10 */
const utils = require('../utils/read-inputs.js');

const calcJoltDiffrences = adapters => {
    const diffs = new Map();
    // initialize map
    [1, 2, 3].forEach(n => diffs.set(n, 0));

    // pad with 0, as no such things 0 jolts adapter.
    // but we need to add it to the calculation in order to get the difference from 0 to first in chain
    adapters.unshift(0);
    //pad with last max item + 3
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1 ] + 3);

    for (let i = 0; i < adapters.length - 1; i++) {
        const difference = adapters[i + 1] - adapters[i];
        if (diffs.has(difference)) {
            diffs.set(difference, diffs.get(difference) + 1);
        }
    }
    return diffs.get(1) * diffs.get(3);
}



const data = utils.getNumArrayFromInput('input.txt');
console.log('question 1 Answer:', calcJoltDiffrences(data));
