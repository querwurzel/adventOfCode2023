import {input} from "./input.mjs";

const testInput = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

function parseScratchCards(str) {
    let cards = new Map();

    const parseNums = (arrOfNums) => arrOfNums
        .split(" ")
        .filter(line => !!line)
        .map(num => parseInt(num));

    for (const line of str.split("\n").filter(line => !!line)) {
        let numbers = line.split(": ")[1].split(" | ");
        let winningNumbers = parseNums(numbers[0]);
        let yourNumbers = parseNums(numbers[1]);

        cards.set(cards.size + 1, {
            id: cards.size + 1,
            copies: 0,
            winningNumbers,
            yourNumbers
        })
    }

    return cards;
}

function solve(str) {
    let cards = parseScratchCards(str);
    let totalCards = 0;

    cards.forEach((card, id, map) => {
        let hits = 0;
        for (let yourNumber of card.yourNumbers) {
            if (card.winningNumbers.includes(yourNumber)) {
                hits++;
            }
        }

        console.log("Card " + card.id + " has " + hits + " matches")

        for (let count = 0; count < hits; count++) {
            console.log("Bumping up copies of card", card.id + count + 1)
            if (map.has(card.id + count + 1)) {
                map.get(card.id + count + 1).copies += 1 + card.copies;
            }
        }
    })

    cards.forEach((card) => totalCards += card.copies + 1);

    //console.dir(cards);
    console.log(totalCards);

}

solve(input)
