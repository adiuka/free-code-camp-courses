function uniteUnique(array1, array2, ...rest) {
	const uniqueArray = [];
	for (const arg of arguments) {
		for (let i = 0; i < arg.length; i++) {
			let item = arg[i];
			if (!uniqueArray.includes(item)) {
				uniqueArray.push(item)
			}
		}
	}

	return uniqueArray;
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));