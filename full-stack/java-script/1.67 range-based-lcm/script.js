const testArr = [12, 2];

function smallestCommons(arr) {
    const sortedArr = arr.sort((a, b) => a - b);
    console.log(sortedArr);

    let candidate = sortedArr[1];

    while (true) {
        let works = true;

        for (let i = sortedArr[0]; i <= sortedArr[1]; i++) {
            if (candidate % i !== 0) {
                works = false;
                break;
            }
        }

        if (works) {
            return candidate;
        }

        candidate++;
    }
    
}

console.log(smallestCommons(testArr));