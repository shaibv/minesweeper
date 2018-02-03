import React from 'react';
import ReactDOM from 'react-dom';
import {MINE} from '../../constans/consts'

import './square.css';


export const Square = (props) => {
    let square = props.value;
    const klass = square.isOpen ? 'square open' : 'square';
    let value = square.isFlaged ? (<i class="fas fa-flag"></i>) : square.isOpen && square.value || props.superman ? square.value : '';
    value = value === MINE ? (<i class="fas fa-bomb"></i>) : value;
    return (
        <button key={props.index} className={klass} onClick={(e) => props.onClick(e)}>
            {value}
        </button>
    );
};
