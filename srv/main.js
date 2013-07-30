'use strict';

var express = require('express');
var http = require('http');
var socket = require('./socket');

var app = express();
var server = http.createServer(app);

socket.init(server);

app.configure(function(){
	app.use(express.static(__dirname + '/../web/'));
});

server.listen(56001);
