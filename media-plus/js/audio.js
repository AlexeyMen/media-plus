define(function(){
	return function(center){
		$(center).css('background-image', 'none')
		requireCss('media-plus/css/audio-player.css')  
		requireCss('css/vendor/jquery.BarGauge.css')
		$(center).load('media-plus/audio.html', function(){
			$(center).find('[class^=cr-audio-button]').each(function(){
				$(this).click(function(){
				  var act = getAction(this) 	
				  $.ajax({
					type: 'GET',
					url: '/xbmc/control/' + act,
					dataType: 'json',
					contentType: 'application/json',
					success: function(dat){}		
				  })
				})
			})
			var gauge = $(center).find('.cr-audio-gauge div')[0]
			setGauge(gauge, .01)
			var barGauge = $(gauge).find('.barGauge_bar')[0]
			var socketBox = require('socketbox')
			var ul = $('.cr-audio-playlist ul')	
			var currentPosition = -1
			socketBox['gauge'] = function(json){
				var pos = parseInt(json.result.position)	
			    //if(pos != currentPosition) $(ul).find(':nth-child(' + (pos + 1) + ') a').each(function(){
					$(this).css('color', '#F8BFA9') //.addClass('cr-audio-current')
				//})		
				currentPosition = pos
				var totalTime = json.result.totaltime
				var elapsedTime = json.result.time
				var timeRatio = getTimeRatio(elapsedTime, totalTime)
				$(barGauge).css('width', timeRatio + '%')
				var etime = timeFormat(elapsedTime)	
				var ttime = timeFormat(totalTime)	
				$('.cr-audio-time').text(etime + '/' + ttime)
			}
			socketBox['playlist'] = function(json){
				$(ul).empty()  
				var pl = json.items
				for(i in pl) preparePlaylistLink(ul, pl, i)
			}
			socketBox['composition'] = function(json){
				var fields = ['album', 'artist', 'title']
				for(i in fields) $('.cr-audio-' + fields[i]).text(json[fields[i]])
				$('.cr-audio-dot1').css('display', !json[fields.album] ? 'none' : 'inline')	
				$('.cr-audio-dot2').css('display', !json[fields.artist] ? 'none' : 'inline')	
				$('.cr-audio-composition').css('visibility', 'visible')
			    $('.cr-audio-cover img').attr('src', '/xbmc/thumbnail?' + Math.random())	
			    $(ul).find('li a').each(function(){$(this).removeClass('cr-audio-current')})		
			}
			socketBox['volume'] = function(json){
				var vol = parseInt(json.result.volume)
				vol = Math.round(Math.floor((vol - 1)/10))
				switch(vol){
					case 3:
						vol = 37
						break
					case 4:
						vol = 62
						break
					case 5:
						vol = 77
						break
					case 6:
						vol = 90
						break
					case 7:
						vol = 102
						break
					case 8:
						vol = 116
						break
					case 9:
						vol = 140
						break
					default:
						vol = 23
				}
				$('.cr-audio-volume').width(vol)
			}
			socketBox['reset'] = function(json){
				$(ul).empty()
				$(barGauge).css('width', 0)
				$('.cr-audio-composition').css('visibility', 'hidden')
				$('.cr-audio-time').text('00:00/00:00')
			}
			$.get('/xbmc/volume')
			$.get('/xbmc/playlist', function(){
				$.get('/xbmc/composition')
			})
			$('.cr-audio-cover img').attr('src', '/xbmc/thumbnail?' + Math.random())	
		})  
	}
})

function preparePlaylistLink(ul, pl, i){
	var li = $('<li/>').appendTo(ul)
	var a  = $('<a href="#">' + pl[i].title + '</a>').appendTo(li)
	$(a).click(function(){$.get('/xbmc/play/' + i)})
}

function getMilliseconds(obj){
  var mins = parseInt(obj.minutes)
  var secs = parseInt(obj.seconds)
  return (mins * 60 +  + secs) * 1000
}

function timeFormat(obj){
  var mins = parseInt(obj.minutes)
  var secs = parseInt(obj.seconds)
  mins = mins < 10 ? '0' + mins : mins
  secs = secs < 10 ? '0' + secs : secs
  return mins + ':' + secs
}

function getTimeRatio(t, tt){
  var tr = (parseInt(t.minutes) * 60 + parseInt(t.seconds)) / (parseInt(tt.minutes) * 60 + parseInt(tt.seconds))
  tr = tr < .03 ? .03 : tr	  
  return tr * 100	  
}

function getAction(el){
  var classes = $(el).attr('class').split(/\s+/)
  for(var i in classes){
	var s = classes[i]  
    if(/-button$/.test(s)) continue
    return s.match(/[a-z0-9]+$/)[0]		
  }
}

function setGauge(el, val){
  $(el).BarGauge({
	  backgroundColor: "#3d3d3d",           // Color of the Progress / Gauge Bar 
	  color: "#00fff2",     // Background color of Progress / Gauge Bar
	  width: "368px",      // Default width of Bar (Original Graphic Size of faceplate)
	  height: "58px",      // Default height of Bar
	  value: val,             // Value of Bar Gauge (Current Position)
	  goal: 1.00,          // Goal of Bar Gauge (Maximum Position)
	  //title: "Eric Clapton. Rockin' Chair",       // Default Title of Bar Gauge
	  title: "",       // Default Title of Bar Gauge
	  showTitle: true,         // If True show title
	  value_before: "",        // Default Value before text I.E. $1,000
	  value_after: "",         // Default Value Text end text I.E 1,000 USD
	  showValue: true,         // If True Show the value field in the Gauge Bar
	  valueColor: '#3cff00',       // Default Value Color 
	  faceplate: "url(media-plus/img/gauge.png) no-repeat", // Default locaiton of faceplate graphic other options (bar_graph(colorScale).png and bar_graph(gradient).png)
	  animSpeed: 400,      // Animation Speed can be string "slow","fast",etc... Or Integer
	  animType: "swing",       // Animation Type (jQuery Animation Methods)
	  decPlaces: 2,            // Default decimal places on the text field when showing value
	  thouSeparator: ',',      // Default Thousands seperator I.E. 1,000 or 1.000
	  decSeparator: '.'        // Default Decimal Separator I.E. 0.001 or 0,001
  })
}
