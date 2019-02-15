import React, {Component} from 'react';
const uuid = require('uuid/v1');

import Chatbar from "./Chatbar.jsx"
import MessageList from "./MessageList.jsx"


function Welcome(props) {
  return <h1 className="navbar">Chatty</h1>;
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
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
      
      // code to handle incoming message
      console.log("message beforEE: ", message);
      if (message.type === "IncomingMsg") {
        console.log("this is a IncomingMsg", message);
        let allMessages = this.state.messages.concat(message);
        // console.log("allmessages: ", allMessages);
  
        this.setState({
          messages: allMessages
        })
      } else if (message.type === "IncomingNotf") {
        message.user = "";
        console.log("this is a IncomingNotf: ", message);
        let allMessages = this.state.messages.concat(message);

        this.setState({
          messages: allMessages
        })
      }
    };
  }


  sendMsg(data) {
    console.log("sending content: ", data);
    const message = {
      type: data.type,
      id: uuid(),
      user: this.state.currentUser.name,
      content: data.content
    }
    this.wss.send(JSON.stringify(message));
  }

  setsUser(newName) {
    // console.log("event::: ", newName);
    // console.log("this.state1: ", this.state);
    this.setState({currentUser: {name: newName}});
    // this.setState({currentUser: newName});
    // console.log("this.state2: ", this.state);
  }


  render() {
    return (
      <div>
        <Welcome />
        <MessageList messages={this.state.messages}/>
        <Chatbar setsUser={this.setsUser} sendMessage={this.sendMsg} user={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;
