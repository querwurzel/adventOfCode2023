import {input} from "./input.mjs";

export const testInput = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

function parse(input) {
    const parts = input.split("\n\n").filter(line => !!line);
    const puzzles = []

    for (let part of parts) {
        let rows = part.split("\n").filter(line => !!line);
        let columns = []

        for (let col = 0; col < rows[0].length; col++) {
            let column = "";
            for (let row of rows) {
                column += row[col];
            }

            columns.push(column)
        }

        puzzles.push({
            rows,
            columns
        })
    }

    //console.dir(puzzles)
    return puzzles;
}

function findMirror(grid) {
    for (let r = 1; r < grid.length; r++) {
        let above = grid
            .filter((line, idx) => idx < r)
            .reverse()
        let below = grid
            .filter((line, idx) => idx >= r)

        const sameSize = Math.min(above.length, below.length)
        above = above.slice(0, sameSize)
        below = below.slice(0, sameSize)

        let diffs = 0;
        for (let i = 0; i < above.length; i++) {
            const aboveLine = above[i];
            const belowLine = below[i];

            for (let j = 0; j < aboveLine.length; j++) {
                if (aboveLine[j] !== belowLine[j]) {
                    diffs++;
                }
            }

            if (diffs > 1) { // fail fast
                return 0;
            }
        }

        if (diffs === 1) {
            return r
        }
    }

    return 0; // fits well when calculating the total sum
}

function solve(input) {
    const puzzles = parse(input)
    let total = 0;

    for (let puzzle of puzzles) {

        let row = findMirror(puzzle.rows);
        let col = findMirror(puzzle.columns);

        total += row * 100 + col
    }

    console.log("total", total)
}

let startTime = new Date();
solve(input)
let endTime = new Date();
console.log("Took ms:", endTime - startTime)
