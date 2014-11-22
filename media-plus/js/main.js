var crPages = {
  'media-center': {},
  'conditioners': {},
  'television':   {},
  'cameras':      {},
}

define(function(){
  requireCss('media-plus/css/media-space.css')	
  crPages['media-center'].prepareWidgets = function(page){
	  var pageContent = $(page).find('[data-role=cr-page-content]').addClass('cr-media-space')[0]
	  var mediaLeft   = $('<div class="cr-media-left"/>').appendTo(pageContent)
	  var mediaCenter = $('<div class="cr-media-center"/>').appendTo(pageContent)
	  var mediaRight  = $('<div class="cr-media-right"/>').appendTo(pageContent)
	  var leftArray   = ['tv', 'dvd', 'audio', 'ir', 'projector']
	  var rightArray  = ['cameras', 'webcams', 'conditioners', 'curtains', 'garlands']
	  setButtons(leftArray, mediaLeft, mediaCenter)
	  setButtons(rightArray, mediaRight, mediaCenter)
  }	
  require('pages')(crPages)	
  var spinner = require('spin')
  spinner.stop()
  var spinTarget = document.getElementById('cr-spinner');
  spinTarget.parentNode.removeChild(spinTarget)
  require(['mobile'])	
})

function setButtons(arr, div, center){
  for(i in arr){
	var link = $('<div class="cr-icones-' + arr[i] + '"/>').appendTo(div)
	setClick(link, arr[i], center)	
  }
}

function setClick(link, s, center){
  switch(s){	
	  case 'conditioners':
	  case 'cameras':
		  $(link).click(function(){
		    $(center).css('background-image', 'url("media-plus/img/bg-' + s + '.png")')
		  })
		  break
	  case 'audio':
		  $(link).click(function(){
		    $(center).css('background-image', 'none')
			requireCss('media-plus/css/audio-player.css')  
			$(center).load('media-plus/audio.html', function(){
				$(center).find('[class^=cr-audio-button]').each(function(){
				   $(this).click(function(){
				     alert(getAction(this))
				   })
				})
			})  
		  })
		  break
  }
}

function getAction(el){
  var classes = $(el).attr('class').split(/\s+/)
  for(var i in classes){
	var s = classes[i]  
    if(/-button$/.test(s)) continue
    return s.match(/[a-z0-9]+$/)[0]		
  }
}
