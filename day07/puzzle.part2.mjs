import {input} from "./input.mjs";

const testInput = [
    {
        hand: "32T3K", bid: 765
    },
    {
        hand: "T55J5", bid: 684
    },
    {
        hand: "KK677", bid: 28
    },
    {
        hand: "KTJJT", bid: 220
    },
    {
        hand: "QQQJA", bid: 483
    },
]

const testInput2 = [
    {hand: "2345A", bid: 1},
    {hand: "Q2KJJ", bid: 13},
    {hand: "Q2Q2Q", bid: 19},
    {hand: "T3T3J", bid: 17},
    {hand: "T3Q33", bid: 11},
    {hand: "2345J", bid: 3},
    {hand: "J345A", bid: 2},
    {hand: "32T3K", bid: 5},
    {hand: "T55J5", bid: 29},
    {hand: "KK677", bid: 7},
    {hand: "KTJJT", bid: 34},
    {hand: "QQQJA", bid: 31},
    {hand: "JJJJJ", bid: 37},
    {hand: "JAAAA", bid: 43},
    {hand: "AAAAJ", bid: 59},
    {hand: "AAAAA", bid: 61},
    {hand: "2AAAA", bid: 23},
    {hand: "2JJJJ", bid: 53},
    {hand: "JJJJ2", bid: 41},
] // sum: 6839

const labelOrderAsc = "J 2 3 4 5 6 7 8 9 T Q K A"

function analyseType(item) {
    const cards = new Map();
    const hand = item.hand;

    for (let idx = 0; idx < hand.length; idx++) {
        if (cards.has(hand[idx])) {
            cards.set(hand[idx], cards.get(hand[idx]) + 1)
        } else {
            cards.set(hand[idx], 1);
        }
    }

    const sameOfAKind = (cards, minimum) => {
        let jokers = cards.get("J") || 0;
        for (let [key, value] of cards) {
            if (value === minimum) {
                return true;
            }
            if (key !== "J" && value === minimum - jokers) {
                return true;
            }
        }

        return false;
    }
    const fullHouse = (cards) => {
        let jokers = cards.get("J") || 0;
        let threeOfAKind = false;

        for (let [key, value] of cards) {
            if (key !== "J" && value === 3) {
                threeOfAKind = true;
                break;
            }
            if (key === "J" && value === 3) {
                threeOfAKind = true;
                jokers = 0;
                break;
            }
            if (key !== "J" && value === 3 - jokers) {
                threeOfAKind = true;
                jokers = 0;
                break;
            }
        }

        if (threeOfAKind) {
            for (let [key, value] of cards) {
                if (key !== "J" && value === 2) {
                    return true;
                }
                if (key === "J" && value === 2 && jokers === 2) {
                    return true;
                }
                if (key !== "J" && value === 1 && jokers > 0) {
                    return true;
                }
            }
        }

        return false;
    }
    const pairs = (cards, numOfPairs) => {
        let pairs = 0;
        let jokers = cards.get("J") || 0;
        for (let [key, value] of cards) {
            if (value === 2) {
                pairs++
            }
            if (key !== "J" && value === 1 && jokers > 0) {
                jokers--;
                pairs++;
            }
        }

        return pairs === numOfPairs;
    }

    if (sameOfAKind(cards, 5)) {
        return 7;
    }
    if (sameOfAKind(cards, 4)) {
        return 6;
    }
    if (fullHouse(cards)) {
        return 5;
    }
    if (sameOfAKind(cards, 3)) {
        return 4;
    }
    if (pairs(cards, 2)) {
        return 3
    }
    if (pairs(cards, 1)) {
        return 2
    }
    return 1; // high card
}

function compareLabel(aHand, bHand) {
    for (let idx = 0; idx < Math.min(aHand.length, bHand.length); idx++) {
        const aLabel = labelOrderAsc.indexOf(aHand[idx]);
        const bLabel = labelOrderAsc.indexOf(bHand[idx]);

        if (aLabel !== bLabel) {
            return aLabel > bLabel ? 1 : -1
        }
    }

    return 0;
}

function solve(input) {
    let hands = input
        .map(hand => {
            hand.type = analyseType(hand)
            return hand
        })
        .sort((a, b) => {
            if (a.type === b.type) {
                return compareLabel(a.hand, b.hand)
            }

            return a.type - b.type
        })
        .map((hand, idx) => {
            hand.rank = idx + 1
            return hand
        })

    hands
        //.filter(hand => hand.hand.includes("J"))
        .forEach(hand => console.dir(hand))

    hands = hands
        .reduce(
            (accumulator, currentValue) => accumulator + currentValue.rank * currentValue.bid,
            0,
        );

    console.log(hands)
}

solve(input)
// mine: 253252891
//       253630098
