import {input} from "./input.mjs";

/**
 * ..45.
 * .236.
 * 01.78
 * 14567
 * 23...
 */
export const testInput = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const testInput2 = `
.....
.S-7.
.|.|.
.L-J.
.....`;

function parse(rawInput) {
    let lines = rawInput.split("\n").filter(line => !!line);
    let map = []

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            switch (lines[y][x]) {
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

    if (rawInput !== input) {
        console.dir(map, {depth: 2})
    }
    return map;
}

function solve(input) {
    const map = parse(input)
    let currentNodes = [map.find(node => node.isStart)];
    let distance = 0;

    while (true) {
        let nextNodes = [];
        for (let node of currentNodes) {
            node.visited = true;
            node.neighbors
                .filter(neighbor => !neighbor.visited)
                .forEach(neighbor => nextNodes.push(neighbor))
        }

        if (nextNodes.length === 0) {
            console.log("Longest distance:", distance)
            break;
        }

        distance++;
        currentNodes = nextNodes;
    }
}

solve(input)
