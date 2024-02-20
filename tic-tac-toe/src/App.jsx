import { useState } from 'react'
// Create a tic tac toe game that uses variable state to save who's turn it is, who wins the game, and if it is a draw.
// TODO:
// Display who's turn it is
// Display draw message

// Child component 
function Square({ value, onSquareClick }) {
	return <button className="square" onClick={onSquareClick}>{value}</button>;
}

// Parent component
export default function Board() {
	// Create state to determine which player will take a turn.
	const [isXNext, setIsXNext] = useState(true);
	// Create state to create a array to hold the values of the squares
	const [squareState, setSquareState] = useState(Array(9).fill(null));

	// Handler function for click event
	function handleClick(i) {
		// If there is a declared winner, or the square already has a value, return early.
		if ((winner) || (squareState[i])) {
			return;
		}
		// Create a subArray for squareState
		const subArray = squareState.slice();
		(isXNext) ? subArray[i] = "X" : subArray[i] = "O";
		setSquareState(subArray); // Update squareState array
		setIsXNext(!isXNext); // Flip flag to change turn
	}

	// Helper function to calculate if there is a winner.
	function calculateWinner(squareState) {
		// Winning combinations
		const list = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		// If there is a winning combination, return winner, otherwise return null.
		for (let i = 0; i < list.length; i++) {
			const [a, b, c] = list[i];
			if (squareState[a] && squareState[a] === squareState[b] && squareState[a] === squareState[c]) {
				return squareState[a];
			}
		}
		return null;
	}

	// Current turn and winner message logic
	let currentTurn;
	const winner = calculateWinner(squareState);

	if (winner) {
		currentTurn = "Winner: " + winner;
	} else {
		(isXNext) ? currentTurn = "X's turn" : currentTurn = "O's turn";
	}

	return (
		<>
			<div className="status">{currentTurn}</div>
			<div className="board-row">
				<Square value={squareState[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squareState[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squareState[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className="board-row">
				<Square value={squareState[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squareState[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squareState[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className="board-row">
				<Square value={squareState[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squareState[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squareState[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}