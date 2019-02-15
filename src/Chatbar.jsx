require("../styles/home.scss")
import React, {Component} from 'react';

export default class Chatbar extends Component {
  constructor(props) {
    super(props);
    console.log("props: ", this.props);
    this.createNewMessage = this.createNewMessage.bind(this);
    this.setsUserName = this.setsUserName.bind(this);
  }

  createNewMessage(event) {
    if(event.key==="Enter"){
      const message = {
        type: "postMsg",
        content: event.target.value
      }
      // this.props.sendMessage(event.target.value);
      this.props.sendMessage(message);
      event.target.value = "";
    }
  }

  setsUserName(event) {
    // IncomingNotf
    console.log("PROPS: ", this.props);
    let currentUser = event.target.value;
    if (currentUser !== this.props.user) {
      console.log("DIFFFFF NAMES");
      (currentUser === "") ? currentUser = "Anonymous" : "";
      const message = {
        type: "postNotification",
        content: `${this.props.user} changed their name to ${currentUser}`
      }
      this.props.sendMessage(message);
    }
    this.props.setsUser(currentUser);
  }

  render () {
    return (
      <div className="chatbar">
          <input className="chatbar-username" type="text" name="userName"
            defaultValue={this.props.user}
            onBlur = {this.setsUserName}  />
          <input className="chatbar-message" 
            placeholder="Type a message and hit ENTER" 
            name="content"
            onKeyPress = {this.createNewMessage}
             />
      </div>
    )
  }
}
