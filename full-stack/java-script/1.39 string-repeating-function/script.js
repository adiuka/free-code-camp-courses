const repeatStringNumTimes = (string, num) => {
	let newString = "";
	if (num <= 0) {
		return newString;
	}

	for (let i = 0; i < num; i++) {
		newString += string;
	}
	return newString;
}

console.log(repeatStringNumTimes("ass", 0));