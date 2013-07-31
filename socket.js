'use strict';

var socketio = require('socket.io');

var connections = 0;
var colors = [
	'#FF0000',
	'#00FF00',
	'#0000FF',
	'#FFFF00',
	'#00FFFF',
	'#FF00FF'
];

function init(server) {
	var io = socketio.listen(server);

	io.sockets.on('connection', function (socket) {
		var color = colors[connections % colors.length];
		connections++;

		socket.emit('init', {
			id: connections,
			color: color,
		});

		socket.on('draw', function(data) {
			io.sockets.emit('draw', data);
		});
	});
}

exports.init = init;
