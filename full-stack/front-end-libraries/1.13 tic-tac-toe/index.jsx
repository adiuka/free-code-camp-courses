const { useState } = React;

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

function calculateWinner(squares) {
	for (const [a, b, c] of LINES) {
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);

	const winner = calculateWinner(squares);
	const isDraw = !winner && squares.every((square) => square !== null);

	const handleClick = (i) => {
		if (squares[i] || winner) {
			return;
		}

		const next = [...squares];
		next[i] = xIsNext ? "X" : "O";
		setSquares(next);
		setXIsNext(!xIsNext);
	};

	const handleReset = () => {
		setSquares(Array(9).fill(null));
		setXIsNext(true);
	}

	const renderSquare = (i) => (
		<button className="square" onClick={() => handleClick(i)}>
      {squares[i]}
    </button>
	);

	return (
		<div className="board">
			<div className="board-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>

			<div className="board-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>

			<div className="board-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>

			<button id="reset" onClick={handleReset}>Reset</button>

			{winner && <p>Winner: {winner}</p>}
			{isDraw && <p>Draw!</p>}
		</div>
	);
}