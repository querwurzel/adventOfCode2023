import {input} from './input.mjs';

const testInput = [
    "1abc2",
    "pqr3stu8vwx",
    "a1b2c3d4e5f",
    "treb7uchet",
]

const alphabet = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
};

const digits = [
    '1','2','3','4','5','6','7','8','9'
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

export function solve(input) {
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
}

solve(input);
