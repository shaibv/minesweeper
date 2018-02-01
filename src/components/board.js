import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Square} from './square/square'


const MINE = 99;

const adjacencies = [
  [-1,-1],[-1,0],[-1,1],
  [0,-1],[0,1],
  [1,-1],[1,0],[1,1],
];

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
      gameOver: false,
      flags: parseInt(this.props.mines)
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

  calculateWinner(){
    let result = this.state.squares.reduce( (prev, curr) => prev &&
    (curr.value !== MINE || curr.isFlaged));
    if(result){
      alert('GG WP');
    }
    return result;
  }


  handleClick(event, i) {
    // In that case, event.ctrlKey does the trick.
    const squares = [...this.state.squares];
    let flags = this.state.flags;
    let gameOver =  this.state.gameOver;
    if (squares[i].isOpen || gameOver) {
      return;
    }
    if (event.shiftKey) {
      squares[i].isFlaged = !squares[i].isFlaged;
      flags += squares[i].isFlaged? -1 : 1;
      gameOver = this.calculateWinner();
    }else{
    if(squares[i].value === MINE){
      //TODO Finish game
      this.setState({gameOver: true})
      alert("boom!")
    }
    squares[i].isOpen = true;
    this.openAdjacencies(i);

  }
    this.setState({squares: squares,flags:flags,gameOver:gameOver});
  }

  openAdjacencies(index){
    const squares = [...this.state.squares];
    let neibours = [];
    for (let i=0 ; i<adjacencies.length;i++){
      let adjacentCoudinates = adjacencies[i];
      let adjacent = index + adjacentCoudinates[0]* this.props.cols + adjacentCoudinates[1];
      if(squares[adjacent]){
        if( squares[adjacent].value===MINE){
          return;
        }
        neibours.push(adjacent);
      }
    }
    neibours.forEach((cell)=>this.handleClick({},cell));

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
        onClick={(e) => this.handleClick(e,i)}
        />
      );
    }

    render() {

      let status = this.state.flags;
      return (
        <div>
        <div className="status">{status}</div>
        {this.renderRows(this.props.rows, this.props.cols)}
        </div>
      );
    }
  }
