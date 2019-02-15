const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.on('connection', function connection(ws) {
  
  //when write the auxiliary function, call it here and bellow (close)
  const numberOfUsers = {
    type: "info",
    numberOfUsers: wss.clients.size
  }
  wss.clients.forEach(function each(client) {
    console.log("XXXXXXX: ");
    client.send(JSON.stringify(numberOfUsers));
  });

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

  // need to deal with close connections and update the numebr of users connected
  // ws.on('close', function incoming(data) {
    // write a function (the same to above) and call it here and above, as well

});
