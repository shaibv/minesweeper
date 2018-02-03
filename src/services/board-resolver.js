import {MINE , ADJACENCIES, EMPTY_CELL} from '../constans/consts';

const fillMines = (squares, mines) => {
    let cells = [...squares];
    for (let i = 0; i < mines; i++) {
        let success = false;

        while (!success) {
            let randomIndex = Math.floor(Math.random() * cells.length);
            if (!cells[randomIndex].value) {
                success = true;
                cells[randomIndex].value = MINE;
            }
        }
    }
    return cells;
};

const fillCellValue = (cell, index, cells, rows, cols) => {
    let row = Math.floor(index / cols);
    let col = index % cols;
    if (cell.value !== MINE) {
        ADJACENCIES.map(adjacentCoordinates => {
            let adjacentRow = row + adjacentCoordinates[0];
            let adjacentCol = col + adjacentCoordinates[1];
            let adjacentIndex = adjacentRow * cols + adjacentCol;
            if (adjacentRow > -1 && adjacentCol > -1 && adjacentCol < cols && adjacentRow < rows && cells[adjacentIndex].value === MINE) {
                cell.value++;
            }
        });
    }
    return cell;
};


export const generateSquares = ({cols, rows, mines}) => {

    let squares = new Array(cols * rows).fill(null).map(() => {
        return {value: EMPTY_CELL, isOpen: false}
    });

    squares = fillMines(squares, mines).map((cell, i) => fillCellValue(cell, i, squares, rows, cols));

    return squares;
};


export const checkWinState = (squares) => {
    let result = squares.reduce((prev, curr) => prev &&
    (curr.value !== MINE || curr.isFlaged));
    if (result) {
        alert('You Win, GG WP!');
    }
    return result;
};
