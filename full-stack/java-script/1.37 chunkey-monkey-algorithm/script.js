const test = ["a", "b", "c", "d"];

const chunkArrayInGroups = (array, n) => {
	let chunkedArray = [];
	for (let i = 0; i < array.length; i += n) {
		chunkedArray.push(array.slice(i, i + n));
	}

	return chunkedArray;
}


console.log(chunkArrayInGroups(test, 2));