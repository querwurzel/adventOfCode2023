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

const labelOrderAsc = "2 3 4 5 6 7 8 9 T J Q K A"

function analyseType(hand) {
    const cards = new Map();

    for (let idx = 0; idx < hand.length; idx++) {
        if (cards.has(hand[idx])) {
            cards.set(hand[idx], cards.get(hand[idx]) + 1)
        } else {
            cards.set(hand[idx], 1);
        }
    }

    const sameOfAKind = (cards, minimum) => {
        for (let [_, value] of cards) {
            if (value === minimum) {
                return true;
            }
        }
        return false;
    }
    const fullHouse = (cards) => {
        return sameOfAKind(cards, 3) && pairs(cards, 1)
    }
    const pairs = (cards, numOfPairs) => {
        let pairs = 0;
        for (let [_, value] of cards) {
            if (value === 2) {
                pairs++
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
    let groups = input
        .map(hand => {
            hand.type = analyseType(hand.hand)
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
        .reduce(
            (accumulator, currentValue) => accumulator + currentValue.rank * currentValue.bid,
            0,
        );

    console.dir(groups)
}

solve(input) // 253603890
