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

const findConsequtiveSum = (data, faultNum) => {
    let iterations = 0;
    let sum = 0;
    let sumNumbers = []; 
    for (let i = iterations; i < data.length; i++) {
        while (sum < faultNum) {
            sum += data[i];
            i++;
        }

        if (sum === faultNum) {
            sumNumbers = data.slice(iterations, i);
            break;
        } 

        sum -= data[iterations];
        i--;
        iterations++;
    }
    return Math.min(...sumNumbers) + Math.max(...sumNumbers);
}
const data = utils.getNumArrayFromInput('input.txt');
const defectedNum = findDefectedNumberInStream(data);
console.log('Question 1 Answer:', defectedNum);
console.log('Question 2 Answer:', findConsequtiveSum(data, defectedNum));