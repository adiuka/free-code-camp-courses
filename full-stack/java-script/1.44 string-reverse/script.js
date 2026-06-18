const reverseString = (string) => {
	const reversedString = string.split("").reverse().join("");
	return reversedString;
}

console.log(reverseString("Naja"));