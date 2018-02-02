import React from 'react';
import ReactDOM from 'react-dom';
import { Square } from './square';
import { SquareDriver } from './Square.driver';
import { expect } from 'chai';
import { mount } from 'enzyme';

/*beforeEach(() => {
  let squareDriver = new SquareDriver();  
});*/

it('Hide Close Square', () => {
  let squareDriver = new SquareDriver();
  squareDriver.given.value({isOpen:false,value:'2'});
  squareDriver.build();
  expect(squareDriver.get.text()).to.equal('');
});

it('Show Open Square', () => {
  let squareDriver = new SquareDriver();
  squareDriver.given.value({isOpen:false,value:'2'});
  squareDriver.build();
  expect(squareDriver.get.text()).to.equal('2');
});