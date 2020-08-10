var express = require('express');
var socket= require('socket.io');

// App setup
var app = express();
var server = app.listen(5000, function(){
    console.log('listening for requests on port 5000,');
});

// Static files
app.use(express.static('public'));


var io=socket(server);

io.on('connection',function(socket){
	

	socket.on("user_name",function(data)
	{
		socket.broadcast.emit("user_name",data);
	});

	socket.on("user_score",function(data)
	{
		socket.broadcast.emit("user_score",data);
	});


});
