import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Square} from './square/square'
import {generateSquares} from './game-builder'
import {MINE , ADJACENCIES} from './consts'


export class Board extends React.Component {


    constructor(props) {
        super(props);
        this.configuration = this.props.configuration;
        let squares = generateSquares(this.configuration.cols, this.configuration.rows, this.configuration.mines);


        this.state = {
            squares: squares,
            gameOver: false,
            flags: parseInt(this.configuration.mines)
        };

    }

    calculateWinner() {
        let result = this.state.squares.reduce((prev, curr) => prev &&
        (curr.value !== MINE || curr.isFlaged));
        if (result) {
            alert('GG WP');
        }
        return result;
    }

    handleClick(event, i) {
        const squares = [...this.state.squares];
        let flags = this.state.flags;
        let gameOver = this.state.gameOver;

        if (squares[i].isOpen || gameOver) {
            return;
        }

        if (event.shiftKey) {
            squares[i].isFlaged = !squares[i].isFlaged;
            flags += squares[i].isFlaged ? -1 : 1;
            gameOver = this.calculateWinner();
        } else {
            if (squares[i].value === MINE) {
                this.setState({gameOver: true});
                alert("boom!");
                return;
            } else {
                this.openAdjacencies(i);
            }
            squares[i].isOpen = true;
        }
        this.setState({squares: squares, flags: flags, gameOver: gameOver});

    }


    openAdjacencies(index) {
        const squares = [...this.state.squares];
        let neibours = [];
        for (let i = 0; i < ADJACENCIES.length; i++) {
            let adjacentCoudinates = ADJACENCIES[i];
            let adjacent = index + adjacentCoudinates[0] * this.configuration.cols + adjacentCoudinates[1];
            if (squares[adjacent]) {
                if (squares[adjacent].value === MINE) {
                    return;
                }
                neibours.push(adjacent);
            }
        }
        neibours.forEach((cell)=>this.handleClick({}, cell));

    }

    renderRows(rows, cols) {
        let res = [];
        for (let i = 0; i < rows; i++) {
            res.push (this.renderRow(i, cols))
        }
        return res;
    }

    renderRow(index, size) {
        let res = [];
        for (let i = 1; i <= size; i++) {
            res.push (this.renderSquare(size * index + i));
        }
        return (
            <div className="board-row">
                {res}
            </div>);
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                superman={this.state.configuration.superman}
                onClick={(e) => this.handleClick(e,i)}
            />
        );
    }

    render() {

        let status = this.state.flags;
        return (
            <div>
                <div className="status">{status}</div>
                {this.renderRows(this.configuration.rows, this.configuration.cols)}
            </div>
        );
    }
}
