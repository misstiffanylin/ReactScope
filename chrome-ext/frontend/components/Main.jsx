import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

const Main = (props) => (
<div>
	<h1>Hello from react</h1>;
	<h2>Name: {props.name}</h2>
	<h2>State: {props.state}</h2>
	<h2>Props: {props.props}</h2>
	<h3>Hello</h3>
</div>
)

// const Main = () => <h1>Hello from react</h1>;


class Main extends Component {

  constructor(props) {
    super(props);    
    this.state = {
      message: 'hey there from Main Component!'
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    window.addEventListener('message', (event) => {
      console.log('inside of addEventListener')
      console.log('event: ', event)
      // if (event.origin === "chrome-extension://gipfpnbcdiknjomlnphmckabkmoeebon") { //how do you get this?
      if (event.origin === "chrome-extension://" + chrome.runtime.id) { //how do you get this?
      console.log("from React: ", event.data)
        this.setState({
          message: "the first component is  " + event.data.data[0].name
        })
      }
    })
  }

  render() {
    return (
      <h1>Hello from React AND {this.state.message}</h1>
    )
  }
}

export default Main;

