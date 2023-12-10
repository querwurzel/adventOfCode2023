import {inputSteps, inputMap} from "./input.mjs";

export const testInputSteps = "LLR";
export const testInputMap = `
AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

export function parseMap(map) {
    const paths = map.split("\n").filter(val => !!val);
    const outputMap = new Map();

    for (let path of paths) {
        let from = path.substring(0, 3);
        let left = path.substring(7, 10);
        let right = path.substring(12, 15);

        outputMap.set(from, {L: left, R: right})
    }

    console.dir(outputMap)

    return outputMap;
}

function solve(steps, map) {
    const nodes = parseMap(map);
    let currentNode = "AAA";
    let totalSteps = 0;

    for (let repeat = 1; repeat <= 100; repeat++) {
        for (let idx = 0; idx < steps.length; idx++) {
            let fork = nodes.get(currentNode);
            let direction = steps[idx];

            totalSteps++;
            currentNode = fork[direction];

            if (currentNode === "ZZZ") {
                console.log("Took total steps to get to ZZZ:", totalSteps)
                return;
            }
        }
        console.warn("Repeating sequence, run completed:", repeat)
    }

    console.error("Path not found to ZZZ")
}

solve(inputSteps, inputMap)
