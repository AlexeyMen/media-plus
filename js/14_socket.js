window.WebSocket = window.WebSocket || window.MozWebSocket;

var host = window.location.hostname
var isOpen = /(open)|(github)/.test(host)

if(window.WebSocket && !isOpen) {
  var socketBox = require('socketbox')	
  var connection = new WebSocket('ws://' + host + ':3001/');
  connection.onmessage = function (message) {
    var json = JSON.parse(message.data)
    var target = json.target		
	if(!target || !socketBoxi[target] || typeof socketBox[target] !== 'function') return
	socketBox[target](json)	
  }
}
