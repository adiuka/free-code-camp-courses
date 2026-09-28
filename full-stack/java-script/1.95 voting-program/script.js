const poll = new Map();

function addOption(option) {
	if (option.trim() === "") {
		return "Option cannot be empty.";
	}

	if (poll.has(option)) {
		return `Option "${option}" already exists.`;
	}

	poll.set(option, new Set());
	return `Option "${option}" added to the poll.`;
}

function vote(option, voterId) {
	if (!poll.has(option)) {
		return `Option "${option}" does not exist.`;
	}

	const voters = poll.get(option);

	if (voters.has(voterId)) {
		return `Voter ${voterId} has already voted for "${option}".`;
	}

	voters.add(voterId);
	return `Voter ${voterId} voted for "${option}".`;
}

function displayResults() {
	let results = `Poll Results:\n`

	poll.forEach((voters, option) => {
		results += `${option}: ${voters.size} votes\n`;
	})

	return results.trim();
}

console.log(addOption("Clinton"));
console.log(addOption("Kennedy"));
console.log(addOption("Moore"));
console.log(vote("Clinton", "22121"));
console.log(vote("Kennedy", "25555"));
console.log(vote("Moore", "23455"));

console.log(displayResults());