import { readFileSync } from 'fs';

function parse(fileName) {
    let content = readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
    let lines = content.split("\n").filter(line => !!line);
    let map = []

    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            map.push({
                x: x,
                y: y,
                value: lines[y][x],
                energized: false
            })
        }
    }

    //console.dir(map)
    return map
}

const memo = new Map()

function raytracing(map, beam) {
    const cacheKey = JSON.stringify(beam)
    if (memo.has(cacheKey)) {
        //console.log("cache hit")
        return []
    }

    let targets = []

    switch (beam.from) {
        case 'right': {
            let hit = map
                .filter(n => n.y === beam.y && n.x < beam.x && n.value !== "-" && n.value !== ".")
                .toSorted((a, b) => b.x - a.x) // descending
                .find(n => n)

            const min = hit ? hit.x : 0
            map
                .filter(n => n.y === beam.y && n.x >= min && n.x <= beam.x)
                .forEach(n => n.energized = true);
            if (hit) {
                //console.log("Beam coming from " + beam.from + " " + beam.x + "|" + beam.y + " [" + beam.value + "]" + " and hitting " + hit.x + "|" + hit.y + " [" + hit.value + "]")
                switch (hit.value) {
                    case "/":
                        targets.push({
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'top'
                        })
                        break;
                    case "\\":
                        targets.push({
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'bottom'
                        })
                        break;
                    case "|":
                        targets.push({
                                x: hit.x,
                                y: hit.y,
                                value: hit.value,
                                from: 'top'
                            },
                            {
                                x: hit.x,
                                y: hit.y,
                                value: hit.value,
                                from: 'bottom'
                            })
                        break;
                }
            }
        }
            break;
        case 'left': {
            let hit = map
                .filter(n => n.y === beam.y && n.x > beam.x && n.value !== "-" && n.value !== ".")
                .toSorted((a, b) => a.x - b.x) // ascending
                .find(n => n)

            const max = hit ? hit.x : Number.MAX_SAFE_INTEGER
            map
                .filter(n => n.y === beam.y && n.x >= beam.x && n.x <= max)
                .forEach(n => n.energized = true);

            if (hit) {
                //console.log("Beam coming from " + beam.from + " " + beam.x + "|" + beam.y + " [" + beam.value + "]" + " and hitting " + hit.x + "|" + hit.y + " [" + hit.value + "]")
                switch (hit.value) {
                    case "/":
                        targets.push({
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'bottom'
                        })
                        break;
                    case "\\":
                        targets.push({
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'top'
                        })
                        break;
                    case "|":
                        targets.push({
                                x: hit.x,
                                y: hit.y,
                                value: hit.value,
                                from: 'top'
                            },
                            {
                                x: hit.x,
                                y: hit.y,
                                value: hit.value,
                                from: 'bottom'
                            })
                        break;
                }
            }
        }
            break;
        case 'top': {
            let hit = map
                .filter(n => n.x === beam.x && n.y > beam.y && n.value !== "|" && n.value !== ".")
                .toSorted((a, b) => a.y - b.y) // ascending
                .find(n => n)

            const max = hit ? hit.y : Number.MAX_SAFE_INTEGER
            map
                .filter(n => n.x === beam.x && n.y >= beam.y && n.y <= max)
                .forEach(n => n.energized = true);
            if (hit) {
                //console.log("Beam coming from " + beam.from + " " + beam.x + "|" + beam.y + " [" + beam.value + "]" + " and hitting " + hit.x + "|" + hit.y + " [" + hit.value + "]")
                switch (hit.value) {
                    case "/":
                        targets.push({
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'right'
                        })
                        break;
                    case "\\":
                        targets.push({
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'left'
                        })
                        break;
                    case "-":
                        targets.push({
                                x: hit.x,
                                y: hit.y,
                                value: hit.value,
                                from: 'left'
                            },
                            {
                                x: hit.x,
                                y: hit.y,
                                value: hit.value,
                                from: 'right'
                            })
                        break;
                }
            }
        }
            break;
        case 'bottom':
            let hit = map
                .filter(n => n.x === beam.x && n.y < beam.y && n.value !== "|" && n.value !== ".")
                .toSorted((a, b) => b.y - a.y) // descending
                .find(n => n)

            const min = hit ? hit.y : 0
            map
                .filter(n => n.x === beam.x && n.y <= beam.y && n.y >= min)
                .forEach(n => n.energized = true);

            if (hit) {
                //console.log("Beam coming from " + beam.from + " " + beam.x + "|" + beam.y + " [" + beam.value + "]" + " and hitting " + hit.x + "|" + hit.y + " [" + hit.value + "]")
                switch (hit.value) {
                    case "/":
                        targets.push({
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'left'
                        })
                        break;
                    case "\\":
                        targets.push({
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'right'
                        })
                        break;
                    case "-":
                        targets.push({
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'left'
                        },
                        {
                            x: hit.x,
                            y: hit.y,
                            value: hit.value,
                            from: 'right'
                        })
                        break;
                }
            }
            break;
        default:
            throw new Error("Unknown direction: " + beam.from)
    }

    memo.set(cacheKey, targets)
    return targets
}

function solve(input) {
    const beamStarts = []
    const dimension = Math.sqrt(12_100);
    for (let idx = 0; idx < dimension; idx++) {
        beamStarts.push({
            x: -1,
            y: idx,
            from: "left",
        }, {
            x: idx,
            y: -1,
            from: "top",
        }, {
            x: dimension,
            y: idx,
            from: "right",
        }, {
            x: idx,
            y: dimension,
            from: "bottom",
        });
    }

    let maxSaturation = 0;
    for (let start of beamStarts) {
        const map = parse(input)
        let currentBeams = [start]

        do {
            let newBeams = []
            for (let beam of currentBeams) {
                let targets = raytracing(map, beam)
                if (targets) {
                    targets.forEach(it => newBeams.push(it))
                }
            }

            let total = map.filter(n => n.energized).length
            if (total > maxSaturation) {
                maxSaturation = total;
                console.log("maximum " + maxSaturation + " / " + map.length)
            }

            currentBeams = newBeams
        } while (currentBeams.length > 0);

        memo.clear();
    }
}

let startTime = new Date();
solve("input.txt")
let endTime = new Date();
console.log("Took ms:", endTime - startTime)
