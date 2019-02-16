import React, {Component} from 'react';

// --this component is responsable for the nav bar
export default class Welcome extends Component {  
  render() {
    return (
      <div>
        <h1 className="navbar">Chatty</h1>
        <h4 className="counter"> {this.props.argm.userCounter} users connected</h4>
      </div>
    );
  }
}