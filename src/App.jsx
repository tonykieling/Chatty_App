import React, {Component} from 'react';

import Chatbar from "./Chatbar.jsx"
import MessageList from "./MessageList.jsx"
import Welcome from "./Welcome.jsx"

const uuid = require('uuid/v1');

// -- class responsable for the App, which will call its component's element
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      userCounter: 1,
    };
    // const listOfColors = ["green", "blue", "orange", "purple"];
    this.sendMsg = this.sendMsg.bind(this);
    this.setsUser = this.setsUser.bind(this);
    console.log("this.state in App constructor: ", this.state);
  }


  componentDidMount() {
    this.wss = new WebSocket("ws://localhost:3001");

    this.wss.onopen = function (event) {
      console.log("connected to the server"); 
    };
    this.wss.onmessage =(event)=> {
      const message = JSON.parse(event.data);
      
      // --on receiving, there are 3 types of messages comming from the server: Message payload, Notification and user's counter (info)
      switch(message.type) {
      case "IncomingMsg":
        let allMessages = this.state.messages.concat(message);
        this.setState({
          messages: allMessages
        });
        break;
      case "IncomingNotf":
        message.user = "";
        let allMessages1 = this.state.messages.concat(message);
        this.setState({
          messages: allMessages1
        });
        break;
      case "info":
        this.setState({
          userCounter: message.numberOfUsers
        });
        break;
      default:
        console.log("default");
      }
    };
  }


  // --auxiliary function to send message
  sendMsg(data) {
    const message = {
      type: data.type,
      id: uuid(),
      user: this.state.currentUser.name,
      content: data.content
    }
    this.wss.send(JSON.stringify(message));
  }

  // --auxiliary function to change user's name
  setsUser(newName) {
    this.setState({currentUser: {name: newName}});
  }


  render() {
    return (
      <div>
        <Welcome argm={this.state} />
        <MessageList messages={this.state.messages}/>
        <Chatbar setsUser={this.setsUser} sendMessage={this.sendMsg} user={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
