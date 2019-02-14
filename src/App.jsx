import React, {Component} from 'react';
// import { generateRandomId } from "./utils";
const uuid = require('uuid/v1');


function Welcome(props) {
  return <h1 className="navbar">Chatty</h1>;
}


class MessageList extends Component {
  render() {
    let allMessages = this.props.messages.map((message) => {
      return <Message key={message.id} message={message} />
    });
    console.log("allMessages: ", allMessages);
    return (
      <div className="messages">
        {allMessages}
      </div>
    )
  }
}


class Message extends Component {
  render() {
    // console.log("this: ", this.props);
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.message.userName}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
        <div className="message system">
        </div>
      </div>
    );
  }
}


class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.createNewMessage = this.createNewMessage.bind(this);
  }

  createNewMessage(event) {
    if(event.key==="Enter"){
        console.log("chatbar onopen");
  
      // Construct a msg object containing the data the server needs to process the message from the chat client.
      const msg = {
        userName: this.props.user,
        content: event.target.value
      };

console.log("sending: ", msg);
      // Send the msg object as a JSON-formatted string.
      // sendSocket.send(JSON.stringify(msg));
      const newMessage = JSON.stringify(msg);
      console.log("message stringlifidied: ", newMessage);
      this.props.sendMessage(msg);
      // sendSocket.send(event.target.value);
      // }
      // Blank the text input element, ready to receive the next line of text from the user.
      event.target.value = "";
    }
  }


  render () {
    return (
      <div className="chatbar">
          <input className="chatbar-username" type="text" name="userName"
            defaultValue={this.props.user}  />
          <input className="chatbar-message" 
            placeholder="Type a message and hit ENTER" 
            name="content"
            onKeyPress = {this.createNewMessage}
            // onKeyPress = {sendText}
             />
      </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        // {
        //   userName: "Bob",
        //   content: "Has anyone seen my marbles?",
        //   id: 1
        // },
        // {
        //   userName: "Anonymous",
        //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
        //   id: 2
        // }
      ]};
    
    // this.addMessage = this.addMessage.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    
  }



  componentDidMount() {
    this.wss = new WebSocket("ws://localhost:3001");

    this.wss.onopen = function (event) {
      console.log("connected to the server"); 


     
    };
    this.wss.onmessage =(event)=> {
      console.log("event: ", event);
      const message = JSON.parse(event.data);
      
      console.log("messages: ", message);
      // code to handle incoming message
      //this.addMessage(messages);
      let allMessages = this.state.messages.concat(message);
      this.setState({
        messages: allMessages
      })
    };

  }


  sendMsg(content) {
    console.log("Test ",content);
    content["id"] = uuid();
    this.wss.send(JSON.stringify(content));
  }

  // addMessage(data) {
  //   // console.log("this.state::::: ", this.state);
  //   console.log("data: ", data);
  //   const oldMsgs = this.state.messages;
  //   const tempMsg = {
  //     userName: this.state.currentUser.name,
  //     content: data,
  //     // id: this.state.messages.length + 1
  //     id: uuid()
  //   };
  //   console.log("tempMsg: ", tempMsg);
  //   console.log("oldMsgs: ", oldMsgs);
  //   const newMsg = [...oldMsgs, tempMsg];

  //   console.log("newMsgs: ", newMsg);
  //   this.setState({ messages: newMsg });
  // }

  render() {
    return (
      <div>
        <Welcome />
        <MessageList messages={this.state.messages}/>
        {/* <Chatbar user={this.state.currentUser.name} addMessage={this.addMessage} /> */}
        <Chatbar user={this.state.currentUser.name} sendMessage={this.sendMsg}/>
      </div>
    );
  }
}
export default App;
