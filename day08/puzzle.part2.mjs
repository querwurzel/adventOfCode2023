import {inputSteps, inputMap} from "./input.mjs";
import {parseMap} from "./puzzle.mjs";

export const testInputSteps = "LR";
export const testInputMap = `
11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

function traverse(steps, nodes, currentNodes) {
    let nextNodes = currentNodes;
    let totalSteps = 0;
    let stepsToZ = [];

    for (let repeat = 1; repeat <= 100; repeat++) {
        for (let idx = 0; idx < steps.length; idx++) {
            nextNodes = nextNodes
                .map(node => nodes.get(node))
                .map(fork => fork[steps[idx]])

            totalSteps++;
            let zCheck = nextNodes.filter(node => node.endsWith("Z")).length >= 1;
            if (zCheck) {
                stepsToZ.push(totalSteps);
                console.log("Steps so far:", totalSteps)
                console.dir(nextNodes)

                if (stepsToZ.length === nextNodes.length) {
                    console.log("Visit for LCM:", "https://www.wolframalpha.com/input?i=lcm%28" + stepsToZ.join("%2C+") + "%29")
                    return; // 12 927 600 769 609
                }
            }
        }

        //console.warn("Repeating sequence, currently at:", repeat)
    }

    console.error("Path not found to Zs, taken steps so far:", totalSteps)
}

function solve(steps, map) {
    const nodes = parseMap(map);
    const startingNodes = []

    for (let [key] of nodes) {
        if (key.endsWith("A")) {
            startingNodes.push(key)
        }
    }

    traverse(steps, nodes, startingNodes)
}

let startTime = new Date();
solve(inputSteps, inputMap)
let endTime = new Date();
console.log("Took ms:", endTime - startTime)
