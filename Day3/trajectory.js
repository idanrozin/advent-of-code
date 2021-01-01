import { getStringArrayFromInput } from '../utils/read-inputs.js';
const RIGHT = 3;
const TREE = '#';
const allTrees = rows => rows.map((row, i) => i !== 0 && row[(i * RIGHT) % row.length] === TREE).filter(item => item);

const data = getStringArrayFromInput('input.txt');
const rows = data.map(row => row.split(''));

console.log('allTrees', allTrees(rows).length)
