function permuteString(string, prefix = "", results = []) {
	if (string.length === 0) {
		results.push(prefix);
		return results;
	} else {
		for (let i = 0; i < string.length; i++) {
			const remaining = string.slice(0, i) + string.slice(i + 1);
			permuteString(remaining, prefix + string[i], results);
		}

		const cleanedResults = new Set(results)
		return [...cleanedResults];
	}
}

console.log(permuteString("cat"));