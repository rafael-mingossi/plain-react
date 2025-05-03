import { useState } from "react";
import "./App.css";
import { SquareBlock } from "./components/SquareBlock.tsx";

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<Array<number> | null>(
    Array(9).fill(null),
  );

  function onSquareClick(i: number) {
    if (!squares) {
      return;
    }
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares: Array<number> | null = [...squares];

    if (xIsNext) {
      nextSquares[i] = 1; // X
    } else {
      nextSquares[i] = 2; // O
    }
    setSquares(nextSquares);
    setXIsNext((prevState) => !prevState);
  }

  function calculateWinner(squares: number[] | null) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares) {
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return squares[a];
        }
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    squares && (
      <div className="board">
        <div className="status">{status}</div>
        <div className="board-row">
          <SquareBlock
            value={squares[0]}
            handleClick={() => onSquareClick(0)}
          />
          <SquareBlock
            value={squares[1]}
            handleClick={() => onSquareClick(1)}
          />
          <SquareBlock
            value={squares[2]}
            handleClick={() => onSquareClick(2)}
          />
        </div>
        <div className="board-row">
          <SquareBlock
            value={squares[3]}
            handleClick={() => onSquareClick(3)}
          />
          <SquareBlock
            value={squares[4]}
            handleClick={() => onSquareClick(4)}
          />
          <SquareBlock
            value={squares[5]}
            handleClick={() => onSquareClick(5)}
          />
        </div>
        <div className="board-row">
          <SquareBlock
            value={squares[6]}
            handleClick={() => onSquareClick(6)}
          />
          <SquareBlock
            value={squares[7]}
            handleClick={() => onSquareClick(7)}
          />
          <SquareBlock
            value={squares[8]}
            handleClick={() => onSquareClick(8)}
          />
        </div>
      </div>
    )
  );
}

export default App;
