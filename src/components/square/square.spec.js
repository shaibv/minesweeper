import React from 'react';
import ReactDOM from 'react-dom';
import { Square } from './square';
import { SquareDriver } from './Square.driver';
import { expect } from 'chai';
import { mount } from 'enzyme';

/*beforeEach(() => {
  let squareDriver = new SquareDriver();  
});*/

it('renders without crashing', () => {
  let squareDriver = new SquareDriver();
  squareDriver.given.value("bla bla");
  squareDriver.build();
  expect(squareDriver.get.text()).to.equal("bla bla");
});