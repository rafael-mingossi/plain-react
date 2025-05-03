import "./SquareBlock.css";

export interface SquareBlockProps {
  value: null | number;
  handleClick: () => void;
}

export function SquareBlock({ value, handleClick }: SquareBlockProps) {
  function mapValue() {
    if (value === 1) {
      return "X";
    } else if (value === 2) {
      return "O";
    } else {
      return null;
    }
  }

  return (
    <button className="btn" onClick={handleClick}>
      {mapValue()}
    </button>
  );
}
