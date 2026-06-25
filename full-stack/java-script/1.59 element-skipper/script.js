function dropElements(arr, func) {
	const emptyArray = [];
	for (let i = 0; i < arr.length; i++) {
		if (func(arr[i]) === true) {
			const newArray = arr.slice(i);
			return newArray;
		}
	}
	return emptyArray;
}

function testFunc(n) {
	if (n === 2) {
		return true;
	}
}

console.log(dropElements([1, 1, 2, 1, 1, 1], testFunc))