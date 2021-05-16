/* https://adventofcode.com/2020/day/11 */

const utils = require('../utils/read-inputs.js');
const data = utils.getStringArrayFromInput('input.txt');

const EMPTY = "L";
const OCCUPIED = "#";
const FLOOR = ".";

const modelLayoutIteration = (arr) => {
    const arrSnapshot = arr.map(row => row.slice());
    let arrChanged = false;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const up = i > 0 && arrSnapshot[i - 1][j] || EMPTY;
            const right = j < arr[i].length - 1 && arrSnapshot[i][j + 1] || EMPTY;
            const down = i < arr.length - 1 && arrSnapshot[i + 1][j] || EMPTY;
            const left = j > 0 && arrSnapshot[i][j - 1] || EMPTY;
            const diagonalUpRight = i > 0 && j < arr[i].length - 1 && arrSnapshot[i - 1][j + 1] || EMPTY;
            const diagonalDownRight = j < arr[i].length - 1 && i < arr.length -1 && arrSnapshot[i + 1][j + 1] || EMPTY;
            const diagonalDownleft = i < arr.length - 1 && j > 0 && arrSnapshot[i + 1][j - 1] || EMPTY;
            const diagonalUpleft = j > 0 && i > 0 && arrSnapshot[i - 1][j - 1] || EMPTY;

            if (arrSnapshot[i][j] === FLOOR) continue;
            
            if (arrSnapshot[i][j] === EMPTY) {
                if (
                    up !== OCCUPIED && down !== OCCUPIED &&
                    right !== OCCUPIED && left !== OCCUPIED && 
                    diagonalUpRight !== OCCUPIED && diagonalDownRight !== OCCUPIED &&
                    diagonalDownleft !== OCCUPIED && diagonalUpleft !== OCCUPIED 
                ) {
                    arrChanged = true;
                    arr[i][j] = OCCUPIED;
                }
            } else {
                let occupiedCounter = 0;
                const change = [
                    up,
                    right,
                    down,
                    left,
                    diagonalUpRight,
                    diagonalDownRight,
                    diagonalDownleft,
                    diagonalUpleft
                ].some(adj => adj === OCCUPIED && ++occupiedCounter >= 4);
                
                if (change) {
                    arrChanged = true;
                    arr[i][j] = EMPTY;
                }
            }
        }
    }
    return arrChanged;
}

const modelLayout = (arr) => {
    let count = 0;
    while (modelLayoutIteration(arr)) {
        count++;
    }
    console.log('total iterations made :>> ', count);
    const totalEmptySeats = [].concat(...arr).filter(seat => seat === OCCUPIED);
    return totalEmptySeats.length;
}
const arr = data.map(row => row.split(""));
console.log('number of seats after all iterations are over', modelLayout(arr));
