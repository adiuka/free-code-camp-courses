function pyramid(character, rowCount, inverted) {

	function padRow(rowNumber, rowCount) {
		return " ".repeat(rowCount - rowNumber) + character.repeat(rowNumber * 2 - 1);
	}

	let pyramid = "\n";

	if (inverted == true) {
		for (let i = rowCount; i >= 1; i--) {
			pyramid += padRow(i, rowCount) + "\n";
		}
	} else {
		for (let i = 1; i <= rowCount; i++) {
			pyramid += padRow(i, rowCount) + "\n";
		}
	}
	return pyramid;
}

const generatedPyramid = pyramid("o", 5, true);
console.log(generatedPyramid);