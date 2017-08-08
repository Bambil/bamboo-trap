
var server = require('http').createServer();
var io = require('socket.io')(server);
var mqtt = require('mqtt');
var client = mqtt.connect( 'mqtt:iot.ceit.aut.ac.ir:58904')
  
client.on('connect' , function(){
    console.log("connected ! ")
    client.subscribe('presence')
    client.publish('presence', 'Hello mqtt')
    io.emit('my message' , "helllooooo")

  })
  client.on('message', function(topic, message) {
    console.log("here")
    console.log(topic , message )
    // socket.emit('my message', $('#m').val());
  });  
