import React, {Component} from 'react';

// --component responsable for apply the html markup for each message received from MessageList component
export default class Message extends Component {
  render() {

    // --check message's type (notification or normal message), in order to be displayed in the correct way
    if (this.props.message.type === "IncomingMsg")  {

      return (
        <div>
          <div className="message">
            <span className="message-username">{this.props.message.user}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
          <div className="message system">
          </div>
        </div>
      );

    } else {
      return (
        <div className="notification">
          <span className="notification-content">{this.props.message.content}</span>
        </div>
      );
    }

  }
}

