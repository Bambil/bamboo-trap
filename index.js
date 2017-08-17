/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 29-07-2017
 * |
 * | File Name:     index.js
 * +===============================================
 */
/* Configuration */
const config = require('config')

/* winston.js */
const winston = require('winston')

/* Configure CLI output on the default logger */
winston.cli()
winston.info(' * 18.20 at Sep 07 2016 7:20 IR721')

/* socket.io initiation */
const app = require('http').createServer()
const io = require('socket.io')(app);

app.listen(config.http.port)

/* Bamboo component initiation */
const BambooComponent = require('@ibamboo/component')

new BambooComponent({
    mqttHost: config.connectivity.host,
    mqttPort: config.connectivity.port,
    name: 'trap',
    subscribes: ['log']
}).on('ready', () => {
    winston.info(` * MQTT at ${config.connectivity.host}:${config.connectivity.port}`)
}).on('log', (message) => {
  winston.data(message)
  io.emit('raw', {
    type: 'log',
    data: {
      'agent_id': `${message.tenant}/${message.name}`
    }
  })
})
