const num = 5;

const factorialCalculator = (num) => {
	let result = 1;
	for (let i = num; i > 1; i--) {
		result *= i;
	}
	return result;
}
const factorial = factorialCalculator(num);
const resultMsg = `Factorial of ${num} is ${factorial}`;
console.log(resultMsg);