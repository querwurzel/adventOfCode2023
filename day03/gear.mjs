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


function solve(input, dimension) {

    let schematic = flatten(input)
    let numbers = schematic.split(/[^0-9]+/).filter(val => !!val);

    let total = 0;
    let pointer = 0;

    for (let number of numbers) {
        let start = schematic.indexOf(number, pointer);
        pointer = start + number.length;

        //console.log("Checking " + number + " [length:" + number.length + "] starting at " + start);

        let isPartOfEngine = false;
        for (let idx = start; idx < start + number.length; idx++) {
            //console.log("Checking index " + idx);

            let top = schematic[idx - dimension] !== undefined && /[^0-9\\.]+/.test(schematic[idx - dimension]);
            let topRight = schematic[idx - dimension + 1] !== undefined && /[^0-9\\.]+/.test(schematic[idx - dimension + 1]);
            let right = schematic[idx + 1] !== undefined && /[^0-9\\.]+/.test(schematic[idx + 1]);
            let downRight = schematic[idx + dimension + 1] !== undefined && /[^0-9\\.]+/.test(schematic[idx + dimension + 1]);
            let down = schematic[idx + dimension] !== undefined && /[^0-9\\.]+/.test(schematic[idx + dimension]);
            let downLeft = schematic[idx + dimension - 1] !== undefined && /[^0-9\\.]+/.test(schematic[idx + dimension - 1]);
            let left = schematic[idx - 1] !== undefined && /[^0-9\\.]+/.test(schematic[idx - 1]);
            let topLeft = schematic[idx - dimension - 1] !== undefined && /[^0-9\\.]+/.test(schematic[idx - dimension - 1]);

            //console.log("top", idx, top)
            //console.log("top right", idx, topRight)
            //console.log("right", idx, right)
            //console.log("down right", idx, downRight)
            //console.log("down", idx, down)
            //console.log("down left", idx, downLeft)
            //console.log("left", idx, left)
            //console.log("top left", idx, topLeft)

            if (top || topRight || right || downRight || down || downLeft || left || topLeft) {
                isPartOfEngine = true;
            }
        }

        if (isPartOfEngine) {
            total += parseInt(number);
            console.log("part of engine:", number);
        } else {
            console.log("NOT part of engine:", number);
        }
    }

    console.log("total", total);

}

solve(input, 140);
