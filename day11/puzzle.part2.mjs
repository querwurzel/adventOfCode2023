import {input} from "./input.mjs";

// n! / ((n - m)! * m!) = 36
export const testInput = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`; // 10x10

function parse(input) {
    let lines = input.split("\n").filter(line => !!line);
    let galaxies = []

    let id = 1;
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === "#") {
                galaxies.push({
                    x: x,
                    y: y,
                    id: id++,
                    originalX: x,
                    originalY: y
                })
            }
        }
    }

    for (let idx = 0; idx< lines.length; idx++) {
        if (!galaxies.find(gal => gal.originalY === idx)) { // empty column
            galaxies
                .filter(gal => gal.originalY >= idx)
                .forEach(gal => gal.y += (1_000_000 - 1))
        }
        if (!galaxies.find(gal => gal.originalX === idx)) { // empty row
            galaxies
                .filter(gal => gal.originalX >= idx)
                .forEach(gal => gal.x += (1_000_000 - 1))
        }
    }

    console.log("Found galaxies", galaxies.length)
    if (input === testInput) {
        console.dir(galaxies)
    }

    return galaxies
}

function solve(input) {
    const galaxies = parse(input)

    let total = 0, totalOps = 0;
    for (let i = 0; i < galaxies.length; i++) {
        let galaxy = galaxies[i];

        for (let j = i + 1; j < galaxies.length; j++) {
            let neighbor = galaxies[j];
            let xDistance = Math.abs(galaxy.x - neighbor.x)
            let yDistance = Math.abs(galaxy.y - neighbor.y)

            //console.log(galaxy.id + " to " + neighbor.id + " is " + (xDistance + yDistance))

            totalOps++
            total += xDistance + yDistance
        }
    }

    console.log("total distance and operations:", total, totalOps)
}

solve(input)
