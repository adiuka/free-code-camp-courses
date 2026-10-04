function selectionSort(array) {
	for (let i = 0; i < array.length - 1; i++) {
		let lowestIndex = i;

		for (let j = i + 1; j < array.length; j++ ) {
			if (array[j] < array[lowestIndex]) {
				lowestIndex = j;
			}
		}
		[array[i], array[lowestIndex]] = [array[lowestIndex], array[i]]; 
	}
	return array;
}

const testArray = [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92];
console.log(selectionSort(testArray));