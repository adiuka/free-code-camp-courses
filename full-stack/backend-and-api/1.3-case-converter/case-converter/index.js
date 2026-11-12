const { __esModule } = require("@babel/generator");

function getUpperCase(text) {
	return text.toUpperCase();
}

function getLowerCase(text) {
	return text.toLowerCase();
}

function getSentenceCase(text) {
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function getProperCase(text) {
	const textArray = text.split(" ");
	return textArray.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}

module.exports = {
	getUpperCase,
	getLowerCase,
	getSentenceCase,
	getProperCase
}