import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Board} from './../board/board';
import {Configuration} from './../form/form';
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
            if(!squares[i].isFlaged && flags===0){
                alert('No more flags');
                return''
            }
            squares[i].isFlaged = !squares[i].isFlaged;
            flags += squares[i].isFlaged ? -1 : 1;
            gameOver = checkWinState(squares);
        } else {
            if(squares[i].isFlaged){
                return;
            }
            squares[i].isOpen = true;
            if (squares[i].value === MINE) {
                this.setState({gameOver: true});
                alert("boom!");
                return;
            } else {
                if(!squares[i].value) {
                    this.openAdjacencies(i)
                }
            }
        }
        this.setState({squares: squares, flags: flags, gameOver: gameOver});
    }

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
        neighbours.forEach((cell)=>this.handleClick({}, cell));

    }

    render() {
        return (
            <div className="game">
                <Configuration startGame={configuration => this.handleStartGame(configuration)}/>
                <div className="game-board">
                    <Board {...this.state} onCellClick={this.handleClick}/>
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}
