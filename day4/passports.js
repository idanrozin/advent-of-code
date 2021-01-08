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
            passport.splice(0,passport.length);
        } else {
            passport.push(attributes.split(' '));
        }
    });
    return allPassports;
};

// filter only the passports that have 8 array members (each index is 1 attr).
// or if the passport has exactly 7 members then validate that none of the indices have a key that is called 'cid'
const validatePassportsByNumberOfAttributes = passports => passports.filter(attrs => (attrs.length === 8) || (attrs.length === 7 && attrs.every(at => !('cid' in at))));

/**
 * gets an array of passports (each passport is an array of itself) and turns on to an array of objects [ { attr: value }, { attr: value } ]
 * @param {array[]} passports 
 */
const getArrayAsObjectsArray = passports => {
    const allPassportsKeyValue = [];
    passports.forEach(pass => {
        allPassportsKeyValue.push(
            pass.map(p => {
                const [k,v] = p.split(':');
                return { [k] : v };
            })
        );
    });
    return allPassportsKeyValue;
};

/**
 * gets a passport (array of objects) and for each object gets the key. 
 * if the key then goes to the validator object and according to the key return the validator result
 * if all true. the array will remain the same size in which was at the beginning which means the passport is valid and function will return true
 * @param {object[]} passport
 */
const validatePassportsByAttributesValues = passport => {
    const originalSize = passport.length;
    const filtered = passport.filter(attribute => {
        const _key = Object.keys(attribute)[0];
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
    return filtered.length === originalSize;
};

const data = utils.getStringArrayFromInput('input.txt');
const orderedPassports = arrangePassports(data);
const passportsObjectArrays = getArrayAsObjectsArray(orderedPassports);
const justValids = validatePassportsByNumberOfAttributes(passportsObjectArrays)
console.log('Result of question #1: only valid passports with 8 attributes or 7 missing `cid`:', justValids.length);

// filter by only the true results
const allAttributesValuesValid = justValids.filter(passport => validatePassportsByAttributesValues(passport));
console.log('Result of question #2: only valid passports with all attributes values are valid by certain rules:', allAttributesValuesValid.length);