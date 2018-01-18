import React from 'react';

const Main = (props) => (
<div>
	<h1>Hello from react</h1>;
	<h2>Name: {props.name}</h2>
	<h2>State: {props.state}</h2>
	<h2>Props: {props.props}</h2>
</div>
)

export default Main;

