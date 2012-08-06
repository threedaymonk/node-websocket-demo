var http    = require('http'), 
    io      = require('socket.io'),
    sys     = require('sys'),
    express = require('express');

var port = 8111;

//Upgraded for express 3.x
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({showStack: true, dumpExceptions: true}));

//socket requires a http server
var socket = io.listen(http.createServer(app).listen(port));
sys.log('Started server on http://localhost:' + port + '/')

socket.sockets.on('connection', function(client){
  var connected = true;

  //On receiving the message event - echo to console
  client.on('message', function(m){
    sys.log('Message received: '+m);
  });

  client.on('disconnect', function(){
    connected = false;
  });

  //Loop function that sends the current date time
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

