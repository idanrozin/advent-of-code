const fs = require('fs');

const _readInput = fileName => fs.readFileSync(fileName, 'utf8');
const getStringArrayFromInput = (fileName) => _readInput(fileName).split(/\r?\n/);
const getNumArrayFromInput = (fileName) => getStringArrayFromInput(fileName).map(str => Number(str));

module.exports.getStringArrayFromInput = getStringArrayFromInput;
module.exports.getNumArrayFromInput = getNumArrayFromInput;
    

    