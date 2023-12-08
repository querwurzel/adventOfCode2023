import {input} from "./input.mjs";

const testInput = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
]

function solve(input) {

    let total = input
        .map(game => parseGame(game))
        .map(game => multiplyMaxCubes(game.moves))
        .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
        );

    console.log("total", total);
}

function parseGame(str) {
    str = str.substring(str.indexOf(":") + 1).trim();

    let moves = [];
    for (let move of str.split("; ")) {

        let gameMove = {};
        for (let cube of move.split(", ")) {
            let cubeAndCount = cube.split(" ");

            gameMove[cubeAndCount[1]] = parseInt(cubeAndCount[0]);

        }

        moves.push(gameMove);
    }

    return {
        moves
    }
}

function multiplyMaxCubes(moves) {
    const maxCubesPerColor = {};

    for (let move of moves) {
        for (let property in move) {
            if (maxCubesPerColor[property] === undefined || maxCubesPerColor[property] < move[property]) {
                maxCubesPerColor[property] = move[property];
            }
        }
    }

    //console.dir(maxCubesPerColor, {length: 100})
    let power = 1;
    for (const property in maxCubesPerColor) {
        power *= maxCubesPerColor[property];
    }

    return power;
}

solve(input);
