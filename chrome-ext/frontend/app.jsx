import React from 'react';
import { render } from 'react-dom';
import Main from './components/Main';

class Container extends Component {
  constructor(props) {
    super(props),
    this.state = {
      name: 'name data',
			state: 'state data',
			props: 'props data'
    }
	}
	
	render() {
    <Main />,
    document.getElementById('app'),
    const nameData = <Main name={this.state.name} />,
    const stateData = <Main state={this.state.state} />,
    const propsData = <Main props={this.state.props} />

    return (
      <div>
        {nameData},
        {stateData},
        {propsData}
      </div>
    )
  }

// render(
//   <Main />,
//   document.getElementById('app'),
// );
