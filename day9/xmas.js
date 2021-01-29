/* https://adventofcode.com/2020/day/9 */
const utils = require('../utils/read-inputs.js');
const PREAMBLE = 25;

const findDefectedNumberInStream = numbers => {
    const { length } = numbers;
    let target;
    for (let i = length - 1 ; i > 0; i--) {
        target = numbers[i];
        const subNumbersArr = numbers.slice(i - PREAMBLE, i);
        const hasNumber = subNumbersArr.some(num => 
            subNumbersArr.findIndex(complementry => complementry === (target - num) && complementry !== num) !== -1);

        if (!hasNumber) break; 
    }
    return target;
};

const data = utils.getNumArrayFromInput('input.txt');
console.log('Question 1 Answer:', findDefectedNumberInStream(data));