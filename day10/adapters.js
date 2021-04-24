/* https://adventofcode.com/2020/day/10 */

const utils = require('../utils/read-inputs.js');

const arrangeJoltsArray = adapters => {
    // pad with 0, as no such things 0 jolts adapter.
    // but we need to add it to the calculation in order to get the difference from 0 to first in chain
    adapters.unshift(0);
    //pad with last max item + 3
    adapters.sort((a, b) => a - b);
    adapters.push(adapters[adapters.length - 1 ] + 3);
    return adapters;
};

const calcJoltDiffrences = adapters => {
    const diffs = new Map();
    // initialize map
    [1, 2, 3].forEach(n => diffs.set(n, 0));

    for (let i = 0; i < adapters.length - 1; i++) {
        const difference = adapters[i + 1] - adapters[i];
        if (diffs.has(difference)) {
            diffs.set(difference, diffs.get(difference) + 1);
        }
    }
    return diffs.get(1) * diffs.get(3);
};

const findSequence = (arr) => {
    const maxSeq =[];
    if (arr.length < 2) {
        return maxSeq;
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1] - arr[i] > 1) {
            return maxSeq;
        } else {
            maxSeq.push(arr[i + 1])
        }
        
    }
};

const getPairs = (arr) => {
    const pairs = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            const nextElement = [arr[j]];
            const subPair = [[arr[i] , arr[j]]];
            if (j === arr.length - 1 && !hasSubArray(pairs, nextElement)) {
                pairs.push(nextElement);
            }

            if (!hasSubArray(pairs, subPair)) {
                pairs.push(subPair[0]);
            }
        }
    }
    return pairs;
};

const getAllCombinations = adapters => {
    const pairsArr = [];

    // dupsArray get all sub array of pairs in order to reduce duplicated pairs
    const dupsArray = [];
    for (let i = 0; i < adapters.length; i++) {
        // find all array sequences (a sequnce considered as diff of 1 between each consecutive numbers)
        const sequence = findSequence(adapters.slice(i,adapters.length))
        if (sequence.length <= 1) {
            continue;
        } else {
            // get pairs - produce all combinations of each 2 numbers (a pair) in the sequnce
            // (including the biggest number in the sequence as a single number)
            const pairs = getPairs(sequence);
            if (!hasSubArray(dupsArray,...pairs)) {
                dupsArray.push(...pairs);
                pairsArr.push(pairs);
            }
        }
    }

    let product = 1;
    pairsArr.forEach(p => product *= p.length);
    return product;
};

const hasSubArray = (master, sub) => master.some(a => sub.every((v, i) => v === a[i]));


const data = utils.getNumArrayFromInput('input.txt');
let joltsArray = arrangeJoltsArray(data);
console.log('question 1 Answer:', calcJoltDiffrences(joltsArray));
console.log('question 2 Answer:', getAllCombinations(joltsArray));