var requireCss = require('css')

define(function(){
  return function(iter){	
	  var stuff = $('#cr-stuff')[0]	
	  for(i in iter){	
		var page = $('#cr-page-template').clone().insertBefore(stuff)	
		setRefs(page, i, iter[i])
	  }
  }
})

function setRefs(page, i, obj){
  var id = $(page).attr('id')
  id = (id + '-' + i).replace('template-', '')
  $(page).attr('id', id)
  $(page).find('[data-role=header] a').each(function(){
    var href = $(this).attr('href')
    $(this).attr('href', href + '-' + i)
  })
  $(page).find('[data-role=panel]').each(function(){
    var id = $(this).attr('id')
    $(this).attr('id', id + '-' + i)
  })
  if(obj.prepareWidgets) obj.prepareWidgets(page)
  if(obj.title){
    $(page).find('[data-role=header]').each(function(){
	  $(this).attr('data-i18n-title', obj.title)
	})
  }	  
}
