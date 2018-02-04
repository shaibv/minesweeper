import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Board} from './../board/board';
import {Configuration} from './../config/config';
import {generateSquares,checkWinState} from '../../services/board-resolver';
import {MINE,ADJACENCIES} from '../../constans/consts';

export class Game extends React.Component {
    defaultBoardConfiguration = {rows: 10, cols: 10, mines: 20, superman: false};

    constructor() {
        super();
        this.state = {
          configuration: this.defaultBoardConfiguration,
          squares: generateSquares(this.defaultBoardConfiguration),
          gameOver: false,
          flags: this.defaultBoardConfiguration.mines
      };
    }

    handleStartGame = configuration => {
      let squares = generateSquares(configuration);
      this.setState({
        configuration: configuration,
        squares: squares,
        gameOver: false,
        flags: configuration.mines
      });
    };

    handleClick = (event, i) => {
        const squares = [...this.state.squares];
        let flags = this.state.flags;
        let gameOver = this.state.gameOver;

        if (squares[i].isOpen || gameOver) {
            return;
        }

        if (event.shiftKey) {
          this.putFlag(i);
        } else {
            if(squares[i].isFlaged){
                return;
            }
            if (squares[i].value === MINE) {
                this.fallOnMine(i);
                return;
            } else {
              this.openSquare(i);
            }
        }
        this.setState({squares: squares, flags: flags, gameOver: gameOver});
    };

    openSquare = (i) => {
      const squares = [...this.state.squares];
      if (squares[i].isOpen || squares[i].isFlaged) {
        return;
      }
      squares[i].isOpen = true;
        if(!squares[i].value) {
          this.openAdjacencies(i);
      }
    };

    fallOnMine = cellIndex => {
      const squares = [...this.state.squares];
      squares[cellIndex].isOpen = true;
      this.setState({gameOver: true});
      alert("boom!");
    };

    putFlag = cellIndex => {
      const squares = [...this.state.squares];
      let flags = this.state.flags;
      let gameOver = this.state.gameOver;
      if(!squares[cellIndex].isFlaged && flags===0){
        alert('No more flags');
        return''
      }
      squares[cellIndex].isFlaged = !squares[cellIndex].isFlaged;
      flags += squares[cellIndex].isFlaged ? -1 : 1;
      gameOver = checkWinState(squares);
      this.setState({
        gameOver: gameOver  
      })
    };

    openAdjacencies = (index) => {
        const squares = [...this.state.squares];
        let neighbours = [];
        for (let i = 0; i < ADJACENCIES.length; i++) {
            let adjacentCoordinates = ADJACENCIES[i];
            let adjacent = index + adjacentCoordinates[0] * this.state.configuration.cols + adjacentCoordinates[1];
            if (squares[adjacent]) {
                if (squares[adjacent].value === MINE) {
                    return;
                }
                neighbours.push(adjacent);
            }
        }
        neighbours.forEach( cellIndex => this.openSquare(cellIndex));
    };

    render() {
        return (
            <div className="game">
                <Configuration initialConfig={this.defaultBoardConfiguration} startGame={configuration => this.handleStartGame(configuration)}/>
                <div className="game-board">
                    <Board {...this.state} onCellClick={this.handleClick}/>
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}
