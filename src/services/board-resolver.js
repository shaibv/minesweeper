import {MINE , ADJACENCIES, EMPTY_CELL} from '../constans/consts';
import {fill, sampleSize} from 'lodash';

const fillMines = (square, mineValue) => {
  return square.value = mineValue;
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

const getInitialFillValues = mines => {
  let initialValues = {
    emptyCell: EMPTY_CELL,
    mine: MINE
  };
  if (mines > 50) {
    initialValues.emptyCell = MINE;
    initialValues.mine = EMPTY_CELL;
  }
  return initialValues;
};

export const generateSquares = ({cols, rows, mines}) => {
  const initialValues = getInitialFillValues(mines);
  let squares = new Array(cols * rows).fill(null).map(() => {return {value: initialValues.emptyCell, isOpen: false}});
  sampleSize(squares, mines).map((sqaure) => fillMines(sqaure,initialValues.mine)).forEach((square, i, array) => fillAdjacenties(square, i, array, cols));
  return squares;
};