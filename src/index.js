import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      turn: 0,
      stepNumber: 0,
    };
  }

  checkWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const current = this.state.history[this.state.history.length - 1];
    if (this.checkWinner(current.squares)) {
      alert("The game is over!");
      return;
    }
    if (current[i] != null) {
      alert("it can not happen!");
      return;
    }
    const history = this.state.history;
    const squares = current.squares.slice();
    squares[i] = this.state.turn === 0 ? "X" : "O";

    this.setState({
      history: history.concat([{ squares: squares }]),
      turn: this.state.turn === 0 ? 1 : 0,
      stepNumber: this.state.stepNumber + 1,
    });
  }

  jumpTo(i) {
      const history = this.state.history.slice(0, i + 1);
      this.setState({history: history, turn: i % 2, stepNumber: i});
  }

  render() {
    let status;
    const current = this.state.history[this.state.history.length - 1];
    const winner = this.checkWinner(current.squares);
    const history = this.state.history;
    if (winner == null)
      status = "Next player: " + (this.state.turn === 0 ? "X" : "O");
    else status = "Winner is " + winner;

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
