import React from 'react';
import ReactDOM from 'react-dom';
import './square.css';

export const Square = (props) => {
    return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
};
