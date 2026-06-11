function mutation(array) {
	const firstWord = array[0].toLowerCase();
	const secondWord = array[1].toLowerCase();
	let isMutation = true;

	for (let i = 0; i < secondWord.length; i++) {
		if (!firstWord.includes(secondWord[i])) {
			isMutation = false;
		}
	}

	return isMutation;
}

console.log(mutation(["heElLo", "helooy"]));
