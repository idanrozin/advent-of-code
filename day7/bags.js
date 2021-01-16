/* https://adventofcode.com/2020/day/7 */
const utils = require('../utils/read-inputs.js');

const BAG_COLOR_TO_CONTAIN = 'shiny gold bag';
const PATTERN = "bags";
const AllBags = [];
const findBagsRecursive = (data, searchBags) => {
    const relevantBags = searchBags.map(currentBag => data.filter((rule, i) => {
        const canContain = rule.includes(currentBag) && !rule.startsWith(currentBag);
        if (canContain) {
            data.splice(i,1);
        }
        return canContain;
    }).map(bag => bag.substr(0, bag.indexOf(PATTERN)).trim())
);
    const flattenedRelevantBags = utils.flattenArray(relevantBags);
    if (flattenedRelevantBags.length === 0 || data.length === 0) {
        return AllBags.reduce((acc,curr) => acc + curr, 0 )
    } else {
        AllBags.push(flattenedRelevantBags.length);
        return findBagsRecursive(data, flattenedRelevantBags);
    }
};

const data = utils.getStringArrayFromInput('input.txt');
const allFitBags = findBagsRecursive(data, [ BAG_COLOR_TO_CONTAIN ]);
console.log('Question 1 answer:', allFitBags);