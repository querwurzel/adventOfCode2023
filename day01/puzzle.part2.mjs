import {input} from './input.mjs';

const testInput = [
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen"
]

const alphabet = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
};

const digits = [
    '1','2','3','4','5','6','7','8','9',
    'one','two','three','four','five','six','seven','eight','nine'
];


function findFirstDigit(str) {
    let earliestDigit = str.length;
    let literal = null;

    for (const digit of digits) {
        let match = str.indexOf(digit);
        if (match === -1) {
            continue;
        }

        if (match < earliestDigit) {
            earliestDigit = match;
            literal = str.substring(match, match + digit.length);
        }
    }

    return literal;
}

function findLastDigit(str) {
    let lastDigit = -1;
    let literal = null;

    for (const digit of digits) {
        let match = str.lastIndexOf(digit);
        if (match === -1) {
            continue;
        }

        if (match > lastDigit) {
            lastDigit = match;
            literal = str.substring(match, match + digit.length);
        }
    }

    return literal;
}

let numbers = [];
let total = 0;

for (let element of input) {
    let firstDigit = findFirstDigit(element);
    let lastDigit = findLastDigit(element);

    let number = alphabet[firstDigit] + '' + alphabet[lastDigit];
    numbers.push(parseInt(number));
}

total = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
);

console.log("total", total);
