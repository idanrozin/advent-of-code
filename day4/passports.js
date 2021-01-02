import { getStringArrayFromInput } from '../utils/read-inputs.js';

const getValidPassports = data => {
    const allPassports = [];
    let passport = [];
    data.forEach(attributes => {
        if (attributes === '') {
            allPassports.push(passport.flat().map(str => str.substr(0, str.indexOf(':'))));
            passport = [];
        } else {
            passport.push(attributes.split(' '));
        }
    });
    return allPassports.filter(passport => passport.length === 8 || (passport.length === 7 && !passport.includes('cid')));
};
const data = getStringArrayFromInput('input.txt');
console.log('onlyValids.length', getValidPassports(data).length);