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
    }).map(bag => bag.substr(0, bag.indexOf(PATTERN)).trim()));
    const flattenedRelevantBags = utils.flattenArray(relevantBags);
    if (flattenedRelevantBags.length === 0 || data.length === 0) {
        return AllBags.reduce((acc, curr) => acc + curr, 0);
    } else {
        AllBags.push(flattenedRelevantBags.length);
        return findBagsRecursive(data, flattenedRelevantBags);
    }
};

const CONTAIN_TOKEN = "contain";
const HAS_NO_BAGS_STOP_CONDITION = "no other bags";
const buildBagsTreePath = (data, searchKeyword) => {
    
    const startingRule = data.find(rule => rule.startsWith(searchKeyword));
    
    if (startingRule.includes(HAS_NO_BAGS_STOP_CONDITION)) {
        return [];
    } else {
        const allContainedBags = startingRule.substr(
            startingRule.indexOf(CONTAIN_TOKEN) + CONTAIN_TOKEN.length,
            startingRule.length
        ).trim().replace('.', '').split(', ');

        const extractNumberFromStringWithRegex = str => {
            const regex = new RegExp(/\d+/, 'g');
            const result = regex.exec(str);
            return { 
                quantity: Number(result[0]),
                label: result.input.substr(result[0].length + 1)
            };
        }
   
        return allContainedBags.filter(bag => !isNaN(extractNumberFromStringWithRegex(bag).quantity)).map(bag => {
            const { label, quantity } = extractNumberFromStringWithRegex(bag);
            const children = buildBagsTreePath(data, label);
            return {
                label,
                quantity,
                children,
                bagsCapacity: 0,
            };
        });
    }
};

// traverse bags tree nodes recursively
const updateBagsCapacity = node => {
    if (node.children.length === 0) return node.quantity;
    node.children.forEach(child => node.bagsCapacity += (node.quantity * updateBagsCapacity(child)));
    return node.bagsCapacity + node.quantity;
};

const data = utils.getStringArrayFromInput('input.txt');
const allFitBags = findBagsRecursive(data, [ BAG_COLOR_TO_CONTAIN ]);
const bagsTree = buildBagsTreePath(data, BAG_COLOR_TO_CONTAIN);
const sumBags = bagsTree.reduce((acc, curr) => acc + updateBagsCapacity(curr) ,0);

console.log('Question 1 answer:', allFitBags);
console.log('Question 2 answer', sumBags)