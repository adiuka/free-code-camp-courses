const testArray1 = [1, 2, 3];
const testArray2 = [4, 5];
const testIndex = 1;

const frankenSplice = (firstArray, secondArray, index) => {
	const splicedArray = [...secondArray];
	for (let i = 0; i < firstArray.length; i++) {
		splicedArray.splice(index + i, 0, firstArray[i]);
	}
	return splicedArray;
}

console.log(frankenSplice(testArray1, testArray2, testIndex));



