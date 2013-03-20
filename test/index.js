var should = require( "should" );

var HaproxyCommand = require( "../" );

describe( "test commands", function(){
	before(function(){
		console.log( process.env.HAPROXY_SOCKET );
		this.haproxyCommand = new HaproxyCommand({
			path: process.env.HAPROXY_SOCKET||"./server/server.sock"
		});
	});

	it( "clear counters", function( done ){
		this.haproxyCommand.clearCounters(function( err ){
			should.not.exist( err );
			done();
		});
	});

	it( "clear counters all", function( done ){
		this.haproxyCommand.clearCounters( true, function( err ){
			should.not.exist( err );
			done();
		});
	});
});