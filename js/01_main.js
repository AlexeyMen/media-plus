requirejs.config({
  waitSeconds: 30,		
  baseUrl: 'js',
  paths: {
    spinlib:       'vendor/spin.min',
    spin:          '10_spin',
    h5bp:          '11_h5bp',
	socketbox:     '12_socketbox',
	socket:        '14_socket',
    css:           '20_css',
    pageslib:      '21_pageslib',
    pages:         '22_pages',
    mobile_css:    '90_mobile_css',
    mobile:        '91_mobile',
    media:         '../media-plus/js/main',
    audio:         '../media-plus/js/audio',
    cameras:       '../media-plus/js/cameras',
    conditioners:  '../media-plus/js/conditioners',
	jquery:        'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
    jquery_ui:     'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min',
    jquery_mobile: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.1/jquery.mobile.min',
	gauge:         'vendor/jquery.BarGauge',
  },

  shim: {
    mobile:        {deps: ['mobile_css', 'jquery_mobile']},
    pageslib:      {deps: ['jquery', 'css']},
    media:         {deps: ['pageslib', 'pages', 'audio', 'conditioners', 'cameras', 'socketbox']},
    audio:         {deps: ['gauge']},
    gauge:         {deps: ['jquery']},
    socket:        {deps: ['socketbox']},
  }
})

require(['h5bp', 'spin', 'socket'])
