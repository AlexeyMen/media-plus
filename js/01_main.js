requirejs.config({
  waitSeconds: 30,		
  baseUrl: 'js',
  paths: {
    spinlib:       'vendor/spin.min',
    spin:          '10_spin',
    h5bp:          '11_h5bp',
    css:           '19_css',
    pages:         '21_pages',
    mobile_css:    '22_mobile_css',
    media:         '../media-plus/js/main',
    audio:         '../media-plus/js/audio',
    cameras:       '../media-plus/js/cameras',
    conditioners:  '../media-plus/js/conditioners',
    mobile:        '24_mobile',
	jquery:        'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
    jquery_ui:     'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min',
    jquery_mobile: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.1/jquery.mobile.min',
	gauge:         'vendor/jquery.BarGauge',
  },

  shim: {
    mobile:        {deps: ['mobile_css', 'jquery_mobile']},
    pages:         {deps: ['jquery', 'css']},
    media:         {deps: ['pages', 'audio', 'conditioners', 'cameras']},
    audio:         {deps: ['gauge']},
  }
})

require(['h5bp', 'spin'])
