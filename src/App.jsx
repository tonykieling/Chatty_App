import React, {Component} from 'react';
// import { generateRandomId } from "./utils";
// import keydown from 'react-keydown';

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
    console.log("this: ", this.props);
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
  // constructor(props) {
  //   super(props);
  //   this.callAddMsg = this.callAddMsg.bind(this);
  //   // this.checkEnter = this.checkEnter.bind(this);
  // }

  // checkEnter(event) {
    // event.prevenDefault;
  // checkEnter = (event) => {
    // event.preventDefault();
  // onKeyPress = (e) => {    
  //   console.log("ENTER");
  //   // (event.keyCode === 13) ? this.props.addMessage : ""
  // }

  // handleKeyPress = (event) => {
  //   console.log("wwwwwwwwwwww");
  //   if(event.key === "13") {
  //     console.log("+++++++++++");
  //   }
  // } 
  // onKeyDown={ this.myMethod }


  // callAddMsg(event) {
  //   console.log("event.username: ", event.userName);
  //   event.preventDefault();
  //   this.props.addMessage(event);
  // }

  

  render () {
    const onSubmit = evt => {
      evt.preventDefault();
      // console.log("evt.target.elements.content: ", evt.target.elements.userName.value);
      const message = evt.target.elements;
      this.props.addMessage(message);
      evt.target.elements.content.value = "";
    };

    return (
      <div className="chatbar">
        <form onSubmit={onSubmit}>
          <input className="chatbar-username" type="text" name="userName"
            defaultValue={this.props.user.name}  />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="content"/>
          <button>Send Msg</button>
        </form>
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
        {
          userName: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          userName: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]};
    
    this.addMessage = this.addMessage.bind(this);
      
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, userName: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 2000);
  }

  addMessage(data) {
    console.log("this.state::::: ", this.state);
    const oldMsgs = this.state.messages;
    const tempMsg = {
      userName: data.userName.value,
      content: data.content.value,
      id: this.state.messages.length + 1
    };
    console.log("oldMsgs: ", oldMsgs);
    const newMsg = [...oldMsgs, tempMsg];

    console.log("newMsgs: ", newMsg);
    this.setState({ messages: newMsg });
  }

  render() {
    return (
      <div>
        <Welcome />
        <MessageList messages={this.state.messages}/>
        <Chatbar user={this.state.currentUser} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
