import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Square} from './../square/square'
import './board.css';
import {generateSquares,checkWinState} from '../../services/board-resolver';
import {MINE , ADJACENCIES} from '../../constans/consts';


export class Board extends React.Component {
    constructor(props) {
        super(props);
    }



    handleClick(event, i) {
        const squares = [...this.props.squares];
        let flags = this.props.flags;
        let gameOver = this.props.gameOver;

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
            gameOver = checkWinState();
        } else {
            squares[i].isOpen = true;
            if (squares[i].value === MINE) {
                this.props.onCellClick({gameOver: true})
                alert("boom!");
                return;
            } else {
                if(!squares[i].value) {
                    this.openAdjacencies(i)
                };
            }
        }
        this.props.onCellClick({squares: squares, flags: flags, gameOver: gameOver});
    }


    openAdjacencies(index) {
        const squares = [...this.props.squares];
        let neibours = [];
        for (let i = 0; i < ADJACENCIES.length; i++) {
            let adjacentCoudinates = ADJACENCIES[i];
            let adjacent = index + adjacentCoudinates[0] * this.props.configuration.cols + adjacentCoudinates[1];
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
        for (let i = 0; i <= size-1; i++) {
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
                index={i}
                isOpen={this.props.squares[i].isOpen}
                isFlaged={this.props.squares[i].isFlaged}
                value={this.props.squares[i].value}
                superman={this.props.configuration.superman}
                onClick={(e) => this.handleClick(e,i)}
            />
        );
    }

    render() {
        let status = this.props.flags;
        return (
            <div>
                <div className="status"><i class="fas fa-flag"></i> left: {status} </div>
                {this.renderRows(this.props.configuration.rows, this.props.configuration.cols)}
            </div>
        );
    }
}
