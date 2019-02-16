require("../styles/home.scss")
import React, {Component} from 'react';

// --this component is responsable for the Chatbar,  name and message editable fields
export default class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.createNewMessage = this.createNewMessage.bind(this);
    this.setsUserName = this.setsUserName.bind(this);
  }

  // --function to deal with 'enter' typing which triggers the sendMessage method received from the APP component  
  createNewMessage(event) {
    if(event.key==="Enter"){
      const message = {
        type: "postMsg",
        content: event.target.value
      }
      this.props.sendMessage(message);
      event.target.value = "";
    }
  }

  // --function to deal with user's change name and which triggers the sendMessage (method received from the APP component)
  // it's applied only if there is a user's name changing.  
  setsUserName(event) {
    let currentUser = event.target.value;

    // --check if the user changed their name
    if (currentUser !== this.props.user) {

      // --sets Anonymous in case the field is blank
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
