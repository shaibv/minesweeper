import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const MINE = 99;

export class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      cols: 10,
      mines: 25
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }
  
  buildInitialBoardFromConfig() {
    let board = [];
    for(let i=0;i<this.state.cols * this.state.rows + 1;i++){
      board.push({value:0,isOpen:false})
    }

    board = this.fillMines(board);
    board = this.fillValues(board);
    this.props.startGame(board);
  }

  fillMines(squares) {

    let cells = [...squares];
    for (let i=0 ; i< this.state.mines;i++){
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
        let adjacent = i + adjacentCoudinates[0]* this.state.cols + adjacentCoudinates[1];
        if(cells[adjacent] && cells[adjacent].value===MINE){
          cells[i].value++;
        }
      }
    }
    return cells;
  }

  render() {
    return (
      <div>
      <label>
        Number of columns:
        <input
          name="cols"
          type="number"
          value={this.state.cols}
          onChange={this.handleInputChange} />
      </label>
        <br/>
        <label>
          Number of rows:
          <input
            name="rows"
            type="number"
            value={this.state.rows}
            onChange={this.handleInputChange} />
        </label>
        <br/>
        <label>
          Number of mines:
          <input
            name="mines"
            type="number"
            value={this.state.mines}
            onChange={this.handleInputChange} />
        </label>
        <button onClick={() => this.buildInitialBoardFromConfig()}>Start Game</button>
      </div>
    );
  }
}
