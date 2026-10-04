function quicksort(array) {
	if (array.length <= 1) {
		return array;
	}

	const left = [];
	const right = [];
	const pivot = array[array.length - 1];

	for (let i = 0; i < array.length - 1; i++) {
		if (array[i] < pivot) {
			left.push(array[i]);
		} else {
			right.push(array[i]);
		}
	}

	return [...quicksort(left), pivot, ...quicksort(right)];
}

const testArray = [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92];
console.log(quicksort(testArray));