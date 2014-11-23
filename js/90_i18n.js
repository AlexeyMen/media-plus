require('pageslib')(require('pages'))	

/*
var language = window.navigator.userLanguage || window.navigator.language;
language = language.trim().match(/^[a-z]{2}/)[0]
window.control_r_i18n = {}
var i18nable = $('[data-i18n-title], [data-i18n-text], [data-i18n-placeholder]').each(function(){
  var val = $(this).attr('data-i18n-title') || $(this).attr('data-i18n-text') || $(this).attr('data-i18n-placeholder')
  window.control_r_i18n[val] = val
})
loadLang(language)

function loadLang(lng){
	$.get('i18n/' + lng + '.txt', function(data){
	  var sa = data.split(/[\r\n]/)
	  for(i in sa){
		var saa = sa[i].split('=')
		if(!saa || saa.length < 2) continue
		var key = saa[0].trim()
		var val = saa[1].trim()
		window.control_r_i18n[key] = val
	  } 
	  controlRLocalize(i18nable)
	}).fail(function(){loadLang('en')})
}

function controlRLocalize(nodes){
  $(nodes).each(function(){
    var key = $(this).attr('data-i18n-title') || $(this).attr('data-i18n-text') || $(this).attr('data-i18n-placeholder')
	var val = window.control_r_i18n[key]
    if($(this).attr('data-i18n-title'))       $(this).attr('title',       val).attr('data-title', val)	
    if($(this).attr('data-i18n-placeholder')) $(this).attr('placeholder', val)	
    if($(this).attr('data-i18n-text'))        $(this).text(val)	
  })
}
*/	
