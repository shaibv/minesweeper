import React from 'react';
import ReactDOM from 'react-dom';
import s from './square.scss';

export const Square = (props) => {
    return (
      <button class={s.square} className="square" onClick={() => props.onClick()}>
        {props.value.value}
      </button>
    );
};
