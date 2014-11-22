define(function(){
	return function(center){
		$(center).css('background-image', 'none')
		requireCss('media-plus/css/audio-player.css')  
		requireCss('css/vendor/jquery.BarGauge.css')
		$(center).load('media-plus/audio.html', function(){
			$(center).find('[class^=cr-audio-button]').each(function(){
				$(this).click(function(){
					alert(getAction(this))
				})
			})
			var gauge = $(center).find('.cr-audio-gauge')[0]
			setGauge(gauge)
		})  
	}
})

function getAction(el){
  var classes = $(el).attr('class').split(/\s+/)
  for(var i in classes){
	var s = classes[i]  
    if(/-button$/.test(s)) continue
    return s.match(/[a-z0-9]+$/)[0]		
  }
}

function setGauge(el){
  $('.control-r-media-center-bar-gauge').BarGauge({
	  backgroundColor: "#3d3d3d",           // Color of the Progress / Gauge Bar 
	  color: "#00fff2",     // Background color of Progress / Gauge Bar
	  width: "368px",      // Default width of Bar (Original Graphic Size of faceplate)
	  height: "72px",      // Default height of Bar
	  value: 0.5,             // Value of Bar Gauge (Current Position)
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
