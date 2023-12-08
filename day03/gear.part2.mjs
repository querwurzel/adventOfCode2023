import {input} from "./input.mjs";

const testInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`; // 10x10

function flatten(str) {
    return str.replaceAll("\n", "");
}

function findNumbers(schematic) {
    let position = 0;

    let nums = schematic
        .split(/[^0-9]+/).filter(val => !!val);

    return schematic
        .split(/[^0-9]+/)
        .filter(number => !!number)
        .map(number => {
            let idx = schematic.indexOf(number, position);
            position = idx + number.length;

            return {
                number: parseInt(number),
                start: idx,
                end: idx + number.length - 1
            }
        })
}

function findAsterisks(schematic) {
    let asterisks = [];
    let position = 0;

    schematic
        .split(/[^\\*]+/)
        .filter(val => !!val)
        .forEach(asterisk => {
            let idx = schematic.indexOf(asterisk, position);
            asterisks.push(idx);

            position = idx + 1;
        })

    return asterisks;
}

function solve(schematic, dimension, parts, gears) {
    let total = 0;

    for (let gear of gears) {
        let adjacentParts = [];

        for (let part of parts) {
            //console.log("Does part " + part.number + " collide with gear " + gear);

            let top= gear - dimension >= part.start && gear - dimension <= part.end;
            let topRight= gear - dimension + 1 >= part.start && gear - dimension + 1 <= part.end;
            let right= gear + 1 === part.start;
            let downRight = gear + dimension + 1 >= part.start && gear + dimension + 1 <= part.end;
            let down= gear + dimension >= part.start && gear + dimension <= part.end;
            let downLeft = gear + dimension - 1 >= part.start && gear + dimension - 1 <= part.end;
            let left = gear - 1 === part.end;
            let topLeft = gear - dimension - 1 >= part.start && gear - dimension - 1 <= part.end;

            //console.log("top", top)
            //console.log("top right", topRight)
            //console.log("right", right)
            //console.log("down right", downRight)
            //console.log("down", down)
            //console.log("down left", downLeft)
            //console.log("left", left)
            //console.log("top left", topLeft)

            if (top || topRight || right || downRight || down || downLeft || left || topLeft) {
                adjacentParts.push(part);
            }

            if (adjacentParts.length > 2) {
                console.warn("Gear2 " + gear + " has more than two parts, skipping", adjacentParts);
                break;
            }

        }

        if (adjacentParts.length === 2) {
            //console.log("Gear " + gear + " has parts " + adjacentParts[0].number + " and " + adjacentParts[1].number)

            total += adjacentParts[0].number * adjacentParts[1].number;
        } else {
            console.warn("Gear " + gear + " has less than two parts, skipping!", adjacentParts)
        }
    }

    console.log("total", total);

}

let schematic = flatten(input);
let parts = findNumbers(schematic);
let gears = findAsterisks(schematic);

solve(schematic, 140, parts, gears)