import {input} from "./input.mjs";

const testInput = [
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
]

const bag = {
    red: 12,
    green: 13,
    blue: 14
}

function solve(input) {

    let total = input
        .map(game => parseGame(game))
        .filter(game => isPossibleGame(game))
        .map(game => game.id)
        .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
        );

    console.log("total", total);
}

function parseGame(str) {
    str = str.replace("Game ", "");

    let gameId = str.substring(0, str.indexOf(":"));

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
        id: parseInt(gameId),
        moves
    }
}

function isPossibleGame(game) {
    for (const move of game.moves) {
        for (const property in move) {
            if (move[property] > bag[property]) {
                return false;
            }
        }
    }

    return true;
}

solve(input);
