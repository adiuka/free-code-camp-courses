function sumPrimes(n) {
	if (n < 2) return 0;
	let sum = 0;

	const isPrime = new Array(n + 1).fill(true);
	isPrime[0] = false;
	isPrime[1] = false;

	for (let i = 2; i <= n; i++) {
		if (isPrime[i]) {
			for (let j = i * 2; j <= n; j += i) {
				isPrime[j] = false;
			}
		}
	}

	for (let i = 0; i <= n; i++) {
		if (isPrime[i]) {
			sum += i;
		}
	}

	return sum;
}

console.log(sumPrimes(10));