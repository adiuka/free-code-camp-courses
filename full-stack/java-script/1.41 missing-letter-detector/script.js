function fearNotLetter(string) {
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	const firstIndex = alphabet.indexOf(string[0]);
	const slicedAlphabet = alphabet.slice(firstIndex, firstIndex + string.length);
	let missingLetter = "";
	for (let i = 0; i < slicedAlphabet.length; i++) {
		if (slicedAlphabet[i] !== string[i]) {
			const missingIndex = alphabet.indexOf(slicedAlphabet[i]);
			missingLetter = alphabet[missingIndex];
			return missingLetter;
		} 
	}
}

console.log(fearNotLetter("abce"));