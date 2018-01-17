import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';


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
      console.log(event)
      if (event.origin === "chrome-extension://gipfpnbcdiknjomlnphmckabkmoeebon") { //how do you get this?
      console.log(event.data)
        this.setState({
          message: "new message " + event.data.message
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
