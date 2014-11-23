var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var xbmcController = new Controller();

xbmcController.playlist = function() {
    this.__app.xbmcPlaylistRequest(true)	
	this.res.json({all: 'right'})
}

xbmcController.composition = function() {
    var xbmcRequest = this.__app.xbmcCompositionRequest()	
	this.res.json({all: 'right'})
}

xbmcController.control = function() {
    var xbmcRequest = this.__app.xbmcRequest	
    var act = this.param('action')
	var obj = {jsonrpc: "2.0", id: 1}
	var res = this.res
	if(act == 'play') act = 'ok'
	if(act == 'pause') act = 'playpause'	
	switch(act){
		case 'up':
		case 'down':
		case 'left':
		case 'right':
		case 'back':
		case 'home':
			obj.method = 'Input.' + act.charAt(0).toUpperCase() + act.substring(1)
			break
		case 'ok':
			obj.method = 'Input.Select'
			break
		case 'power':
			obj.method = "System.Shutdown"
			break	
		case 'stop':
			obj.method = "Player.Stop"
			break
		case 'playpause':
			obj.method = "Player.PlayPause"
			break
		case 'mute':
			obj.method = "Application.SetMute"
			obj.params = {mute:"toggle"}
			break
		case 'volumedown':
		case 'volumeup':
			obj.method = "Application.SetVolume"
			obj.params = {volume: (act == "volumeup" ? "in" : "de") + "crement"}
			break
		case 'next':
		case 'previous':
			obj.method = "Player.GoTo"
			obj.params = {to: (act == 'next' ? 'next' : 'previous')}
			break
		case 'rewind':
		case 'forward':
			obj.method = "Player.SetSpeed"
			obj.params = {speed: (act == 'forward' ? 'in' : 'de') + 'crement'}
			break
	}
	xbmcRequest(obj, res)	
}

xbmcController.play = function() {
  var req = this.req	
  var res = this.res	
  var pos = this.param('pos')
  this.__app.xbmcPlayRequest(pos, res)
}

xbmcController.thumbnail = function() {
  var req = this.req	
  var res = this.res	
  this.__app.xbmcImageRequest(req, res)
}

module.exports = xbmcController
