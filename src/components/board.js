import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Square} from './square/square'


const MINE = 99;

export class Board extends React.Component {


  constructor(props) {
    super(props);

    let squares = [];

    for(let i=0;i<this.props.cols * this.props.rows + 1;i++){
      squares.push({value:0,isOpen:false})
    }

    squares = this.fillMines(squares);
    squares = this.fillValues(squares);

    this.state = {
      squares: squares,
      gameOver: false
    };

  }

  fillMines(squares) {

    let cells = [...squares];
    for (let i=0 ; i< this.props.mines;i++){
      let success = false;

      while(!success){
        let randomIndex = Math.floor(Math.random() * cells.length);
        if(!cells[randomIndex].value){
          success = true;
          cells[randomIndex].value = MINE;
        }
      }
    }
    return cells;
  }

  fillValues(squares){
    const adjacencies = [
      [-1,-1],[-1,0],[-1,1],
      [0,-1],[0,1],
      [1,-1],[1,0],[1,1],
    ];
    let cells = [...squares];
    for (let i=0 ; i<cells.length;i++){
      if(cells[i].value===MINE){
        continue;
      }
      for (let j=0 ; j<adjacencies.length;j++){
        let adjacentCoudinates = adjacencies[j];
        let adjacent = i + adjacentCoudinates[0]* this.props.cols + adjacentCoudinates[1];
        if(cells[adjacent] && cells[adjacent].value===MINE){
          cells[i].value++;
        }
    }
  }
    return cells;
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

  renderRows(rows,cols) {
    let res = [];
    for(let i=0; i<rows;i++){
      res.push (this.renderRow(i,cols))
    }
    return res;
  }

  renderRow(index,size) {
    let res = [];
    for(let i=1; i<=size;i++){
      res.push (this.renderSquare(size * index + i));
    }
    return(
      <div className="board-row">
      {res}
      </div>);
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (

      <div>
      <div className="status">{status}</div>
      {this.renderRows(this.props.rows,this.props.cols)}
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
