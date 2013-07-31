define(function(require) {
	'use strict';

	var $ = require('jquery');
	var Backbone = require('backbone');

	var Canvas = require('./canvas');

	var MasterView = Backbone.View.extend({
		el: '#master',

		render: function() {
			$('#loader').remove();
			this.$el.show();

			this.canvas = new Canvas();
			this.canvas.render();
		}
	});

	return new MasterView();
});
