var http    = require('http'), 
    io      = require('socket.io'),
    sys     = require('sys'),
    url     = require('url'),
    express = require('express');

var port = 8111;

var server = express.createServer();
server.use(express.staticProvider(__dirname + '/public'));
server.use(express.errorHandler({showStack: true, dumpExceptions: true}));
server.listen(port);

var socket = io.listen(server);

socket.on('connection', function(client){
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
    client.send((new Date()) + '');
    setTimeout(tick, 1000);
  };

  tick();
});

