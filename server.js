var http    = require('http'), 
    io      = require('socket.io'),
    sys     = require('sys'),
    express = require('express');

var port = 8111;

var server = express.createServer();
server.use(express.static(__dirname + '/public'));
server.use(express.errorHandler({showStack: true, dumpExceptions: true}));
server.listen(port);

var socket = io.listen(server);

socket.sockets.on('connection', function(client){
  var connected = true;
  client.on('message', function(m){
    sys.log('Message received: '+m);
  });
  client.on('disconnect', function(){
    connected = false;
  });

  var tick = function(){
    if (!connected) {
      return;
    }

    var dateTime = new Date();
    
    console.log("Sending " + dateTime);
    
    //This will be converted to a string and sent
    client.send(dateTime);
    
    //This will send an object across
    client.emit('customEvent', {'time' : dateTime});
    setTimeout(tick, 1000);
  };
  
  tick();
});

