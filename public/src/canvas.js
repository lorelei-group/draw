define(function(require) {
	'use strict';

	var _ = require('underscore');
	var Backbone = require('backbone');
	var io = require('socket.io');

	function getCoords(event) {
		return {
			x: event.offsetX,
			y: event.offsetY,
		};
	}

	return Backbone.View.extend({
		el: 'canvas#draw-zone',

		events: {
			'mousedown': 'onMousedown',
			'mousemove': 'onMousemove',
			'mouseup': 'onMouseup',
		},

		initialize: function() {
			_.bindAll(this, 'resize', 'drawExternal');
			this.color = 'black';
			this.pointer = null;
			this.drawing = false;
			this.context = this.el.getContext('2d');
			this.socket = io.connect(document.location.origin);

			var self = this;
			this.socket.on('init', function(data) {
				console.log('initialized to', data);
				self.color = data.color;
			});
		},

		render: function() {
			this.socket.on('draw', this.drawExternal);
			$(window).on('resize', this.resize);
			this.resize();
		},

		resize: function() {
			var parent = this.$el.parent();
			this.$el.attr('width', parent.innerWidth());
			this.$el.attr('height', parent.innerHeight());
		},

		drawExternal: function(data) {
			console.log('recived order', data);
			this._draw(data.color, data.fromX, data.fromY, data.toX, data.toY);
		},

		onMousedown: function(event) {
			var coords = getCoords(event);
			this.pointer = coords;
			this.drawing = true;
		},

		onMousemove: function(event) {
			if (!this.drawing)
				return;

			var last = this.pointer;
			var coords = getCoords(event);
			this._draw(this.color, last.x, last.y, coords.x, coords.y);
			this.pointer = coords;

			this.socket.emit('draw', {
				id: this.id,
				color: this.color,
				fromX: last.x,
				fromY: last.y,
				toX: coords.x,
				toY: coords.y,
			});
		},

		onMouseup: function(event) {
			if (!this.drawing)
				return;

			this.onMousemove(event);
			this.drawing = false;
		},

		_draw: function(color, x, y, toX, toY) {
			var context = this.context;
			context.beginPath();
			context.moveTo(x, y);
			context.lineTo(toX, toY);
			context.strokeStyle = color;
			context.stroke();
		}
	});
});
