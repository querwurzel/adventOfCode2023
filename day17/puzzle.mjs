import {input} from "./input.mjs";

export const testInput = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

function parse(input) {
    const steps = input.split(",");

    //console.dir(steps)
    return steps;
}

function hash(string) {
    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        const code = string.charCodeAt(i);

        hash = ((hash + code) * 17) % 256;
    }

    return hash
}

function solve(input) {
    const steps = parse(input)

    let total = 0;

    for (let step of steps) {
        total += hash(step)
    }

    console.log("total", total)

    return total;
}

console.assert(hash("HASH") === 52)
console.assert(solve(testInput) === 1320)

let startTime = new Date();
solve(input)
let endTime = new Date();
console.log("Took ms:", endTime - startTime)
