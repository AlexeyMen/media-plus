define(['css'], function(requireCss){
	requireCss('css/plugins/cr-volume.css')
	$.fn.volumeScale = function(volume){
		var scale = $(this)
		if(typeof volume === 'number'){
			var w = 0
			volume = Math.round(Math.floor((volume)/10))
			switch(volume){
				case 0:
					break
				case 2:
					w = 36
					break
				case 3:
					w = 56
					break
				case 4:
					w = 64
					break
				case 5:
					w = 84
					break
				case 6:
					w = 100
					break
				case 7:
					w = 112
					break
				case 8:
					w = 128
					break
				case 9:
				case 10:
					w = '100%'
					break
				default:
					w = 28
			}
			$(scale).find('.cr-volume-scale-fg').width(w)
			return
		}
		$("<div class='cr-volume-scale-bg'></div>").appendTo(this)
		$("<div class='cr-volume-scale-fg'></div>").appendTo(this)
		return scale
	}

	$.fn.volumeSlider = function(opts){
		var html =	$("	<div class='cr-volume-slider'>" +
					  "		<div class='cr-volume-slider-ratio'></div>" +
					  "		<div class='cr-volume-slider-top'></div>" +
					  "		<div class='cr-volume-slider-bottom'></div>" +
					  "		<div class='cr-volume-slider-handle'></div>" +
					  "	</div>").appendTo(this)
		$(html).height(opts && opts.height ? opts.height : '100%')
		var slider = $(this).find('.cr-volume-slider')[0]
		var handle = $(slider).find('.cr-volume-slider-handle')[0]
		var ratio  = $(slider).find('.cr-volume-slider-ratio')[0]
		var scale  = $(this).parent().find('.cr-volume-scale-wrap')
		scale = scale.length > 0 ? $(scale[0]).volumeScale() : null
		var handleH = $(handle).height()
		var prevY = null
		var prevV = -1
		var isMoving = false
		$(handle).on({
			mousemove: function(ev){
				if(!isMoving) return
				if(!prevY){prevY = ev.pageY; return}
				var bottMax = $(slider).height() - handleH
				var dy = prevY - ev.pageY
				prevY = ev.pageY
				var bott = $(this).css('bottom').replace('px', '')
				var bott = parseInt(bott) + dy
				if(bott < 0) {bott = 0; prevY = null}
				if(bott > bottMax) {bott = bottMax; prevY = null}
				$(this).css('bottom', bott + 'px')
				$(ratio).height(bott + handleH / 2)
				setVolume()
			},
			mousedown: function(){isMoving = true},
			mouseup: function(){isMoving = false; prevY = null; setVolume()},
			mouseout: function(){isMoving = false; prevY = null; setVolume()},
		})

		function setVolume(){
			var v = getVolume()
			if(v == prevV) return
			prevV = v
			if(scale) $(scale).volumeScale(v)
		}

		function getVolume(){
			var sliderH = $(slider).height()
			var ratioH = $(ratio).height() - handleH / 2
			if(ratioH + handleH == sliderH) return 100
			return Math.floor(ratioH / (sliderH - handleH) * 100)
		}
	}
})
