import {checkWinState,generateSquares} from './board-resolver'
import { MINE } from '../constans/consts';
import { expect } from 'chai';

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
  const board = generateMockSquares(false);
  expect(checkWinState(board)).to.equal(false);
});


it('Method: calculateWinner -  win state', () => {
  const board = generateMockSquares(true);
  expect(checkWinState(board)).to.equal(true);
});

it('Method: generateSquares - generates squares correctly', () => {
  const mines = 10;
  const rows = 10;
  const cols = 10;
  const board = generateSquares({cols,rows,mines});
  const minedSquares = board.filter(square =>square.value === MINE );
  expect(board).to.be.an('array') ;
  expect(board.length).to.equal(cols * rows) ;
  expect(minedSquares.length).to.equal(mines) ;
});

it('Method: generateSquares - should create a board with no mines with the supplied dimensions', () => {
  const boardConfig = {
    cols: 2,
    rows: 1,
    mines: 0
  };
  let expectedBoard = [{ value: 0, isOpen: false }, { value: 0, isOpen: false }];
  let board = generateSquares(boardConfig);
  expect(board).to.deep.equal(expectedBoard);
});

it('Method: generateSquares - should create a board with unrevealed squares', () => {
  const boardConfig = {
    cols: 1,
    rows: 1,
    mines: 0
  };
  const board = generateSquares(boardConfig);
  expect(board[0].isOpen).to.be.false;
});

it('Method: generateSquares - should create a board with supplied mines', () => {
  const boardConfig = {
    cols: 1,
    rows: 1,
    mines: 1
  };
  const board = generateSquares(boardConfig);
  expect(board[0].value).to.equal(MINE);
});

it('Method: generateSquares - should calculate adjacent mine ', () => {
  const boardConfig = {
    cols: 2,
    rows: 2,
    mines:1
  };
  const board = generateSquares(boardConfig);
  expect(board.filter(square=>square.value===1).length).to.equal(3)
});






