import {input} from "./input.mjs";

const testInput = [
    {
        id: 1,
        time: 7,
        distance: 9
    },
    {
        id: 2,
        time: 15,
        distance: 40
    },
    {
        id: 3,
        time: 30,
        distance: 200
    }
]

function solve(races) {
    const strategiesPerRace = [];

    for (let race of races) {
        const strategies = [];
        const minimumSpeed = Math.ceil(race.distance / (race.time - 2));
        console.log("race requires minimum speed", race.id, minimumSpeed);

        for (let speed = minimumSpeed; speed <= race.time - minimumSpeed; speed++) {
            let distance = (race.time - speed) * speed;

            if (distance > race.distance) {
                strategies.push(race.time - speed);
            }
        }

        strategiesPerRace.push(strategies);
    }

    //console.dir(strategiesPerRace);
    console.log(strategiesPerRace.reduce(
        (accumulator, currentValue) => accumulator * currentValue.length,
        1,
    ));

}

solve(input)
