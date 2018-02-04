import { SquareDriver } from './Square.driver';
import { expect } from 'chai';

let squareDriver;

beforeEach(() => {
  squareDriver = new SquareDriver();
});

it('Square hide value of closed Square', () => {
  squareDriver.setCellValue('2');
  squareDriver.setIsOpen(false);
  squareDriver.render();
  expect(squareDriver.getCellText()).to.equal('');
});


it('Square show value of open Square', () => {
  squareDriver.setCellValue('2');
  squareDriver.setIsOpen(true);
  squareDriver.render();
  expect(squareDriver.getCellText()).to.equal('2');
});