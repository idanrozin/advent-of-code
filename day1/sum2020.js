/* https://adventofcode.com/2020/day/1 */
const utils = require('../utils/read-inputs.js');

const TARGET = 2020;
const sum2To2020 = (numbers, targetNumber = TARGET) => {
	let currentNumber;
	let matching = null;
	numbers.sort((a,b) => a - b);
	for (let i = 0; i < numbers.length; i++) {
		if (i < numbers.length - 1 && numbers[i] +numbers[i + 1] > targetNumber) break;
		currentNumber = numbers[i];
		const reducedNumbers = numbers.slice(i);
  
		matching = reducedNumbers.find(num => targetNumber - num === currentNumber);
		if (matching) {
	 	 	break;
	  	}  
	}
	if (matching && currentNumber) {
		// console.log("$$$ matching", matching);
		// console.log("$$$ currentNumber", currentNumber);
		return matching * currentNumber;
	}
};


const sum3To2020 = numbers => {
	let product;
	 numbers.forEach((element, i) => {
		const result = sum2To2020(numbers.slice(i), TARGET - element);
		if (result) {
            // console.log("$$$ currentNumber", element);
            // console.log("$$$ currentNumber", result);
			product = result * element;
			return;
		}
	});
	return product;
};

const numbers = utils.getNumArrayFromInput('input.txt');

console.log("result", sum2To2020(numbers));
console.log("result", sum3To2020(numbers));