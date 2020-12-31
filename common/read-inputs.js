import { readFileSync } from 'fs';

export const readInput = fileName => readFileSync(fileName, 'utf8');
export const getArrayFromInput = (fileName) => readInput(fileName).split(/\r?\n/);
export const getNumArrayFromInput = (fileName) => getArrayFromInput(fileName).map(str => Number(str));
    

    