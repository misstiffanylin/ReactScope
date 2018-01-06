import React, { Component } from 'react';
import { render } from 'react-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      phrase: "ciao"
    }
  }

  render() {
    return (
      <div>Hello World!!!! and {this.state.phrase}</div>
    );
  }
}

render(
  <App />,
  document.getElementById('app')
)