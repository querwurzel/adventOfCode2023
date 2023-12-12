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

function check(pattern, groupSizes) {
    /*
    if (pattern.includes("?")) {
        throw new Error("pattern must not contain '?':" + pattern)
    }*/

    let patternGroups = pattern.split(".").filter(val => !!val)
    if (patternGroups.length !== groupSizes.length) {
        return false;
    }

    for (let i = 0; i < groupSizes.length; i++) {
        if (patternGroups[i].length !== groupSizes[i]) {
            return false
        }
    }

    return true;
}

function solve(input) {
    const rows = parse(input)
    const symbols = [".", "#"]
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
            .filter(group => !markGroupCandidates.has(group.length))
            .forEach(group => {
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

        let solutions = [row.pattern];
        let sortedGroups = markGroups
            .toSorted((a, b) => b.length - a.length) // descending

        for (let group of sortedGroups) {
            let appliedSolutions = []
            let groupSolutions = markGroupCandidates.get(group.length);

            for (let solution of solutions) {
                for (let groupSolution of groupSolutions) {
                    appliedSolutions.push(solution.replaceAt(group.start, groupSolution))
                }
            }

            solutions = appliedSolutions
        }

        let validSolutions = solutions.filter(solution => check(solution, row.groupSizes));

        //console.log(validSolutions)

        //console.log(row.pattern + " allows for valid combinations", validSolutions.length)
        total += validSolutions.length
    }

    console.log("total", total)
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

solve(input)
