import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Board} from './board'
import {Configuration} from './form'

export class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      board: []
    };
  }

  handleStartGame = configuration => this.setState({board: configuration});

  render() {
    const board = [...this.state.board];
    return (
      <div className="game">
      <Configuration startGame={configuration => this.handleStartGame(configuration)}/>
      <div className="game-board">
        <Board board={board} />
      </div>
      <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
      </div>
      </div>
    );
  }
}
