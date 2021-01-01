import { getArrayFromInput } from '../utils/read-inputs.js';

const sanitizePasswords = passwordsArray => passwordsArray.map(password => {
    if (!password) return;
    
    // first, remove `:` char
    password = password.replace(':', '');
    
    // split the string to array by white space
    const passArr = password.split(' ');
    // arr[0] is first string A - B. remove `-` and convert to array with both numbers
    const occurences = passArr[0].split('-').map(it => Number(it));
    // arr[1] is the letter
    const letter = passArr[1];
    // arr[2] is the password
    const passPhrase = passArr[2];
    return {
        min: occurences[0],
        max: occurences[1],
        letter,
        passPhrase
     };
});


const getValidPasswords1 = passArray => passArray.filter(({ min, max, letter, passPhrase }) => {
           
    // convert string to regex
    const regex = new RegExp(letter, 'g');
    const instances = passPhrase.match(regex) || [];

    /* console.log('-----------------------------------------');
    console.log('password:', passPhrase);
    console.log(`how many: ${occurences[0]} - ${occurences[1]}`);
    console.log('letter:', letter);
    console.log('occurences:', instances.length);
    console.log('isValid:', instances.length >= occurences[0] && instances.length <= occurences[1]);
    console.log('-----------------------------------------'); */

    return instances.length >= min && instances.length <= max;
});

const getValidPasswords2 = passArray => passArray.filter(({ min, max, letter, passPhrase }) => 
    (passPhrase.includes(letter)) && 
    (
        (passPhrase.charAt(min - 1) === letter && passPhrase.charAt(max - 1) !== letter) || (passPhrase.charAt(min - 1) !== letter && passPhrase.charAt(max - 1) === letter)
    )
);

const passwords = getArrayFromInput('input.txt').filter(p => p);
const policyFormmatedArray = sanitizePasswords(passwords);
console.log('only Valids for first policy', getValidPasswords1(policyFormmatedArray).length);
console.log('only Valids for second policy', getValidPasswords2(policyFormmatedArray).length);


