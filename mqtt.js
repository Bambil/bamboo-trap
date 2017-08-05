
var server = require('http').createServer();
var io = require('socket.io')(server);
var mqtt = require('mqtt');
var socket = io();
var conn = mqtt.connect( '127.0.0.1:1883', function(err, client) {
  if (err) throw err;
  client.connect({
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: 'example',
    keepalive: 30000
  });
  client.on('message', function(topic, message) {
    console.log(message.toString(topic))
    io.emit('my message' , topic)
    socket.emit('my message', $('#m').val());
  });
});