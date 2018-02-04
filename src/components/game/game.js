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
        let gameOver = this.state.gameOver;
        const square = squares[index];
        if (square.isOpen || gameOver) {
            return;
        }

        if (event.shiftKey) {
            this.putFlag(index);
        } else {
            if (square.isFlaged) {
                return;
            }
            if (square.value === MINE) {
                this.fallOnMine(index);
            } else {
                this.openSquare(index);
            }
        }
        this.setState({squares: squares});
    };

    openSquare = index => {
        const squares = [...this.state.squares];
        if (squares[index].isOpen || squares[index].isFlaged) {
            return;
        }
        squares[index].isOpen = true;
        if (!squares[index].value) {
            this.openAdjacencies(index);
        }
    };

    fallOnMine = index => {
        const squares = [...this.state.squares];
        squares[index].isOpen = true;
        this.setState({gameOver: true});
        alert("boom!");
    };

    putFlag = index => {
        const squares = [...this.state.squares];
        let flags = this.state.flags;
        if (!squares[index].isFlaged && flags === 0) {
            alert('No more flags');
            return ''
        }
        squares[index].isFlaged = !squares[index].isFlaged;
        flags += squares[index].isFlaged ? -1 : 1;
        const gameOver = checkWinState(squares);
        this.setState({
            flags: flags,
            gameOver: gameOver
        })
    };

    openAdjacencies = index => {
        const {cols , rows} = this.state.configuration;
        let row = Math.floor(index / cols);
        let col = index % cols;
        ADJACENCIES.forEach(adjacentCoordinates => {
            let adjacentRow = row + adjacentCoordinates[0];
            let adjacentCol = col + adjacentCoordinates[1];
            let adjacentIndex = adjacentRow * cols + adjacentCol;
            if (adjacentRow > -1 && adjacentCol > -1 && adjacentCol < cols && adjacentRow < rows) {
                this.openSquare( adjacentIndex);
            }
        });
    };


    render() {
        return (
            <div className="game">
                <Configuration initialConfig={this.defaultBoardConfiguration}
                               startGame={configuration => this.handleStartGame(configuration)}/>
                <div className="game-board">
                    <div className="status">
                        <i className="fas fa-flag"></i> left: {this.state.flags}
                    </div>
                    <Board {...this.state} onCellClick={this.handleClick}/>
                </div>
                <div className="game-info">
                </div>
            </div>
        );
    }
}
