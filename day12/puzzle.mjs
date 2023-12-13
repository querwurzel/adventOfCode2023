import {input} from "./input.mjs";

export const solvedTestInput = `
#.#.### 1,1,3
.#...#....###. 1,1,3
.#.###.#.###### 1,3,1,6
####.#...#... 4,1,1
#....######..#####. 1,6,5
.###.##....# 3,2,1`;

export const testInput = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

function parse(input) {
    let lines = input.split("\n").filter(line => !!line);
    let records = []

    for (let line of lines) {
        let split = line.split(" ")
        records.push({
            pattern: split[0],
            groupSizes: split[1].split(",").map(Number)
        })
    }

    console.dir(records)

    return records;
}

function check(pattern, groupSizes, strict = true) {
    /*
    if (pattern.includes("?")) {
        throw new Error("pattern must not contain '?':" + pattern)
    }*/

    let patternGroups = pattern.split(".").filter(val => !!val)

    if (strict) {
        if (patternGroups.length !== groupSizes.length) {
            return false;
        }

        for (let i = 0; i < groupSizes.length; i++) {
            if (patternGroups[i].length !== groupSizes[i]) {
                return false
            }
        }
    } else {
        // as far as we can
        //console.dir(patternGroups)
        for (let i = 0; i < patternGroups.length; i++) {
            let group = patternGroups[i];

            if (group.includes("?")) {
                break; // prevent prejudgement
            }

            if (patternGroups[i].length !== groupSizes[i]) {
                return false
            }
        }
    }

    return true;
}

function solve(input) {
    const rows = parse(input)
    const symbols = ["#", "."]
    const markGroupCandidates = new Map([[1, symbols]]);

    let total = 0;

    for (let row of rows) {
        let markGroups = []

        let start = 0;
        while ((start = row.pattern.indexOf("?", start)) !== -1) {
            let end = start + 1;
            while (row.pattern[end] === "?") {
                end++;
            }

            markGroups.push({
                start,
                length: end - start
            })
            start = end + 1;
        }

        markGroups
            .forEach(group => {
                if (markGroupCandidates.has(group.length)) {
                    return;
                }

                //console.log("Precalculating candidates for group size", group.length)
                const maxCombinations = Math.pow(symbols.length, group.length)
                const maxDigits = (maxCombinations - 1 >>> 0).toString(2).length // because 0 is a digit too
                //console.log(group + " allows for max combinations:", maxCombinations, maxDigits)

                let formats = [];
                for (let i = 0; i < maxCombinations; i++) {
                    let format = (i >>> 0)
                        .toString(2)
                        .padStart(maxDigits, "0")
                        .replaceAll("0", ".")
                        .replaceAll("1", "#");

                    formats.push(format)
                }

                markGroupCandidates.set(group.length, formats)
            })

        //console.dir(markGroupCandidates)

        let candidates = [row.pattern];

        for (let group of markGroups) {
            const appliedSolutions = []
            const groupSolutions = markGroupCandidates.get(group.length);
            const numSolutions = candidates.length;

            for (let i = 0; i < numSolutions; i++) {
                let solution = candidates.pop();

                for (let groupSolution of groupSolutions) {
                    let candidate = solution.replaceAt(group.start, groupSolution);

                    if (check(candidate, row.groupSizes, false)) { // cumulative check
                        appliedSolutions.push(solution.replaceAt(group.start, groupSolution))
                    } else {

    //console.warn("candidate invalid already: ", candidate, row.groupSizes)
                    }
                }
            }

            candidates = appliedSolutions
        }

        //console.dir(candidates)
        let validSolutions = candidates.filter(candidate => check(candidate, row.groupSizes));

        //console.log(row.pattern + " allows for valid combinations", validSolutions.length)
        //console.log(validSolutions)
        total += validSolutions.length
    }

    console.log("total", total)
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

let startTime = new Date();
solve(testInput)
let endTime = new Date();
console.log("Took ms:", endTime - startTime)
