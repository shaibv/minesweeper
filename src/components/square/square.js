import React from 'react';
import ReactDOM from 'react-dom';


import './square.css';


export const Square = (props) => {
  let square = props.value;
    const klass = square.isOpen? 'square open' : 'square';
    const value = square.isFlaged? '$' : square.isOpen && square.value ? square.value : ''
    return (
      <button className={klass} onClick={(e) => props.onClick(e)}>
        {value}
      </button>
    );
};
