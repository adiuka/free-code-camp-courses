const findLongestWordLength = (sentence) => {
  const wordArray = sentence.split(" ");
	let longestWord = "";
	for (let i = 0; i < wordArray.length; i++) {
		const word = wordArray[i];
		if (word.length > longestWord.length) {
			longestWord = word;
		}
	}
	return longestWord.length;
}

console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog"));
