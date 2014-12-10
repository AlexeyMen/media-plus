define(function(){
	return function(center){
		$(center).css('background-image', 'none')
		requireCss('media-plus/css/audio-player.css')  
		requireCss('css/vendor/jquery.BarGauge.css')
		$(center).load('media-plus/audio.html', function(){
			var joystick = $(center).find('.cr-audio-joystick')[0]
			$(center).find('[class^=cr-audio-joystick-]').hover(
				function(){
					$(joystick).addClass($(this).attr('class').replace('joystick-', 'joystickbg-'))	
				},
				function(){
					$.each(['up', 'left', 'ok', 'right', 'down'], function(i, el){
						$(joystick).removeClass('cr-audio-joystickbg-' + el)
					})
				}
			)
			var volumeSlider = $(center).find('.cr-volume-slider-wrap')[0]
			$(volumeSlider).volumeSlider()
			var gauge = $(center).find('.cr-audio-gauge div')[0]
			setGauge(gauge, .30)
			//var audioSocket = require('audio_socket')	
			//var gaugeDiv = $(gauge).find('.barGauge_bar')[0]
			//var playlistUl = $(center).find('.cr-audio-playlist ul')[0]	
			//var compositionDiv = $(center).find('.cr-audio-composition')[0]	
			//var timeDiv = $(center).find('.cr-audio-time')[0]	
			//var coverImg = $(center).find('.cr-audio-cover img')[0]	
			//audioSocket(gaugeDiv, playlistUl, compositionDiv, timeDiv, coverImg)
		})  
	}
})

function setGauge(el, val){
  $(el).BarGauge({
	  backgroundColor: "#3d3d3d",           // Color of the Progress / Gauge Bar 
	  color: "#00fff2",     // Background color of Progress / Gauge Bar
	  width: "368px",      // Default width of Bar (Original Graphic Size of faceplate)
	  height: "60px",      // Default height of Bar
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
