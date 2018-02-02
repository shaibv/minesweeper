import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Square} from './square/square'
import {MINE , ADJACENCIES} from './consts'

const fillMines = (squares, mines) => {

  let cells = [...squares];
  for (let i=0 ; i< mines;i++){
    let success = false;

    while(!success){
      let randomIndex = Math.floor(Math.random() * cells.length);
      if(!cells[randomIndex].value){
        success = true;
        cells[randomIndex].value = MINE;
      }
    }
  }
  return cells;
}

const fillValues = (squares, cols) => {

  let cells = [...squares];
  for (let i=0 ; i<cells.length;i++){
    if(cells[i].value===MINE){
      continue;
    }
    for (let j=0 ; j<ADJACENCIES.length;j++){
      let adjacentCoudinates = ADJACENCIES[j];
      let adjacent = i + adjacentCoudinates[0]* cols + adjacentCoudinates[1];
      if(cells[adjacent] && cells[adjacent].value===MINE){
        cells[i].value++;
      }
    }
  }
  return cells;
}


export const generateSquares  = (cols,rows,mines) => {

    let squares = [];

    for(let i=0;i<=cols * rows ;i++){
      squares.push({value:0,isOpen:false})
    }

    squares = fillMines(squares, mines);
    squares = fillValues(squares, cols);

    return squares;

  }
