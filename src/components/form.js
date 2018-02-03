import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 10,
            cols: 10,
            mines: 10,
            superman: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let value;
        if (target.type === 'checkbox') {
            value = target.checked;
        } else {
            value = parseInt(Math.min(target.max, target.value));
        }
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <label>
                    Superman Mode:
                    <input
                        name="superman"
                        type="checkbox"
                        checked={this.state.superman}
                        onChange={this.handleInputChange}/>
                </label>
                <label>
                    Number of columns:
                    <input
                        name="cols"
                        type="number"
                        max="300"
                        value={this.state.cols}
                        onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    Number of rows:
                    <input
                        name="rows"
                        type="number"
                        max="300"
                        value={this.state.rows}
                        onChange={this.handleInputChange}/>
                </label>
                <br/>
                <label>
                    Number of mines:
                    <input
                        name="mines"
                        type="number"
                        max={this.state.cols * this.state.rows /3 }
                        value={this.state.mines}
                        onChange={this.handleInputChange}/>
                </label>
                <button onClick={() => this.props.startGame(this.state)}>Start Game</button>
            </div>
        );
    }
}
