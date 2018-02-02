import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      cols: 10,
      mines: 10
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    const name = target.name;

    this.setState({
      [name]: parseInt(target.value)
    });
  }

  render() {
    return (
      <div>
      <label>
        Number of columns:
        <input
          name="cols"
          type="number"
          value={this.state.cols}
          onChange={this.handleInputChange} />
      </label>
        <br/>
        <label>
          Number of rows:
          <input
            name="rows"
            type="number"
            value={this.state.rows}
            onChange={this.handleInputChange} />
        </label>
        <br/>
        <label>
          Number of mines:
          <input
            name="mines"
            type="number"
            value={this.state.mines}
            onChange={this.handleInputChange} />
        </label>
        <button onClick={() => this.props.startGame(this.state)}>Start Game</button>
      </div>
    );
  }
}
