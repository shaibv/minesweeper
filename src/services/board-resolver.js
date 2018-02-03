import {MINE , ADJACENCIES} from '../constans/consts';
import {fill, sampleSize} from 'lodash';

const fillMines = square => {
  return square.value = MINE;
};

const fillAdjacenties = (square, i, array, cols) => {
  if(square.value === MINE) {
    return square;
  }
  ADJACENCIES.forEach(adjacentcy => {
    let adjacentIndex = i + adjacentcy[0]* cols + adjacentcy[1];
    if(array[adjacentIndex] && array[adjacentIndex].value === MINE) {
      array[i].value++;
    }
  });
};

export const generateSquares = ({cols, rows, mines}) => {
  let squares = new Array(cols * rows).fill(null).map(() => {return {value: 0, isOpen: false}});
  sampleSize(squares, mines).map(fillMines).forEach((square, i, array) => fillAdjacenties(square, i, array, cols));
  return squares;
};