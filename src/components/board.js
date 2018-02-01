import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Square} from './square/square'

export class Board extends React.Component {


  constructor(props) {
    super(props);

    // let squares = [];
    //
    // for(let i=0;i<this.props.cols * this.props.rows + 1;i++){
    //   squares.push({value:0,isOpen:false})
    // }
    //
    // squares = this.fillMines(squares);
    // squares = this.fillValues(squares);

    this.state = {
      //squares: props.board,
      gameOver: false
    };

  }


  handleClick(i) {

    const squares = [...this.state.squares];

    if (squares[i].isOpen || this.state.gameOver) {
      return;
    }
    if(squares[i].value === MINE){
      //TODO Finish game
      this.setState({gameOver: true})
      alert("boom!")
    }
    squares[i].isOpen = true;
    this.setState({squares: squares});
  }



  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    //<div className="status">{status}</div>
    return (

      <div>

        {
          this.props.board.map((square, i) => <Square value={square} onClick={() => this.handleClick(i)}
        />)}
      </div>
    );
  }
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}
