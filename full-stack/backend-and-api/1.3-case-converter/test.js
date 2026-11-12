const sentence = "hello world!"

const splitSent = sentence.split(" ");

console.log(splitSent);



function getProperCase(text) {
	const textArray = text.split(" ");
	return textArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

console.log(getProperCase(sentence));