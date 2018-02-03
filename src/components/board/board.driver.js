import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import { Board } from './board';

export class BoardDriver {
    props;
    wrapper:ReactWrapper;

    constructor() {
        const config = {rows: 10, cols: 10, mines: 10};
        this.props = {
            configuration: config,
            squares: [{value: 1, isOpen: false,isFlaged:false}],
            gameOver: false,
            flags: config.mines

        };
    }

    build() {
        this.wrapper = mount(<Board {...this.props}/>)
    }

    get = {
        text: () => this.wrapper.text(),
        state: () => this.wrapper.state()
    }

    given = {
        squares: (value) => this.props.squares = value

    }

}
