function sumFibs(number) {
	let answer = 0;
	let number1 = 0;
	let number2 = 1;
	let next;
	next = number1 + number2;
	const fibonachiArray = [0, 1];

	while (next <= number) {
		fibonachiArray.push(next);
		number1 = number2;
		number2 = next;
		next = number1 + number2;
	}

	console.log(fibonachiArray);

	for (let number of fibonachiArray) {
		if (number % 2 !== 0) {
			answer += number;
		}
	}

	return answer;
}

console.log(sumFibs(4));