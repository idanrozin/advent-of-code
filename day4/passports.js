/* https://adventofcode.com/2020/day/4 */
const utils = require('../utils/read-inputs.js');

function validateRange (num) {
    return num >= this.min && num <= this.max;
}
const VALIDATORS = {

    byr: {
        min: 1920,
        max: 2002,
        validate: validateRange
    },
    iyr: {
        min: 2010,
        max: 2020,
        validate: validateRange
    },
    eyr: {
        min: 2020,
        max: 2030,
        validate: validateRange
    },
    hgt: {
        cm: {
            min: 150,
            max: 193,
            validate: validateRange
        },
        in: {
            min: 59,
            max: 76,
            validate: validateRange
        }
    },
    hcl: {
        prefixChar: '#',
        regex: /^#[a-f0-9]{6}$/,
        validate (hcl) {
            return new RegExp(this.regex).test(hcl);
        }
    },

    ecl: {
        colors: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
        validate (color) { 
            return this.colors.includes(color); 
        }
    },
    pid: {
        regex: /^\d{9}$/,
        validate (num) {
            return new RegExp(this.regex).test(num);
        }
    },
    cid: {
        validate () { return true }
    }

};

/**
 * gets the whole data array and return an array of array in which each array is one passport
 * @param {string[]} data 
 */
const arrangePassports = data => {
    
    const allPassports = [];
    let passport = [];
    data.forEach(attributes => {
        if (attributes === '') {
            allPassports.push(utils.flattenArray(passport));
            // after pushing to allPassports array empty sub array for next iteration.
            passport.splice(0, passport.length);
        } else {
            passport.push(attributes.split(' '));
        }
    });
    return allPassports;
};

// filter only the passports that have 8 keys (attributes) 
// or if the passport has exactly 7 keys, then validate that none of the keys 'cid'
const validatePassportsByNumberOfAttributes = passports => passports.filter(attrs => 
    (Object.keys(attrs).length === 8) || 
    (Object.keys(attrs).length === 7 && Object.keys(attrs).every(key => key !== 'cid')));

/**
 * gets an array of passports (each passport is an array of itself) and turns it to a single flat array of objects [ { attr: value }, { attr: value } ] 
 * in which every object in the array is a passport
 * @param {array[]} passports 
 */
const getArrayAsObjectsArray = passports => {
    const allPassportsKeyValue = [];
    passports.forEach(pass => {
        allPassportsKeyValue.push(
            pass.reduce(
                (acc, val) => ({ ...acc, [ val.substr(0, val.indexOf(':')) ]: val.substr(val.indexOf(':') + 1, val.length) }), {})
            );
    });
    return allPassportsKeyValue;
};

/**
 * gets a passport (array of objects) and for each object gets its key. 
 * for each passport in the array, get it keys and make sure every key is passing validation. if not, every will return false to filter and filter will filter the passport out
 *
 * @param {object[]} passport
 */
const validatePassportsByAttributesValues = passport => passport.filter(attribute => 
    Object.keys(attribute).every( _key => {
        if (_key === 'hgt') {
            const val = attribute[_key];
            if (!val.includes('cm') && !val.includes('in')) return false;
            const sliceLength  = val.length - 2;
            const unit = val.slice(sliceLength);
            const heightValue = val.slice(0, sliceLength);
            return VALIDATORS[_key][unit].validate(heightValue);

        } else {
            return VALIDATORS[_key].validate(attribute[_key]);
        }
    })
);
   
const data = utils.getStringArrayFromInput('input.txt');
const orderedPassports = arrangePassports(data);

const passportsObjectArrays = getArrayAsObjectsArray(orderedPassports);
const justValids = validatePassportsByNumberOfAttributes(passportsObjectArrays)
console.log('Result of question #1: only valid passports with 8 attributes or 7 missing `cid`:', justValids.length);
const allAttributesValuesValid = validatePassportsByAttributesValues(justValids);
console.log('Result of question #2: only valid passports with all attributes values are valid by certain rules:', allAttributesValuesValid.length);