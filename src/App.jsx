import React, {Component} from 'react';
const uuid = require('uuid/v1');


function Welcome(props) {
  return <h1 className="navbar">Chatty</h1>;
}


class MessageList extends Component {
  render() {
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


class Message extends Component {
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.message.currentUser}</span>
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


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.sendMsg = this.sendMsg.bind(this);
    this.setsUser = this.setsUser.bind(this);
  }


  componentDidMount() {
    this.wss = new WebSocket("ws://localhost:3001");

    this.wss.onopen = function (event) {
      console.log("connected to the server"); 
    };
    this.wss.onmessage =(event)=> {
      const message = JSON.parse(event.data);
      
      // code to handle incoming message
      console.log("message1: ", message);
      let allMessages = this.state.messages.concat(message);

      this.setState({
        messages: allMessages
      })
      console.log("this.state: ", this.state);
    };
  }


  sendMsg(content) {
    content["id"] = uuid();
    content["currentUser"] = this.state.currentUser.name;
    this.wss.send(JSON.stringify(content));
  }

  setsUser(newName) {
    console.log("event::: ", newName);
    console.log("this.state1: ", this.state);
    this.setState({currentUser: {name: newName}});
    console.log("this.state2: ", this.state);
  }


  render() {
    return (
      <div>
        <Welcome />
        <MessageList messages={this.state.messages}/>
        <Chatbar setsUser={this.setsUser} sendMessage={this.sendMsg}/>
      </div>
    );
  }
}
export default App;
