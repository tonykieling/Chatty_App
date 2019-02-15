import React, {Component} from 'react';

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