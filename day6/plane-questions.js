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

            // after pushing to the cumulative array empty sub array for next iteration.
            group.splice(0, group.length);
        } else {
            group.push(line);
        }
    })
    return allAnswers;
}
const data = utils.getStringArrayFromInput('input.txt');
const all = findAnswersRemoveDups(data);
let sum = 0;
all.forEach(an => {
    sum += an.length;
});
console.log('Question 1 answer. Sum of all groups answers without duplicates: ', sum);