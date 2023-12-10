import {input} from "./input.mjs";

export const testInput = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

export function parseSeries(map) {
    return map
        .split("\n")
        .filter(val => !!val)
        .map(line => line
            .split(" ")
            .map(Number)
        );
}

function solve(input) {
    const series = parseSeries(input);
    let total = 0;

    for (let s of series) {
        let diffSeries = [s];
        let currentSeries = s;

        while (true) {
            let currentDiff = [];

            for (let idx = 0; idx < currentSeries.length - 1; idx++) {
                currentDiff.push(
                    currentSeries[idx + 1] - currentSeries[idx]
                );
            }

            let isAllZero = currentDiff.reduce((acc, cur) => acc + cur, 0) === 0
            if (isAllZero) {
                break;
            }

            diffSeries.push(currentDiff)
            currentSeries = currentDiff
        }

        let extrapolation = 0;
        for (let i = diffSeries.length - 1; i >= 0; i--) {
            let a = diffSeries[i]
            let lastA = a[a.length - 1];

            extrapolation = lastA + extrapolation;
            //console.log(extrapolation)
        }

        total += extrapolation
    }

    console.log("total", total)
}

solve(input)
