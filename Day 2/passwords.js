import { getArrayFromInput } from '../common/read-inputs.js';

const getValidPasswords = passArray => passArray.filter(password => {
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

    return instances.length >= occurences[0] && instances.length <= occurences[1];
});

const passwords = getArrayFromInput('input.txt');
console.log('onlyValids', getValidPasswords(passwords).length);


