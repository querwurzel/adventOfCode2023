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
function tiltRight(grid) {
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

            const sub = sort(line.slice(x, nextSquare), rollRight);

            line.splice(x, sub.length, ...sub)
            x = nextSquare;
        }
    }

    return grid;
}

function tiltLeft(grid) {
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

            const sub = sort(line.slice(x, nextSquare), rollLeft);

            line.splice(x, sub.length, ...sub)
            x = nextSquare;
        }
    }

    return grid;
}

function rollRight(symbol) {
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

function rollLeft(symbol) {
    return symbol === '.' ? 1 : -1;
}

function sort(line, weight) {
    return line.sort((a, b) => weight(a) - weight(b))
}

function rotateLeft(grid) {
    return grid[0].map((val, index) => grid.map(row => row[row.length - 1 - index]));
}

function rotateRight(grid) {
    return grid[0].map((val, index) => grid.map(row => row[index]).reverse())
}

function displayGrid(grid) {
    for (let line of grid) {
        console.log(line.join(""))
    }
    console.log("---------------------------------------------------")
}

function solve(input) {
    let total = 0;
    let grid = parse(input)

    displayGrid(grid)

    //const cycles = 3;
    //const cycles = 1_000_000_000;
    const cycles = 15625000;
    // left and right approach
    for (let cycle = 0; cycle < cycles; cycle++) {
        grid = rotateLeft(grid) // north
        grid = tiltLeft(grid)
        grid = rotateRight(grid)

        grid = tiltLeft(grid) // west

        grid = rotateRight(grid)
        grid = tiltLeft(grid) // south
        grid = rotateLeft(grid)

        grid = tiltRight(grid) // east

        if (cycle % 1_000_000 === 0) {
            console.log("Applied cycles:", cycle || 1)
        }
    }

    // total 69
    // Took ms: 26

    // right-only approach
    /*
    for (let cycle = 0; cycle < cycles; cycle++) {
        grid = rotateRight(grid) // north
        grid = tiltRight(grid)
        grid = rotateLeft(grid)

        grid = rotateRight(grid) // west
        grid = rotateRight(grid)
        grid = tiltRight(grid)
        grid = rotateLeft(grid)
        grid = rotateLeft(grid)

        grid = rotateRight(grid) // south
        grid = rotateRight(grid)
        grid = rotateRight(grid)
        grid = tiltRight(grid)
        grid = rotateLeft(grid)
        grid = rotateLeft(grid)
        grid = rotateLeft(grid)

        grid = rotateRight(grid) // east
        grid = rotateRight(grid)
        grid = rotateRight(grid)
        grid = rotateRight(grid)
        grid = tiltRight(grid)
        grid = rotateLeft(grid)
        grid = rotateLeft(grid)
        grid = rotateLeft(grid)
        grid = rotateLeft(grid)

        if (cycle % 1_000_000 === 0) {
            console.log("Applied cycles:", cycle)
        }
    }*/

    // total calculation
    grid = rotateRight(grid)
    for (let line of grid) {
        for (let x = 0; x < line.length; x++) {
            if (line[x] === 'O') {
                total += x + 1
            }
        }
    }

    grid = rotateLeft(grid)
    displayGrid(grid)

    console.log("total", total)
}

let startTime = new Date();
solve(testInput)
let endTime = new Date();
console.log("Took ms:", endTime - startTime)
