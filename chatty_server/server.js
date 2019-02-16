const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


// --auxiliary function to update connected user's counter
// its used when a user gets in or gets out the App
function updateNumberOfUSers(connection) {
  const numberOfUsers = {
    type: "info",
    numberOfUsers: wss.clients.size
  }
  connection.forEach(function each(client) {
    client.send(JSON.stringify(numberOfUsers));
  });
}

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.on('connection', function connection(ws) {
  
  //update the number of connected users when they connect to the system and display the users' number in the navbar
  updateNumberOfUSers(wss.clients);

  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    let message = JSON.parse(data);

    if (message.type === "postMsg") {
      message.type = "IncomingMsg";
    
    } else if (message.type === "postNotification") {
      message.type = "IncomingNotf";
    }
    
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(message));
    });

  });

  ws.on('close', function close() {
    //update the number of connected users when they disconnect to the system and display the users' number in the navbar
    updateNumberOfUSers(wss.clients);
  });
});
