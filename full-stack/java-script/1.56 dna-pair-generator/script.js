function pairElement(string) {
	const answers = [];
	for (let i = 0; i < string.length; i++) {
		if (string[i] === "A") {
			answers.push(["A", "T"]);
		}

		if (string[i] === "T") {
			answers.push(["T", "A"]);
		}

		if (string[i] === "C") {
			answers.push(["C", "G"]);
		}

		if (string[i] === "G") {
			answers.push(["G", "C"]);
		}
	}

	return answers;
}

console.log(pairElement("ATCG"));