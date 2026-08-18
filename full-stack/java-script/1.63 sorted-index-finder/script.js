const testArray = [5, 3, 20, 3];

const sorted = testArray.sort();

console.log(sorted);

console.log(sorted.indexOf(4));

const getIndexToIns = (array, num) => {
	const sortedArray = array.sort((a, b) => a - b);
	let index = sortedArray.findIndex(el => el > num || el === num);
	if (index === -1) {
		index = sortedArray.length;
	}
	return index;
}

console.log(getIndexToIns(testArray, 5))
