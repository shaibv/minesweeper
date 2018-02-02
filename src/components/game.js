import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Board} from './board'
import {Configuration} from './form'

export class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            configuration: {rows: 10, cols: 10, mines: 10, superman: false}
        };
    }


    handleStartGame = configuration => this.setState({configuration: configuration});

    render() {
        const configuration = {
            rows: this.state.configuration.rows,
            cols: this.state.configuration.cols,
            mines: this.state.configuration.mines,
            superman: this.state.configuration.superman
        };

        return (
            <div className="game">
                <Configuration startGame={configuration => this.handleStartGame(configuration)}/>
                <div className="game-board">
                    <Board configuration={configuration}/>
                </div>
                <div className="game-info">

                </div>
            </div>
        );
    }
}
