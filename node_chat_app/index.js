var express = require('express');
var socket = require('socket.io');

var app = express();

//listen to request
var server = app.listen(4000, function(){
  console.log('Listening to port 4000');
});

//static page
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made socket connection');

  socket.on('chat', function(data){
    io.emit('chat', data);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });

});
