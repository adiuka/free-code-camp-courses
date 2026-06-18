const testArray = [[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]];

function largestOfAll(array) {
	let largestArray = [];
	for (let i = 0; i < array.length; i++) {
		let largestNumber = array[i][0];
		for (let j = 1; j < array[i].length; j++) {
			if (array[i][j] > largestNumber) {
				largestNumber = array[i][j];
			}
		}
		largestArray.push(largestNumber);
	}

	return largestArray;
}

console.log(largestOfAll(testArray));