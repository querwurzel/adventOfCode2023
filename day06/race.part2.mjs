const testInput = [
    {
        id: 1,
        time: 71530,
        distance: 940200
    }
]

const input = [
    {
        id: 1,
        time: 49979494,
        distance: 263153213781851
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

let startTime = new Date();
solve(input)
let endTime = new Date();
console.log("Took ms:", endTime - startTime)
