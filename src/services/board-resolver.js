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

const fillValues = (squares, cols) => {

    let cells = [...squares];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].value === MINE) {
            continue;
        }
        ADJACENCIES.map(adjacentCoordinates => {
            let adjacent = i + adjacentCoordinates[0] * cols + adjacentCoordinates[1];
            if (cells[adjacent] && cells[adjacent].value === MINE) {
                cells[i].value++;
            }
        });
    }
    return cells;
};


export const generateSquares = ({cols, rows, mines}) => {

    let squares = new Array(cols * rows).fill(null).map(() => {
        return {value: EMPTY_CELL, isOpen: false}
    });

    squares = fillMines(squares, mines);
    squares = fillValues(squares, cols);

    return squares;
};
