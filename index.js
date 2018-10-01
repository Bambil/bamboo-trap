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

/* Command Line Interface */
const vorpal = require('vorpal')()
const chalk = require('chalk')

vorpal.log(' * 18.20 at Sep 07 2016 7:20 IR721')
vorpal.delimiter(`${chalk.rgb(255, 177, 79)('I1820')} - ${chalk.green('trap')} > `).show()

/* I1820 component initiation */
const I1820Trap = require('./src/trap')
const i1820Trap = new I1820Trap(config.http.port)

/* MQTT connection events and handlers */
const mqtt = require('mqtt')
var client = mqtt.connect(`mqtt://${config.connectivity.host}:${config.connectivity.port}`)
client.on('connect', () => {
  vorpal.log(` * MQTT at ${config.connectivity.host}:${config.connectivity.port}`)
  client.subscribe('i1820/projects/+/things/+/assets/+/state')
})
client.on('message', (topic, message) => {
  const state = JSON.parse(message)
  vorpal.log(state)
  i1820Trap.message(`projects/${state.project}`, state)
})
