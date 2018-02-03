import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Board} from './board';
import {Configuration} from './form';
import {generateSquares} from '../services/board-resolver';


export class Game extends React.Component {
    defaultBoardConfiguration = {rows: 10, cols: 10, mines: 10, superman: false};

    constructor() {
        super();
        this.state = {
          configuration: this.defaultBoardConfiguration,
          squares: generateSquares(this.defaultBoardConfiguration),
          gameOver: false,
          flags:0
      };
    }

    handleStartGame = configuration => {
      let squares = generateSquares(configuration);
      this.setState({
        configuration: configuration,
        squares: squares,
        gameOver: false,
        flags:0
      });
    };

    handleSquareClick = newState => this.setState(newState);

    render() {
        return (
            <div className="game">
                <Configuration startGame={configuration => this.handleStartGame(configuration)}/>
                <div className="game-board">
                    <Board {...this.state} onCellClick={this.handleSquareClick}/>
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}
