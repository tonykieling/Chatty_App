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

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  console.log("111111111");
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  console.log("22222222222");
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    console.log("server received: ", data);
    let message = JSON.parse(data);
    if (message.type === "postMsg") {
      message.type = "IncomingMsg";
    } else if (message.type === "postNotification") {
      message.type = "IncomingNotf";
      console.log("message for notification: ", message);
    }
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(message));
    });

  });
});
