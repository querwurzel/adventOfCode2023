import {input} from "./input.mjs";

const testInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

function parseMap(input, name) {
    const ranges = [];
    const start = input.indexOf(name);

    const lines = input.substring(start).split("\n");
    for (let idx = 1; idx < lines.length; idx++) {
        let numbers = lines[idx].split(" ");
        if (numbers.length !== 3) {
            break;
        }

        ranges.push({
            source: parseInt(numbers[1]),
            destination: parseInt(numbers[0]),
            range: parseInt(numbers[2])
        })
    }

    return ranges
        .sort((a, b) => a.source - b.source);
}

function mapNext(num, map) {
    let destination = map
        .find(entry => num >= entry.source && num <= entry.source + entry.range - 1);

    const next = destination === undefined
        ? num
        : destination.destination + (num - destination.source);
    //console.log("Input number " + num + " corresponds to next number " + next);
    return next;
}

const currentInput = input
const seed2Soil = parseMap(currentInput, "seed-to-soil");
const soil2fertilizer = parseMap(currentInput, "soil-to-fertilizer");
const fertilizer2water = parseMap(currentInput, "fertilizer-to-water");
const water2light = parseMap(currentInput, "water-to-light");
const light2temperature = parseMap(currentInput, "light-to-temperature");
const temperature2humidity = parseMap(currentInput, "temperature-to-humidity");
const humidity2location = parseMap(currentInput, "humidity-to-location");

if (currentInput === testInput) {
    console.log(seed2Soil)
    console.log(soil2fertilizer)
    console.log(fertilizer2water)
    console.log(water2light)
    console.log(light2temperature)
    console.log(temperature2humidity)
    console.log(humidity2location)
}

let lowest = Number.MAX_SAFE_INTEGER;

let seeds = currentInput
    .split("\n")[1]
    .replace("seeds: ", "")
    .split(" ")
    .map(Number);

const startTime = new Date();
for (let idx = 0; idx < seeds.length; idx += 2) {
    console.log("Checking seed range [" + seeds[idx] + ", " + (seeds[idx] + seeds[idx + 1]) + "]");

    for (let seedNum = seeds[idx]; seedNum <= seeds[idx] + seeds[idx + 1]; seedNum++) {
        let result = seedNum;
        result = mapNext(result, seed2Soil);
        result = mapNext(result, soil2fertilizer);
        result = mapNext(result, fertilizer2water);
        result = mapNext(result, water2light);
        result = mapNext(result, light2temperature);
        result = mapNext(result, temperature2humidity);
        result = mapNext(result, humidity2location);

        if (result < lowest) {
            lowest = result;
            console.log("Found new closest seed -> location relation", seedNum, lowest)
        }
    }
}
const endTime = new Date();

console.log("closest location", lowest)
console.log("Took ms:", endTime - startTime)

// 148041808 in 25min
