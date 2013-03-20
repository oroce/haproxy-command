
var
	net = require( "net" ),
	util = require( "util" ),
	EventEmitter = require( "events" ).EventEmitter;

var HaproxyCommand = function _HaproxyCommandCtor( options ){
	if( !( this instanceof HaproxyCommand ) ){
		return new HaproxyCommand( options );
	}
	options || ( options = {} );
	this.path = options.path || "/tmp/haproxy.sock";
};

util.inherits( HaproxyCommand, EventEmitter );

HaproxyCommand.prototype.serverAvailable = function( cb ){
	var self = this;
	this.client = net.connect({
		path: this.path
	});
	this.client
		.on( "error", function( err ){
			self.emit( "error", err );
			if( cb ){
				cb( err );
			}
		})
		.on( "connect", function(){
			self.emit( "connect" );
			if( cb ){
				cb();
			}
		});
};

HaproxyCommand.prototype.clearCounters = function _HaproxyCommandClearCounters( all, cb ){
	if( typeof all === "function" ){
		cb = all;
		all = null;
	}
	var cmd = "clear counters" + ( all ? " all" : "" );
	var self = this;
	this.client = net.connect({
		path: this.path
	});
	this.client
		.on( "error", function( err ){
			self.emit( "error", err );
			if( cb ){
				cb( err );
			}
		})
		.on( "connect", function(){
			self.emit( "connect" );
			self.client.write( cmd );
		})
		.on( "close", function(){
			if( cb ){
				cb();
			}
		});

};
module.exports = HaproxyCommand;