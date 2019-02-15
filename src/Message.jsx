import React, {Component} from 'react';

export default class Message extends Component {
  render() {

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

