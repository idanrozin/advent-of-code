/* https://adventofcode.com/2020/day/7 */
const utils = require('../utils/read-inputs.js');

const BAG_COLOR_TO_CONTAIN = 'shiny gold bag';
const PATTERN = "bags";
const AllBags = [];
const CONTAIN_TOKEN = "contain";
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

const getAllBagsInsideBag = (data, search) => {
    const startingRule = data.find(rule => rule.startsWith(search));
    // console.log("$$$ ~ file: bags.js ~ line 27 ~ startingRule", startingRule);
    const allContainedBags = startingRule.substr(startingRule.indexOf(CONTAIN_TOKEN) + CONTAIN_TOKEN.length, startingRule.length).trim().split(', ');
    allContainedBags.forEach(bag => {
        let quantity = Number(bag.substr(0,bag.indexOf(" ")));
        bag = bag.substr(bag.indexOf(" ") + 1);
        if (isNaN(quantity)) {
            return;
        }

        console.log("quantity: ", quantity);
        console.log("bag:", bag);

    });
    
}

const data = utils.getStringArrayFromInput('input.txt');
// const allFitBags = findBagsRecursive(data, [ BAG_COLOR_TO_CONTAIN ]);
// console.log('Question 1 answer:', allFitBags);

// const bagsInsideBag = getAllBagsInsideBag(data, BAG_COLOR_TO_CONTAIN);
getAllBagsInsideBag(data, BAG_COLOR_TO_CONTAIN);