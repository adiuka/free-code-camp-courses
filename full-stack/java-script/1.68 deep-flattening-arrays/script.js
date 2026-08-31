const testArr = [1, {"foo": "bar"}, [2]];

/*
const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
*/

/*
const reducedArr = testArr.reduce(
    (accumulator, currentValue) => {
        if (Array.isArray(currentValue)) {
            console.log("Is an Array");
        } else {
            console.log("Whole number!")
            accumulator.push(currentValue)
        }
        return accumulator;
    },
    []
)
*/

function steamrollArray(array) {
    const flatArray = array.reduce(
        (accumulator, currentValue) => {
            if (Array.isArray(currentValue)) {
                accumulator = accumulator.concat(steamrollArray(currentValue));
            } else {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);

        return flatArray;
}

console.log(steamrollArray(testArr));