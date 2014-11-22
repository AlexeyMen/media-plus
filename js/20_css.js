define(function(){
	return function(href) {
	  var fileref=document.createElement("link")
	  fileref.setAttribute("rel", "stylesheet")
	  fileref.setAttribute("type", "text/css")
	  fileref.setAttribute("href", href)
	  document.getElementsByTagName("head")[0].appendChild(fileref)
	}
})
