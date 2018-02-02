import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import { Square } from './Square';

export class SquareDriver {
  props;
  wrapper: ReactWrapper;

  constructor() {
    this.props = {

    };
  }

  build() {
    this.wrapper = mount(<Square {...this.props}/>)
  }

  get = {
    text: () => this.wrapper.text()
  }

  given = {
    value: (value) => this.props.value = value
  }

}
