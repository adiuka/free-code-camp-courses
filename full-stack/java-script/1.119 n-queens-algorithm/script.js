function dfsNQueens(n) {
	if (n < 1) {
		return [];
	}

	const solutions = [];

	function isSafe(placement, row, col) {
		for (let r = 0; r < row; r++) {
			const c = placement[r];
			const sameColumn = c === col;
			const sameDiagonal = Math.abs(row - r) === Math.abs(col - c);
			if (sameColumn || sameDiagonal) {
				return false;
			}
		}
		return true;
	}

	function place(placement, row) {
		if (row === n) {
			solutions.push([...placement]);
			return;
		}

		for (let col = 0; col < n; col++) {
			if (isSafe(placement, row, col)) {
				placement.push(col);
				place(placement, row + 1);
				placement.pop();
			}
		}
	}

	place([], 0);
	return solutions;
}

console.log(dfsNQueens(6));