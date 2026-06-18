function findElement(array, callback) {
	for (let i = 0; i < array.length; i++) {
		if (callback(array[i])) {
			return array[i];
			break;
		}
	}
}

console.log(findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; }));