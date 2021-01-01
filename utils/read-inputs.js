import { readFileSync } from 'fs';

export const readInput = fileName => readFileSync(fileName, 'utf8');
export const getStringArrayFromInput = (fileName) => readInput(fileName).split(/\r?\n/);
export const getNumArrayFromInput = (fileName) => getStringArrayFromInput(fileName).map(str => Number(str));
    

    