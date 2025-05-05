import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board.tsx";

function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const [history, setHistory] = useState<(number[] | null)[]>([
    Array(9).fill(null),
  ]);
  const currentSquares = history && history[currentMove];

  function handlePlay(nextSquares: number[] | null) {
    if (!history) {
      return;
    }
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves =
    history &&
    history.map((_, move) => {
      let description;
      if (move > 0) {
        description = "Go to move #" + move;
      } else {
        description = "Go to game start";
      }
      return (
        <li key={move} className="li-move">
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
