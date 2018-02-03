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

const fillCellValue = (cell, index, cells, cols) => {
    if (cell.value !== MINE) {
        ADJACENCIES.map(adjacentCoordinates => {
            let adjacent = index + adjacentCoordinates[0] * cols + adjacentCoordinates[1];
            if (cells[adjacent] && cells[adjacent].value === MINE) {
                cell.value++;
            }
        });
    }
    return cell;
}


export const generateSquares = ({cols, rows, mines}) => {

    let squares = new Array(cols * rows).fill(null).map(() => {
        return {value: EMPTY_CELL, isOpen: false}
    });

    squares = fillMines(squares, mines).map((cell, i) => fillCellValue(cell,i, squares,cols));

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
