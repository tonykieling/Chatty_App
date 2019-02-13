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

  createNewMessage(event){
    // console.log("writing")
    if(event.key==="Enter"){
      // console.log("a: ", event.target.value)
      this.props.addMessage(event.target.value)
      event.target.value = '';
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
            onKeyPress = {this.createNewMessage} />
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
    }, 1000);
  }

  addMessage(data) {
    // console.log("this.state::::: ", this.state);
    console.log("data: ", data);
    const oldMsgs = this.state.messages;
    const tempMsg = {
      userName: this.state.currentUser.name,
      content: data,
      id: this.state.messages.length + 1
    };
    console.log("tempMsg: ", tempMsg);
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
        <Chatbar user={this.state.currentUser.name} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
