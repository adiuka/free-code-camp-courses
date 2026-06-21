const testArray = [7, "ate", "", false, 9];
const testArray2 = [false, null, 0, NaN, undefined, ""];


const bouncer = (array) => {
	const cleanArray = [];

	for (let i = 0; i < array.length; i++) {
		let item = array[i];
		if (item !== false && item !== "" && item !== 0 && item !== null && item !== undefined && !Number.isNaN(item)) {
			cleanArray.push(item);
		}
	}
	return cleanArray;	
}

console.log(bouncer(testArray));

