import React, {Component} from 'react';
import Message from "./Message.jsx"

// --this component deals with the list of messages,
// taking the array's list and sending each one to the Message component, which will assembly the html format.
// After that, the elements are displayed on the screen.
export default class MessageList extends Component {
  render() {

    // --here, allMessages is gonna be an array with all items to be displayed
    let allMessages = this.props.messages.map((message) => {
      return <Message key={message.id} message={message} />
    });
    return (
      <div className="messages">
        {allMessages}
      </div>
    )
  }
}

