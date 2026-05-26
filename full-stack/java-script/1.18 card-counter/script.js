let count = 0;

const cardCounter = (card) => {
    if (card >= 2 && card < 7) {
        ++count;
    } else if (card == 10 || card == "J" || card == "Q" || card == "K" || card == "A") {
        --count;
    }

    if ( count > 0) {
        return `${count} Bet`;
    } else if (count == 0) {
        return `${count} Hold`;
    } else {
        return `${count} Hold`;
    }
}

console.log(cardCounter(3));