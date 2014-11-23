define(function(){
  $('[data-role=page]').removeClass('invisible')
  var spinner = require('spin')
  spinner.stop()
  var spinTarget = document.getElementById('cr-spinner');
  spinTarget.parentNode.removeChild(spinTarget)
})
