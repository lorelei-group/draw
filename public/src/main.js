'use strict';

requirejs.config({
	urlArgs: 'nocache=' +  Date.now(),

	paths: {
		'underscore': '../bower_components/lodash/dist/lodash',
		'jquery': '../bower_components/jquery/jquery.min',
		'backbone': '../bower_components/backbone/backbone-min',
		'socket.io': '/socket.io/socket.io',
	},

	shim: {
		'underscore': { exports: '_' },
		'jquery':     { exports: '$' },
		'socket.io':  { exports: 'io' },

		'backbone': {
			exports: 'Backbone',
			deps: [
				'underscore',
				'jquery',
			]
		}
	}
})([ './master' ], function(master) {
	master.render();
});
