import React from 'react';
import ReactDOM from 'react-dom';
import { Square } from './square';
import { SquareDriver } from './Square.driver';
import { expect } from 'chai';
import { mount } from 'enzyme';

/*beforeEach(() => {
  let squareDriver = new SquareDriver();  
});*/

it('Square hide value of closed Square', () => {
  let squareDriver = new SquareDriver();
  squareDriver.given.value('2');
  squareDriver.given.isOpen(false);
  squareDriver.build();
  expect(squareDriver.get.text()).to.equal('');
});


it('Square show value of open Square', () => {
  let squareDriver = new SquareDriver();
  squareDriver.given.value('2');
  squareDriver.given.isOpen(true);
  squareDriver.build();
  expect(squareDriver.get.text()).to.equal('2');
});