import React from 'react';
import ReactDOM from 'react-dom';


import './square.css';


export const Square = (props) => {
    const klass = 'square' + props.isOpen? ' open' : '';
    return (
      <button className={klass} className="square" onClick={() => props.onClick()}>
        {props.value.value}
      </button>
    );
};
