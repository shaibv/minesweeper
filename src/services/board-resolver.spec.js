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

it('should create a board with no mines with the supplied dimensions', () => {
  let boardConfig = {
    cols: 2,
    rows: 1,
    mines: 0
  };
  let expectedBoard = [{ value: 0, isOpen: false }, { value: 0, isOpen: false }];
  let board = generateSquares(boardConfig);
  expect(board).to.deep.equal(expectedBoard);
});

it('should create a board with unrevealed sqaures', () => {
  let boardConfig = {
    cols: 1,
    rows: 1,
    mines: 0
  };
  let board = generateSquares(boardConfig);
  expect(board[0].isOpen).to.be.false;
});

it('should create a board with supplied mines', () => {
  let boardConfig = {
    cols: 1,
    rows: 1,
    mines: 1
  };
  let board = generateSquares(boardConfig);
  expect(board[0].value).to.equal(MINE);
});

it('should calculate ajustents mine ', () => {
  let boardConfig = {
    cols: 2,
    rows: 2,
  };
  let expectedBoard = [{ value: 1, isOpen: false }, { value: 1, isOpen: false }, { value: 1, isOpen: false }, { value: MINE, isOpen: false }];
  let board = generateSquares(boardConfig);
  console.log(board);
  expect(board).to.include.members(expectedBoard);
});






