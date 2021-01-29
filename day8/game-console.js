/* https://adventofcode.com/2020/day/8 */
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
    let reachedLastStep = true;
    for (let lineNum = 0; lineNum < gameCodeInstructions.length; lineNum) {
        if (visitedLines.includes(lineNum)) {
            reachedLastStep = false;
            break;
        }
        visitedLines.push(lineNum);
        const line = gameCodeInstructions[lineNum];
        const numRepersentation = getNumberFromInstructions(line);
        lineNum += line.startsWith(GAME_INSTRUCTIONS.JUMP_LINE) ? numRepersentation : 1;
        gameAccumulator += line.startsWith(GAME_INSTRUCTIONS.ACCUMULATE) ? numRepersentation : 0;
    }
    
    return {
        reachedLastStep,
        accumulatorValue: gameAccumulator,
    };
};

const fixInfiniteLoop = gameCodeInstructions => {
    let _accumulatorValue = 0;
    for (let index = 0; index < gameCodeInstructions.length; index++) {
        const line = gameCodeInstructions[index];
        if (line.startsWith(GAME_INSTRUCTIONS.ACCUMULATE)) continue; 
        
        gameCodeInstructions[index] = line.startsWith(GAME_INSTRUCTIONS.NO_OP) ? 
        line.replace(GAME_INSTRUCTIONS.NO_OP, GAME_INSTRUCTIONS.JUMP_LINE) 
        :
        line.replace(GAME_INSTRUCTIONS.JUMP_LINE, GAME_INSTRUCTIONS.NO_OP);

        const { reachedLastStep, accumulatorValue } = findInfiniteLoop(gameCodeInstructions);
        if (reachedLastStep) {
            _accumulatorValue = accumulatorValue;
            break;
        } else {
            // set back the line the was before replacing
            gameCodeInstructions[index] = line;
        }
    }
    return _accumulatorValue;
};

const data = utils.getStringArrayFromInput('input.txt');
const { accumulatorValue } = findInfiniteLoop(data);
console.log('Question 1 Answer: accValue in when reaching broken line', accumulatorValue);
const accValue = fixInfiniteLoop(data);
console.log('Question 2 Answer: accValue in when reaching the end after replacing some line', accValue);