/* https://adventofcode.com/2020/day/7 */
const utils = require('../utils/read-inputs.js');

const GAME_INSTRUCTIONS = {
    JUMP_LINE: 'jmp',
    ACCUMULATE: 'acc',
    NO_OP: 'nop'
};

const findInfiniteLoop = gameCodeInstructions => {
    const getNumberFromInstructions = instr => Number(instr.split(" ")[1]);
    let gameAccumulator = 0;
    const visitedLines = [];
    for (let lineNum = 0; lineNum < gameCodeInstructions.length; lineNum) {
        if (visitedLines.includes(lineNum)) break;
        visitedLines.push(lineNum);
        const line = gameCodeInstructions[lineNum];
        const numRepersentation = getNumberFromInstructions(line);
        lineNum += line.startsWith(GAME_INSTRUCTIONS.JUMP_LINE) ? numRepersentation : 1;
        gameAccumulator += line.startsWith(GAME_INSTRUCTIONS.ACCUMULATE) ? numRepersentation : 0;
    }
    return gameAccumulator;
};
const data = utils.getStringArrayFromInput('input.txt');
const accValue = findInfiniteLoop(data);
console.log('accValue', accValue);