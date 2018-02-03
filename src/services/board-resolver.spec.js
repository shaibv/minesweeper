import React from 'react';
import ReactDOM from 'react-dom';
import {checkWinState,generateSquares} from './board-resolver'
import { MINE } from '../constans/consts';
import { expect } from 'chai';
import { moynt } from 'enzyme';

/*beforeEach(() => {
  let board = new board();  
});*/

const generateMockSquares = (flaged) => {

  let squares = new Array(5).fill(null).map(() => {
    return {value: MINE, isOpen: false,isFlaged:flaged}
  });

  return squares;
};

it('Method: calculateWinner - no win state', () => {
  const squares = generateMockSquares(false);
  expect(checkWinState(squares)).to.equal(false);
});


it('Method: calculateWinner -  win state', () => {
  const squares = generateMockSquares(true);
  expect(checkWinState(squares)).to.equal(true);
});

it('Method: generateSquares - generates squares correctly', () => {
  const mines = 10;
  const rows = 10;
  const cols = 10;
  const squares = generateSquares({cols,rows,mines});
  const minedSquares = squares.filter(square =>square.value === MINE );
  expect(squares).to.be.an('array') ;
  expect(squares.length).to.equal(cols * rows) ;
  expect(minedSquares.length).to.equal(mines) ;
});


