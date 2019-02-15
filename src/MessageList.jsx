import React, {Component} from 'react';
import Message from "./Message.jsx"


export default class MessageList extends Component {
  render() {
    // console.log("this is the message:: ", this.props.messages);
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

