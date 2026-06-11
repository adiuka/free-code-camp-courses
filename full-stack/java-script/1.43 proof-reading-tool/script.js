const isPalindrome = (word) => {
	const lowercaseWord = word.toLowerCase();
	const reversedWord = lowercaseWord.split("").reverse().join("");
	let isPalindrome = false;

	if (lowercaseWord === reversedWord) {
		isPalindrome = true;
	}

	return isPalindrome;
}

const findPalindromeBreaks = (words) => {
	const palindromeBreaks = [];

	for (let i = 0; i < words.length; i++) {
		if (isPalindrome(words[i]) === false) {
			palindromeBreaks.push(i);
		}
	}

	return palindromeBreaks;
}

const findRepeatedPhrases = (words, phraseLength) => {
	if (phraseLength >= words.length) {
		return [];
	}

	const phrases = [];

	for (let i = 0; i <= words.length - phraseLength; i++) {
		const phrase = words.slice(i, i + phraseLength).join(" "); 
		phrases.push({ phrase, index: i});
	}

	const results = []

	for (let i = 0; i < phrases.length; i++) {
		let count = 0;

		for (let j = 0; j < phrases.length; j++) {
			if (phrases[i].phrase === phrases[j].phrase) {
				count++;
			}
		}

		if (count > 1) {
			if (!results.includes(phrases[i].index)) {
				results.push(phrases[i].index);
			}
		}
	}
	return results;
}

const analyzeTexts = (texts, phraseLength) => {
	const results = [];

	for (let i = 0; i < texts.length; i++) {
		results.push({repeatedPhrases: findRepeatedPhrases(texts[i], phraseLength), palindromeBreaks: findPalindromeBreaks(texts[i])});
	}

	return results;
}

const wordArray = "The cat sat in the racecar on this level".split(" ");

const testArray = ["the", "cat", "sat", "on", "the", "cat"];
console.log(findRepeatedPhrases(testArray, 2));