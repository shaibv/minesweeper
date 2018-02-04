import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import { Square } from './Square';

export class SquareDriver {
  props;
  component: ReactWrapper;

  constructor() {
    this.props = {
      value: {

      }
    };
  }
  
  render() {
    this.component = mount(<Square {...this.props}/>)  
  }

  getCellText = () =>  this.component.text();
  setCellValue = cellValue => this.props.value.value = cellValue;
  setIsOpen = isOpen => this.props.value.isOpen = isOpen;
}
