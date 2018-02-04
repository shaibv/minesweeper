import React from 'react';
import ReactDOM from 'react-dom';
import {MINE} from '../../constans/consts';
import {bomb} from '../icons/mine';
import {flag} from '../icons/flag';
import PropTypes from 'prop-types';
import './square.css';

export const Square = (props) => {
    const className = props.isOpen ? 'square open' : 'square';
    let value = props.isFlaged ? flag() : props.isOpen && props.value || props.superman ? props.value : '';
    value = value === MINE ? bomb() : value;
    return (
        <button className={className} onClick={(e) => props.onClick(e)}>
            {value}
        </button>
    );
};

Square.propTypes = {
    isOpen: PropTypes.bool,
    isFlaged: PropTypes.bool,
    value: PropTypes.string,
    onClick: PropTypes.func
};