var socket = io.connect();
socket.on('connect', function(){
  $('#status').text('Connected');
});
socket.on('message', function(m){
  $('#message').text(m);
});
socket.on('disconnect', function(){
  $('#status').text('Disconnected');
});
socket.on('customEvent', function(message) {
	$('#customEvent').text(message['time']);
});
