import {input} from "./input.mjs";
import {testInput, parseSeries} from "./puzzle.mjs";

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
            let firstA = a[0];

            extrapolation = firstA - extrapolation;
            //console.log(extrapolation)
        }

        total += extrapolation
    }

    console.log("total", total)
}

solve(input)
