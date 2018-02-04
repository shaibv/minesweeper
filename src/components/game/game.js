import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Board} from './../board/board';
import {Configuration} from './../config/config';
import {generateSquares, checkWinState} from '../../services/board-resolver';
import {MINE, ADJACENCIES} from '../../constans/consts';

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

    handleClick = (event, index) => {
        const squares = [...this.state.squares];
        let flags = this.state.flags;
        let gameOver = this.state.gameOver;
        const square = squares[index];
        if (square.isOpen || gameOver) {
            return;
        }

        if (event.shiftKey) {
            if (!square.isFlaged && flags === 0) {
                alert('No more flags');
                return;
            }
            square.isFlaged = !square.isFlaged;
            flags += square.isFlaged ? -1 : 1;
            gameOver = checkWinState(squares);
        } else {
            if (square.isFlaged) {
                return;
            }
            square.isOpen = true;
            if (square.value === MINE) {
                this.setState({gameOver: true});
                alert("BOOM!");
                return;
            } else {
                if (!square.value) {
                    this.openAdjacencies(index,this.state.configuration.rows, this.state.configuration.cols);
                }
            }
        }
        this.setState({squares: squares, flags: flags, gameOver: gameOver});
    }

    openAdjacencies = (index, rows, cols) => {
        let row = Math.floor(index / cols);
        let col = index % cols;
        ADJACENCIES.map(adjacentCoordinates => {
            let adjacentRow = row + adjacentCoordinates[0];
            let adjacentCol = col + adjacentCoordinates[1];
            let adjacentIndex = adjacentRow * cols + adjacentCol;
            if (adjacentRow > -1 && adjacentCol > -1 && adjacentCol < cols && adjacentRow < rows) {
                this.handleClick({}, adjacentIndex);
            }
        });
    }


    render() {
        return (
            <div className="game">
                <Configuration initialConfig={this.defaultBoardConfiguration}
                               startGame={configuration => this.handleStartGame(configuration)}/>
                <div className="game-board">
                    <Board {...this.state} onCellClick={this.handleClick}/>
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}
