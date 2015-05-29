/*global module, require*/
var signalR  = require('signalr-client'),
  util       = require('util'),
  BaseWorker = require('./baseworker.js'),
  logger     = require('../logger.js');

/**
 * SignalRWorker Worker class inherits form BaseWorker
 */
var SignalRWorker = function (server, generator) {
  SignalRWorker.super_.apply(this, arguments);
};

util.inherits(SignalRWorker, BaseWorker);

SignalRWorker.prototype.createClient = function (callback) {
  var self = this;
  var client  = new signalR.client(
	
	    //signalR service URL
	    this.server,
	
	    // array of hubs to be supported in the connection
	    ['TestHub']
	    //, 10 /* Reconnection Timeout is optional and defaulted to 10 seconds */
	    //, false /* doNotStart is option and defaulted to false. If set to true 
	                 client will not start until .start() is called */
	);
  
  console.log("starting SignalRWorker "+this.server);
  
  client.on(
    // Hub Name (case insensitive)
    'TestHub',

    // Method Name (case insensitive)
    'methodName',

    // Callback function with parameters matching call from hub
    function(name, message) {
        console.log("revc => " + name + ": " + message);
    });
  
//   uncomment these lines if you want to debug 
//
//   client.serviceHandlers.connected = function(connection) {
//     console.log("connected");
//   }
//
//   client.serviceHandlers = { Yep, I even added the merge syntax here.
//     bound: function() { console.log("Websocket bound"); },
//     connectFailed: function(error) { console.log("Websocket connectFailed: ", error); },
//     connected: function(connection) { console.log("Websocket connected"); },
//     disconnected: function() { console.log("Websocket disconnected"); },
//     onerror: function (error) { console.log("Websocket onerror: ", error); },
//     messageReceived: function (message) { console.log("Websocket messageReceived: ", message); return false; },
//     bindingError: function (error) { console.log("Websocket bindingError: ", error); },
//     connectionLost: function (error) { console.log("Connection Lost: ", error); },
//     reconnecting: function (retry /* { inital: true/false, count: 0} */) {
//         console.log("Websocket Retrying: ", retry);
//         return retry.count >= 3; /* cancel retry true */
//         return true; 
//     }
//  };
//
//  use invoke if you want to call a method on the server
//  
//  client.invoke(
//	'TestHub', // Hub Name (case insensitive)
//	'methodName', // Method Name (case insensitive)
//	'param' , 'otherparam' //additional parameters to match signature
//  );
};

module.exports = SignalRWorker;
