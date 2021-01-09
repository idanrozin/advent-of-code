const utils = require('../utils/read-inputs.js');

const LOWEST_ROW_VALUE = 0;
const HIGHEST_ROW_VALUE = 128;
const LOWEST_COL_VALUE = 0;
const HIGHEST_COL_VALUE = 8;
const decryptSeat = (str, low, high, lowerHalfLetter) => {
    str.split("").forEach(letter => {
        let middle = Math.round((low + high) / 2);
        letter === lowerHalfLetter ? high = middle : low = middle;
    });
    return Math.floor((low + high) / 2);
}

const seats = utils.getStringArrayFromInput('input.txt');
const allPlaneTkts = [];
seats.forEach(seat => {
    const row = decryptSeat(seat.slice(0,7), LOWEST_ROW_VALUE, HIGHEST_ROW_VALUE, 'F');
    const col = decryptSeat(seat.slice(7), LOWEST_COL_VALUE, HIGHEST_COL_VALUE, 'L');
    allPlaneTkts.push((row * 8 ) + col);
})
console.log(Math.max(...allPlaneTkts));