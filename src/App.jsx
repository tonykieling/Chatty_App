import React, {Component} from 'react';
// import { generateRandomId } from "./utils";

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
  render () {
    return (
      <div className="chatbar">
        <input className="chatbar-username"  defaultValue={this.props.user.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
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
          id:"11"
        },
        {
          userName: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id:"21"
        }
      ]};
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
    }, 3000);
  }

  render() {
    return (
      <div>
        <Welcome />
        <MessageList messages={this.state.messages}/>
        <Chatbar user={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
