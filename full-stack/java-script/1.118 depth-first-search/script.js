const testMatrix = [
	[0, 1, 0, 0], 
	[1, 0, 1, 0], 
	[0, 1, 0, 1], 
	[0, 0, 1, 0]
]

function dfs(graph, root) {
	const visited = [];
	const stack = [root];

	while (stack.length > 0) {
		const node = stack.pop();

		if (!visited.includes(node)) {
			visited.push(node);
		}

		for (let i = 0; i < graph[node].length; i++) {
			if (graph[node][i] === 1 && !visited.includes(i)) {
				stack.push(i);
			}
		} 
	}

	return visited;
}

console.log(dfs(testMatrix, 0));