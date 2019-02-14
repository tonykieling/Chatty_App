require("../styles/home.scss")
import React, {Component} from 'react';

export default class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.createNewMessage = this.createNewMessage.bind(this);
    this.setsUserName = this.setsUserName.bind(this);
  }

  createNewMessage(event) {
    if(event.key==="Enter"){
      const msg = {
        // userName: this.props.user,
        content: event.target.value
      };

      // Send the msg object as a JSON-formatted string.
      console.log("msg: ", msg);
      this.props.sendMessage(msg);
      event.target.value = "";
    }
  }

  setsUserName(event) {
    console.log("hererree", event.target.value);
    this.props.setsUser(event.target.value);
  }







  render () {
    return (
      <div className="chatbar">
          <input className="chatbar-username" type="text" name="userName"
            placeholder="user name"
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
