var express = require('express');
var app = express();

var
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 8080});

wss.on('connection', function(ws) {
  console.log('WebSocket Server connected.')

  // Handle message a client sent to the server
  ws.on('message', function(msg) {
    console.log('recieved: ', msg);

    // Broadcast message to all who is connected
    wss.clients.forEach(client => {
      if (client !== ws) {
        client.send(msg);
      }
    });

    ws.send(msg);
  });

});

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, '0.0.0.0', function() {
  console.log('WebSocket App is Listening!');
});
