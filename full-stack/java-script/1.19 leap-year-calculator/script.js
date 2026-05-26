const year = 2024;

function isLeapYear(number) {
    if (number % 4 == 0) {
        if (number % 100 == 0) {
            if (number % 400 == 0) {
                return `${number} is a leap year.`;
            } else {
                return `${number} is not a leap year.`
            }
        } else {
            return `${number} is a leap year.`;
        }
    }
}

const result = isLeapYear(year);
console.log(result);