import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Configuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfRows: 10,
      numberOfCols: 10,
      numberOfMines: 25,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  render() {
    return (
      <div>
      <label>
        Number of columns:
        <input
          name="numberOfCols"
          type="number"
          value={this.state.numberOfCols}
          onChange={this.handleInputChange} />
      </label>
        <br/>
        <label>
          Number of rows:
          <input
            name="numberOfRows"
            type="number"
            value={this.state.numberOfRows}
            onChange={this.handleInputChange} />
        </label>
        <br/>
        <label>
          Number of mines:
          <input
            name="numberOfMines"
            type="number"
            value={this.state.numberOfMines}
            onChange={this.handleInputChange} />
        </label>
        <button onClick={() => this.props.update(this.state)}>Start Game</button>
      </div>
    );
  }
}
