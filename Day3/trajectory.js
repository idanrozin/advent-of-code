const utils = require('../utils/read-inputs.js');
const TRAVERSE_DIRECTIONS = [ [ 1,1 ],[ 3,1 ],[ 5,1 ],[ 7,1 ],[ 1,2 ] ];

const TREE = '#';
const getTreesOnSlopeByDirection = (rows, right, down) => rows.map((row, i) => 
    i !== 0 && 
    i % down == 0 && 
    row[((i / down) * right) % row.length] === TREE).filter(item => item);

const data = utils.getStringArrayFromInput('input.txt');
const rows = data.map(row => row.split(''));

console.log('First Question:', getTreesOnSlopeByDirection(rows, TRAVERSE_DIRECTIONS[1][0], TRAVERSE_DIRECTIONS[1][1]).length);

let product = 1 ;
TRAVERSE_DIRECTIONS.forEach(direction => product *= getTreesOnSlopeByDirection(rows, direction[0], direction[1]).length);
console.log('Second Question:', product)