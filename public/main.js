var socket = new io.Socket();
socket.connect();
socket.on('connect', function(){
  $('#status').text('Connected');
});
socket.on('message', function(m){
  $('#message').text(m);
});
socket.on('disconnect', function(){
  $('#status').text('Disconnected');
});
