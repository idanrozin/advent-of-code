/* https://adventofcode.com/2020/day/6 */
const utils = require('../utils/read-inputs.js');

const findAnswersRemoveDups = answers => {
    const allAnswers = [];
    const group = [];
    answers.forEach(line => {
        // if line is '' meaning we are done with the group
        if (line === '') {
            // get the entire group array and do the following:
            // join all array elements to one string
            // split the string to a single array of characters
            // apply set to char array to remove duplicate entries
            // convert set back to array
            // convert array back to string
            allAnswers.push([...new Set(group.join("").split(""))].join(""));

            // after pushing to the cumulative array, empty sub array for next iteration.
            group.length = 0;
        } else {
            group.push(line);
        }
    })
    return allAnswers;
}

const findCommonAnswers = data => {
const commonLettersCount = [];
const group = [];
    data.forEach(str => {
        if (str !== '') {
            group.push(str.split(""));
        } else {
            if (group.length === 1) {
                commonLettersCount.push(group[0]);
            } else {
                group.sort((a, b) => a.length - b.length);
                const smallestArray = group.splice(0,1)[0];
                commonLettersCount.push(smallestArray.filter(num => group.every(arr => arr.includes(num))));
            }
            group.length = 0;
        }
    });
    return commonLettersCount;
}

const data = utils.getStringArrayFromInput('input.txt');
const sumResults = (acc, curr) => acc + curr.length;
[ findAnswersRemoveDups, findCommonAnswers ].forEach((func, i) => {
    const sum = func(data).reduce(sumResults, 0);
    console.log(`Question ${i + 1} answer:`, sum);
});