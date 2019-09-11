var services =[];
var hosts = ['http://localhost:3000'] // array
  for (var i = hosts.length - 1; i >= 0; i--) {
  	console.log('asdsad')
    var host = hosts[i]
    var io = require('socket.io-client')(host, {
	    'reconnection': true,
	    'reconnectionDelay': 500,
	    'force new connection':true
	  });
	  io.on('connect', () => {
		  io.emit('storeClientInfo', { serviceId:"service1" });
		  io.on('event', data => { /* … */ });
		  io.on('disconnect', () => {
		    console.log('a node disconnected')
		  });
		});
  io.on('disconnect', function (data) {
    console.log(data)
    for( var i=0, len=services.length; i<len; ++i ){
      var c = services[i];
    }
  });
}