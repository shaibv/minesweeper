import { SquareDriver } from './Square.driver';
import { expect } from 'chai';

let squareDriver;

beforeEach(() => {
  squareDriver = new SquareDriver();
});

it('Square hide value of closed Square', () => {
  squareDriver.given.value('2');
  squareDriver.given.isOpen(false);
  squareDriver.build();
  expect(squareDriver.get.text()).to.equal('');
});


it('Square show value of open Square', () => {
  squareDriver.given.value('2');
  squareDriver.given.isOpen(true);
  squareDriver.build();
  expect(squareDriver.get.text()).to.equal('2');
});