'use strict';

requirejs.config({
	urlArgs: 'nocache=' +  Date.now(),

	paths: {
		'ctor': 'lib/ctor',
		'less': '../bower_components/less.js/dist/less-1.4.2',
		'modernizr': '../bower_components/modernizr/modernizr',
		'underscore': '../bower_components/lodash/dist/lodash',
		'jquery': '../bower_components/jquery/jquery.min',
		'handlebars': '../bower_components/handlebars/handlebars',
		'backbone': '../bower_components/backbone/backbone-min',
		'socket.io': '/socket.io/socket.io',
	},

	shim: {
		'ctor':       { exports: 'ctor' },
		'less':       { exports: 'less' },
		'modernizr':  { exports: 'Modernizr' },
		'underscore': { exports: '_' },
		'jquery':     { exports: '$' },
		'handlebars': { exports: 'Handlebars' },
		'socket.io':  { exports: 'io' },

		'backbone': {
			exports: 'Backbone',
			deps: [
				'underscore',
				'jquery',
			]
		}
	}
})([ 'views/master', 'less' ], function(master) {
	master.render();
});
