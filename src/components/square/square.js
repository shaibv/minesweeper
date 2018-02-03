import React from 'react';
import ReactDOM from 'react-dom';
import {MINE} from '../../constans/consts'

import './square.css';


export const Square = (props) => {
    const className = props.isOpen ? 'square open' : 'square';
    let value = props.isFlaged ? (<i className="fas fa-flag"></i>) : props.isOpen && props.value || props.superman ? props.value : '';
    value = value === MINE ? (<i className="fas fa-bomb"></i>) : value;
    return (
        <button key={props.index} className={className} onClick={(e) => props.onClick(e)}>
            {value}
        </button>
    );
};
