
var app = require('express')();
const cluster = require('cluster');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mqtt = require('mqtt');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

    //connect to mqtt
    var client = mqtt.connect( 'mqtt:iot.ceit.aut.ac.ir:58904')

    //sending counter message
    client.on('connect' , function(){
        console.log("connected ! ")
        client.subscribe('presence') 
        count = 0
        setInterval(() => {
	    count = count + 1
            client.publish('presence', 'Hello mqtt '+ count.toString());
        }, 1000)
    })

    //send message to socket io
    client.on('message', function(topic, message) {
        console.log(topic , message.toString())
        io.emit('my message' , message.toString())  
    });

    //html file
    app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
        });
    
    //http port 
    http.listen(3000, function(){
        console.log('listening on *:3000');
    });

  console.log(`Worker ${process.pid} started`);
}