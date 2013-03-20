var should = require( "should" );

var HaproxyCommand = require( "../" );

describe( "test without server", function(){
	beforeEach(function(){
		this.haproxyCommand = new HaproxyCommand({
			path: "../this-should-not-exist.sock"
		});
	});

	it( "should emit error", function( done ){
		this.haproxyCommand
			.on( "error", function(){
				done();
			})
			.serverAvailable();
	});

	it( "should return error in callback", function( done ){
		this.haproxyCommand
			.on( "error", function(){})
			.serverAvailable(function( err ){
				should.exist( err );
				done();
			});
	});
});