var request = require('request')
var md5 = require('MD5')

var xbmcProxy = request.defaults({
  method: 'POST',
  auth: {
	'user': 'xbmc',
	'pass': 'AlexUrus',
  },
})

var xbmcImageProxy = request.defaults({
  method: 'GET',
  auth: {
	'user': 'xbmc',
	'pass': 'AlexUrus',
  },
})

var notifyByWebsocket

module.exports = function(done){
  notifyByWebsocket = this.notifyByWebsocket	
  this.xbmcRequest = xbmcRequest
  this.xbmcImageRequest = xbmcImageRequest
  this.xbmcPlayRequest = xbmcPlayRequest
  this.xbmcPlaylistRequest = getPlaylist
  this.xbmcCompositionRequest = getComposition
  done()
}

function xbmcPlayRequest(pos, res){
  var obj = {"jsonrpc": "2.0", "method": "Player.GoTo", "params": {to: parseInt(pos),}, "id": 1}
  xbmcRequest(obj, res)
}

function xbmcImageRequest(req, res){
	if(!currentPlaylist || currentPosition  < 0 || !currentPlaylist.result.items[currentPosition]){
		res.statusCode = 302; 
		res.setHeader("Location", "../media-plus/img/cover-stub.png");
		res.end();
		return
	}
	var path = currentPlaylist.result.items[currentPosition].thumbnail	
	path = path.replace('image://', '')
	path = escape(path)
	xbmcImageProxy({url: 'http://192.168.3.60:8080/image/image://' + path}).pipe(res)
}	  

function xbmcRequest(obj, resp, func){
	if(/^Play/.test(obj.method)) clarifyPlayer(obj, resp, func) 
	else sendRequest(obj, resp, func)	
}	  

function clarifyPlayer(obj, resp, func){
	var preObj = {"jsonrpc":"2.0","method":"Player.GetActivePlayers","id":1} 
	xbmcProxy({
		url: 'http://192.168.3.60:8080/jsonrpc?' + preObj.method,
		json: preObj,
	  }, 
	  function(err, _res, dat){
		if(err && resp){resp.json(err); return}
		if(err){console.log(err); return}
		var arrLen = dat.result.length
		if(arrLen == 0 && resp){resp.json(dat); return}
		if(arrLen == 0) {
			//currentPlaylist = null
			currentPosition = 0
			console.log('No active player.') 
			return
		}
		if(!obj.params) obj.params = {}
		if(/^Player/.test(obj.method))obj.params.playerid = dat.result[0].playerid
		if(/^Playlist/.test(obj.method))obj.params.playlistid = dat.result[0].playerid
        //console.log(obj)
		sendRequest(obj, resp, func)
	})
}

function sendRequest(obj, resp, func){
	xbmcProxy({
		  url: 'http://192.168.3.60:8080/jsonrpc?' + obj.method,
		  json: obj,
	  }, 
	  function(err, _res, dat){
		if(func){func(err, dat); return}
		if(resp){resp.json(err ? err : dat); return}
		if(err)console.log(err)
	  }
	)
}

var currentPlaylist = null
var currentPosition = -1
var plprops = {"jsonrpc": "2.0", "method": "Playlist.GetItems", "params": { "properties": ["file", "title", "album", "artist", "duration", "thumbnail"] }, "id": 1}
var ggprops   = {"jsonrpc":"2.0","method":"Player.GetProperties","id":1,"params":{"properties":["position","totaltime","time"]}}

function getPlaylist(force){
	xbmcRequest(plprops, null, function(err, dat){
		if(err){console.log(err); return} 
		if(!force && JSON.stringify(dat) === JSON.stringify(currentPlaylist)) return
		currentPlaylist = dat  
		currentPosition = -1
		var ret = {target: 'playlist', items: []}	
		for(i in dat.result.items) ret.items.push(currentPlaylist.result.items[i].title) 
		notifyByWebsocket(ret)
	})
}

function getComposition(){
	xbmcRequest(plprops, null, function(err, dat){
		if(err){console.log(err); return} 
		if(!currentPlaylist || currentPosition < 0) return
		var item = currentPlaylist.result.items[currentPosition]
		if(!item) return
		var ret = {target: 'composition'}	
		ret.title  = item.title 
		ret.album  = item.album 
		ret.artist = item.artist[0] 
		notifyByWebsocket(ret)
	})
}

var gaugeInterval = setInterval(function(){
  xbmcRequest(ggprops, null, function(err, dat){
    if(err){console.log(err); return} 
    dat.target = 'gauge'	
	var pos = parseInt(dat.result.position)
	var isSame = (currentPosition === pos)  
	currentPosition = pos  
	notifyByWebsocket(dat)
	if(!currentPlaylist || isSame) return
	getComposition()  
  })
  getPlaylist(false)
}, 2000)

