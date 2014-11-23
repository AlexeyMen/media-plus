var webSocketsServerPort = 3001;
var webSocketServer = require('websocket').server;
var http = require('http');

var clients = [];
var server = http.createServer(function(request, response) {});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

var wsServer = new webSocketServer({httpServer: server});

wsServer.on('request', function(request) {

  var connection = request.accept(null, request.origin); 
  var index = clients.push(connection) - 1;
  console.log('Websocket connection.')

  connection.on('close', function(connection) {
    clients.splice(index, 1);
  });
});

module.exports = function(done) {
  this.notifyByWebsocket = function(json){  
    for (var i=0; i < clients.length; i++) {
      clients[i].sendUTF(JSON.stringify(json))
    }
  }
  done()  
}
