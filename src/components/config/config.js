import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './config.css'

export class Configuration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.initialConfig.rows,
            cols: props.initialConfig.cols,
            mines: props.initialConfig.mines,
            superman: props.initialConfig.superman
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

                <label>
                    Number of rows:
                    <input
                        name="rows"
                        type="number"
                        max="300"
                        value={this.state.rows}
                        onChange={this.handleInputChange}/>
                </label>

                <label>
                    Number of mines:
                    <input
                        name="mines"
                        type="number"
                        max={this.state.cols * this.state.rows /3 }
                        value={this.state.mines}
                        onChange={this.handleInputChange}/>
                </label>
                <button className="start-btn" onClick={() => this.props.startGame(this.state)}>Start Game</button>
            </div>
        );
    }
}
