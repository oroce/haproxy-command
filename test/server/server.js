var net = require( "net" );
module.exports = function(){
	net.createServer(function( socket ){
		socket.on( "end", function(){
			socket.end();
		});
	});
};