'use strict';

var express = require('express');
var compress = require('compression');

var app = express();
var port = process.env.PORT || 3001;
app.use(compress());  

app.use(express.static(__dirname + '/public'));

var expressServer = app.listen(port);
var io = require('socket.io').listen(expressServer);

console.log('Listening on port', port);

