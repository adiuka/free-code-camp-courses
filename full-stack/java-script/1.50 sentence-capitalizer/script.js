const testSentence = "sHoRt AnD sToUt";

function titleCase(string) {
	const wordList = string.split(" ");

	const titleWorldList = [];
	
	for (let i = 0; i < wordList.length; i++) {
		let lowerCaseWord = wordList[i].toLowerCase();
		titleWorldList.push(lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1));
	}

	const joinedSentence = titleWorldList.join(" ");
	return joinedSentence;
}

console.log(titleCase(testSentence));