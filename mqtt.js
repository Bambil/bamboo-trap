
var server = require('http').createServer();
var io = require('socket.io')(server);
var mqtt = require('mqtt');
var conn = mqtt.connect( 'mqtt:iot.ceit.aut.ac.ir:58904', function(err, client) {
  if (err) throw err;
  client.connect({
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: 'example',
    keepalive: 30000
  });
  client.on('connect' , function(){
    console.log("connected ! ")
    client.subscribe('presence')
    lient.publish('presence', 'Hello mqtt')
  })
  client.on('message', function(topic, message) {
    console.log(message.toString(topic))
    io.emit('my message' , topic)
    socket.emit('my message', $('#m').val());
  });
});