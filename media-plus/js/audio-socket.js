define(function(){
	return function (gaugeDiv, playlistUl, compositionDiv, timeDiv, coverImg, volumeWidget){
		var currentPosition = -1
		var currentPlaylist = -1
		var socketBox = require('socketbox')
		socketBox['gauge'] = function(json){
			var ttime = json.totaltime
			var etime = json.time
			var ratio = getTimeRatio(etime, ttime)
			$(gaugeDiv).css('width', ratio + '%')
			etime = timeFormat(etime)	
			ttime = timeFormat(ttime)	
			$('.cr-audio-time').text(etime + '/' + ttime)
			var pos = parseInt(json.position)	
			var pl  = parseInt(json.playlist)	
			if(currentPlaylist != pl){
				$.get('/xbmc/playlist', function(){
					$.get('/xbmc/composition')
				})
				return
			}
			if(currentPosition != pos) $.get('/xbmc/composition')
		}
		socketBox['playlist'] = function(json){
			$(ul).empty()  
			var pl = json.items
			for(i in pl) preparePlaylistLink(playlistUl, pl, i)
		}
		socketBox['composition'] = function(json){
			var fields = ['album', 'artist', 'title']
			for(i in fields) $(composiionDiv).find('.cr-audio-' + fields[i]).text(json[fields[i]])
			var dots = $(compositionDiv).find('.cr-audio-dot')
			$(dots[0]).css('display', !json[fields.album] ? 'none' : 'inline')	
			$(dots[1]).css('display', !json[fields.artist] ? 'none' : 'inline')	
			$(compositioniDiv).css('visibility', 'visible')
			$('.cr-audio-cover img').attr('src', '/xbmc/thumbnail?' + Math.random())	
			$(coverImg).attr('src', '/xbmc/cover?r=' + Math.random())
		}
		socketBox['volume'] = function(json){
			$(volumeWidget).volumeWidget('volume', json.volume)
		}
	}
})

function preparePlaylistLink(ul, pl, i){
	var li = $('<li/>').appendTo(ul)
	var a  = $('<a href="#">' + pl[i].title + '</a>').appendTo(li)
	$(a).click(function(){$.get('/xbmc/play/' + i)})
}

function getTimeRatio(et, tt){
  var tr = (parseInt(et.minutes) * 60 + parseInt(et.seconds)) / (parseInt(tt.minutes) * 60 + parseInt(tt.seconds))
  tr = tr < .03 ? .03 : tr	  
  return tr * 100	  
}

function timeFormat(obj){
  var mins = parseInt(obj.minutes)
  var secs = parseInt(obj.seconds)
  mins = mins < 10 ? '0' + mins : mins
  secs = secs < 10 ? '0' + secs : secs
  return mins + ':' + secs
}
