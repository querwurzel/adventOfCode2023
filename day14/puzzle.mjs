import {input} from "./input.mjs";

export const testInput = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

function parse(input) {
    const lines = input.split("\n").filter(line => !!line);
    const grid = []

    for (let line of lines) {
        let x = []
        for (let i = 0; i < line.length; i++) {
            x.push(line[i])
        }
        grid.push(x)
    }

    //console.dir(grid);
    return grid;
}

/**
 * Sorting 'O' as close as possible to the next '#'
 */
function tilt(grid) {
    for (let y = 0; y < grid.length; y++) {
        let line = grid[y];

        for (let x = 0; x < line.length; x++) {
            if (line[x] === '#') {
                continue;
            }

            let nextSquare = line.indexOf('#', x + 1)
            nextSquare = (nextSquare === -1)
                ? line.length
                : nextSquare

            const sub = sort(line.slice(x, nextSquare));

            line.splice(x, sub.length, ...sub)
            x = nextSquare;
        }
    }

    return grid;
}

function weight(symbol) {
    return symbol === '.' ? -1 : 1;
    /*
    switch (symbol) {
        case '.':
            return -1
        case 'O':
            return 1;
        default:
            return 0;
    }*/
}

function sort(line) {
    return line.sort((a, b) => weight(a) - weight(b))
}

function rotateRight(grid) {
    return grid[0].map((val, index) => grid.map(row => row[index]).reverse())
}

function solve(input) {
    let total = 0;
    let grid = parse(input)
    grid = rotateRight(grid)
    grid = tilt(grid)

    for (let line of grid) {
        for (let x = 0; x < line.length; x++) {
            if (line[x] === 'O') {
                total += x + 1
            }
        }
        console.log(line.join(""))
    }

    console.log("total", total)
}

let startTime = new Date();
solve(input)
let endTime = new Date();
console.log("Took ms:", endTime - startTime)
