import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import { Square } from './Square';

export class SquareDriver {
  props;
  component: ReactWrapper;

  constructor() {
    this.props = {

    };
  }
  
  render() {
    this.component = mount(<Square {...this.props}/>)  
  }

  getCellText = () =>  this.component.text();
  setCellValue = cellValue => this.props.value = cellValue;
  setIsOpen = isOpen => this.props.isOpen = isOpen;
}
