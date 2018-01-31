import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Board} from './board'
import {Configuration} from './form'

export class Game extends React.Component {



  handleStartGame(configuration){
      this.config = configuration;
  }

  render() {
    const board = this.config  ?   <Board rows={this.config.rows} cols={this.config.cols} mines={this.config.mines} /> :   <Board rows='6' cols='18' mines='20' />;
    return (
      <div className="game">
      <Configuration update="this.handleStartGame"/>
      <div className="game-board">
      {board}
      </div>
      <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
      </div>
      </div>
    );
  }
}
