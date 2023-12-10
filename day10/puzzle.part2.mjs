import {input} from "./input.mjs";

/**
 * ..45.
 * .236.
 * 01.78
 * 14567
 * 23...
 */
export const testInput = `
..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........`; // 4

const testInput2 = `
.....
.S-7.
.|.|.
.L-J.
.....`; // 1

const testInput3 = `
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`; // 8

const testInput4 = `
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`; // 10

function parse(rawInput) {
    let lines = rawInput.split("\n").filter(line => !!line);
    let map = []

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            switch (lines[y][x]) {
                case ".":
                    map.push({
                        x: x,
                        y: y,
                        value: lines[y][x],
                    })
                    break;
                case "S":
                    map.push({
                        x: x,
                        y: y,
                        northern: true,
                        eastern: true,
                        southern: true,
                        western: true,
                        value: lines[y][x],
                        isStart: true,
                        neighbors: []
                    })
                    break;
                case "F":
                    map.push({
                        x: x,
                        y: y,
                        eastern: true,
                        southern: true,
                        value: lines[y][x],
                        neighbors: []
                    })
                    break;
                case "7":
                    map.push({
                        x: x,
                        y: y,
                        western: true,
                        southern: true,
                        value: lines[y][x],
                        neighbors: []
                    })
                    break;
                case "J":
                    map.push({
                        x: x,
                        y: y,
                        northern: true,
                        western: true,
                        value: lines[y][x],
                        neighbors: []
                    })
                    break;
                case "L":
                    map.push({
                        x: x,
                        y: y,
                        northern: true,
                        eastern: true,
                        value: lines[y][x],
                        neighbors: []
                    })
                    break;
                case "|":
                    map.push({
                        x: x,
                        y: y,
                        northern: true,
                        southern: true,
                        value: lines[y][x],
                        neighbors: []
                    })
                    break;
                case "-":
                    map.push({
                        x: x,
                        y: y,
                        eastern: true,
                        western: true,
                        value: lines[y][x],
                        neighbors: []
                    })
                    break;
            }
        }
    }

    for (let node of map) { // assuming order from left-right, top-bottom to allow for only checking east and south
        switch (node.value) {
            case "S":
            case "F": {
                    let east = map.find(east => east.x === node.x + 1 && east.y === node.y && east.western)
                    if (east) {
                        node.neighbors.push(east);
                        east.neighbors.push(node);
                    }

                    let south = map.find(south => south.x === node.x && south.y === node.y + 1 && south.northern)
                    if (south) {
                        node.neighbors.push(south);
                        south.neighbors.push(node);
                    }
                }
                break;
            case "7":
            case "|": {
                    let south = map.find(south => south.x === node.x && south.y === node.y + 1 && south.northern)
                    if (south) {
                        node.neighbors.push(south);
                        south.neighbors.push(node);
                    }
                }
                break;
            case "L":
            case "-": {
                    let east = map.find(east => east.x === node.x + 1 && east.y === node.y && east.western)
                    if (east) {
                        node.neighbors.push(east);
                        east.neighbors.push(node);
                    }
                }
                break;
            case "J": // nothing to do
                break;
        }
    }

    return map;
}

function markMainLoop(map) {
    let currentNodes = [map.find(node => node.isStart)];

    while (true) {
        let nextNodes = [];
        for (let node of currentNodes) {
            node.isMainLoop = true;
            node.neighbors
                .filter(neighbor => !neighbor.isMainLoop)
                .forEach(neighbor => nextNodes.push(neighbor))
        }

        if (nextNodes.length === 0) {
            break;
        }

        currentNodes = nextNodes;
    }

    return map;
}

function solve(input) {
    const mapWithoutTrash = markMainLoop(parse(input))
        .map(node => {
            if (node.isMainLoop || node.value === ".") {
                return node;
            }

            return {x: node.x, y: node.y, value: "."} // treat trash as empty tiles
        })

    // display main loop
    console.info("This is the main loop")
    const maxX = mapWithoutTrash.reduce((acc, cur) => Math.max(acc, cur.x), 0)
    const maxY = mapWithoutTrash.reduce((acc, cur) => Math.max(acc, cur.y), 0)
    for (let y = 0; y <= maxY; y++) {
        let line = "";
        for (let x = 0; x <= maxX; x++) {
            let node = mapWithoutTrash
                .find(node => node.x === x && node.y === y);

            line += node.value
        }
        console.log(line);
    }

    let dotNodes = mapWithoutTrash
        .filter(node => node.value === ".");

    for (let node of dotNodes) {
        let eastRoute = mapWithoutTrash
            .filter(east => east.y === node.y && east.x > node.x)
            .map(east => east.value.replace("S", "-"))
            .join("");

        let eastCrossings = (eastRoute.match(/\|/g) || []).length
            + (eastRoute.match(/F-*J/g) || []).length
            + (eastRoute.match(/L-*7/g) || []).length

        let southRoute = mapWithoutTrash
            .filter(south => south.x === node.x && south.y > node.y)
            .map(south => south.value.replace("S", "|"))
            .join("");
        let southCrossings = (southRoute.match(/-/g) || []).length
            + (southRoute.match(/F\|*J/g) || []).length
            + (southRoute.match(/7\|*L/g) || []).length

        if (eastCrossings % 2 !== 0 && southCrossings % 2 !== 0) { // odd crossings indicate inner tiles
            node.inside = true;
        }
    }

    let insideNodes = dotNodes
        .filter(node => node.inside)

    console.log("These are the inner tiles")
    for (let y = 0; y <= maxY; y++) {
        let line = "";
        for (let x = 0; x <= maxX; x++) {
            let node = insideNodes
                .find(node => node.x === x && node.y === y);

            if (node) {
                line += "I"
            } else {
                line += ".";
            }
        }
        console.log(line);
    }

    console.log("Inside nodes:", insideNodes.length)
}

solve(input)
