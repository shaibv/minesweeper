import React from 'react';
import ReactDOM from 'react-dom';
import { Board } from './board';
import { BoardDriver } from './board.driver';
import { MINE } from '../../constans/consts';
import { expect } from 'chai';
import { mount } from 'enzyme';

/*beforeEach(() => {
  let board = new board();  
});*/

const generateSquares = (flaged) => {

  let squares = new Array(5).fill(null).map(() => {
    return {value: MINE, isOpen: false,isFlaged:flaged}
  });

  return squares;
};

it('Check game state', () => {
  let board = new BoardDriver();
  board.given.squares(generateSquares(false));
  board.build();
  expect(board.get.state().gameOver).toBeFalsy();
});

it('check winner state', () => {
  let board = new BoardDriver();
  board.given.squares(generateSquares(true));
  board.build();
  expect(board.get.state().gameOver).toBeTruthy()
});