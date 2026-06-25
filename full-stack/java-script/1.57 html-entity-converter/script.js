function convertHTML(string) {
	let newString = ""
	for (let i = 0; i < string.length; i++) {
		if (string[i] === "&") {
			newString += "&amp;";
		} else if (string[i] === "<") {
			newString += "&lt;";
		} else if (string[i] === ">") {
			newString += "&gt;";
		} else if (string[i] === '"') {
			newString += "&quot;";
		} else if (string[i] === "'") {
			newString += "&apos;";
		} else {
			newString += string[i];
		}
	}

	return newString;
}

console.log(convertHTML('Stuff in "quotation marks"'));