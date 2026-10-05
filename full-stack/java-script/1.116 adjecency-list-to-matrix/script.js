const testObject = { 
	0: [1, 2], 
	1: [2], 
	2: [0, 2], 
};


const adjacencyListToMatrix = (adjacencyList) => {
	const n = Object.keys(adjacencyList).length;
	const matrix = [];

	for (let i = 0; i < n; i++) {
		matrix.push(new Array(n).fill(0));
	}

	for (let node in Object.keys(adjacencyList)) {
		for (let neighbor of adjacencyList[node]) {
			matrix[node][neighbor] = 1;
		}
		console.log(matrix[node]);
	}

	return matrix;
}

console.log(adjacencyListToMatrix(testObject));

