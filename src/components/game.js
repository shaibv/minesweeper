import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Board} from './board'

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
      <div className="game-board">
      <Board rows='6' cols='18' />
      </div>
      <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
      </div>
      </div>
    );
  }
}
