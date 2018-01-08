import React, { Component } from 'react';
import { render } from 'react-dom';
// import { getInstance } from './hook';


class App extends Component {
  constructor() {
    super();
    this.state = {
      phrase: "ciao",
      data: {},
    }
  }

  componentDidMount() {
    const instance = window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers;
    const info = JSON.parse(JSON.stringify(instance));
    this.setState({ data: info });
  }

  render() {
    return (
      <div>
        <h1>Hello World!!!! and {this.state.phrase}</h1>
        <p>{ this.state.data }</p>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('app')
)