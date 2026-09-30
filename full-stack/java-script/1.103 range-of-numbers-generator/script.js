function rangeOfNumbers(n1, n2) {
	let rangeArray = [];
	if (n1 === n2) {
		return [n2];
	} else {
		rangeArray = rangeOfNumbers(n1 + 1, n2);
		rangeArray.unshift(n1);
		
		return rangeArray;
	}
}

console.log(rangeOfNumbers(5, 10));