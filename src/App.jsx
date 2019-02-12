import React, {Component} from 'react';

function Welcome(props) {
  return <h1 className="navbar">Chatty</h1>;
}


class Messages extends Component {
  // constructor
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">I won't be impressed with technology until I can download food.</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
}


class Chatbr extends Component {
  render () {
    return (
      <div className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return (
      <div>
        <Welcome />
        <Messages />
        <Chatbr />
      </div>
    );
  }
}
export default App;
