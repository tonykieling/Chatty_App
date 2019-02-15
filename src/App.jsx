import React, {Component} from 'react';
const uuid = require('uuid/v1');

import Chatbar from "./Chatbar.jsx"
import MessageList from "./MessageList.jsx"
import Welcome from "./Welcome.jsx"

// const Welcome = (props) => {  
//   console.log("props: ", props.argm.userCounter);
//   return (
//     <div>
//       <h1 className="navbar">Chatty</h1>
//       <h4 className="counter"> {props.argm.userCounter} users connected</h4>
//     </div>
//       );
// }


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      userCounter: 1,
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


  sendMsg(data) {
    const message = {
      type: data.type,
      id: uuid(),
      user: this.state.currentUser.name,
      content: data.content
    }
    this.wss.send(JSON.stringify(message));
  }

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
