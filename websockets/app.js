var PORT = 3000;
var express = require('express');
 
var app = express()
  , http = require('http')
  , server = http.createServer(app);


app.set('port', process.env.PORT || PORT);
app.use(express.static(__dirname + '/public'));
server.listen(PORT);

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
	socket.on('rangechanged',function(data) {
		socket.broadcast.emit('rangechanged', data);
	});

	socket.on('disconnect', function () {
		console.log("Someone disconnected");
	});
});
 