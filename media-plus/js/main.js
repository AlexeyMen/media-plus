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
	  case 'audio':
		  $(link).click(function(){require(s)(center)})  
		  break
  }
}
