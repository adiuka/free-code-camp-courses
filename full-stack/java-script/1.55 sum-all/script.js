function sumAll(array) {
	let answer = 0;
	if (array[0] > array[1]) {
		for (let i = array[1]; i <= array[0]; i++) {
			answer += i;
		} 
	} else {
		for (let i = array[0]; i <= array[1]; i++) {
			answer += i;
		}
	}

	return answer;
}

console.log(sumAll([5, 10]));