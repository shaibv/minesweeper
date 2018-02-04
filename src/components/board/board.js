import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Square} from './../square/square'
import './board.css';
import PropTypes from 'prop-types';


export class Board extends React.Component {
    constructor(props) {
        super(props);
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
            <div className="board-row" key={index}>
                {res}
            </div>);
    }

    renderSquare(i) {
        return (
            <Square
                key={i}
                isOpen={this.props.squares[i].isOpen}
                isFlagged={this.props.squares[i].isFlagged}
                value={this.props.squares[i].value}
                superman={this.props.configuration.superman}
                onClick={(e) => this.props.onCellClick(e,i)}
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderRows(this.props.configuration.rows, this.props.configuration.cols)}
            </div>
        );
    }
}

Board.propTypes = {
    squares: PropTypes.array.isRequired,
    configuration: PropTypes.object.isRequired,
    onCellClick: PropTypes.func.isRequired
};
