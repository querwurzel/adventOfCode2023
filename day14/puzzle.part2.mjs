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

function tiltRight(grid) {
    for (let y = 0; y < grid.length; y++) {
        const line = grid[y];

        for (let x = 0; x < line.length; x++) {
            if (line[x] === '#') {
                continue;
            }

            let nextSquare = line.indexOf('#', x + 1)
            nextSquare = (nextSquare === -1)
                ? line.length
                : nextSquare

            const segment = sort(line.slice(x, nextSquare));

            line.splice(x, segment.length, ...segment)
            x = nextSquare;
        }

    }

    return grid;
}

function rollRight(symbol) {
    return symbol === '.' ? -1 : 1;
}

function sort(line) {
    return line.sort((a, b) => rollRight(a) - rollRight(b))
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

function score(grid) {
    let total = 0;

    grid = rotateRight(grid)
    for (let line of grid) {
        for (let x = 0; x < line.length; x++) {
            if (line[x] === 'O') {
                total += x + 1
            }
        }
    }

    rotateLeft(grid)
    return total;
}

function solve(input) {
    let grid = parse(input)

    displayGrid(grid)

    //const cycles = 3;
    const cycles = 1_000_000_000;
    const cyclesSeen = new Map();

    // right-only approach
    for (let cycle = 0; cycle < cycles; cycle++) {
        const cacheKey = JSON.stringify(grid)

        if (cyclesSeen.has(cacheKey)) {
            let previousCycle = cyclesSeen.get(cacheKey);
            let period = cycle - previousCycle;
            console.log("Already seen grid, fast-forwarding", period, previousCycle, cycle)

            cycle = cycles - ((cycles - cycle) % period)
            cyclesSeen.clear() // prevent another jump
        } else {
            console.log("Found unique grid at cycle", cycle)
            cyclesSeen.set(cacheKey, cycle)
        }

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
    }

    displayGrid(grid)
    console.log("total", score(grid))
}

let startTime = new Date();
solve(input)
let endTime = new Date();
console.log("Took ms:", endTime - startTime)
