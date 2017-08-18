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
vorpal.delimiter(`${chalk.green('Bamboo')} - ${chalk.rgb(255, 177, 79)('Trap')} > `).show()

/* Bamboo component initiation */
const BambooComponent = require('@ibamboo/component')
const BambooTrap = require('./src/trap')
const bambooTrap = new BambooTrap(config.http.port)

new BambooComponent({
  mqttHost: config.connectivity.host,
  mqttPort: config.connectivity.port,
  name: 'trap',
  subscribes: ['log']
}).on('ready', () => {
  vorpal.log(` * MQTT at ${config.connectivity.host}:${config.connectivity.port}`)
}).on('log', (message) => {
  vorpal.log(message)
  bambooTrap.message('raw', {
    type: 'log',
    data: {
      'agent_id': `${message.tenant}/${message.name}`,
      'device_id': `${message.data.id}`,
      'type': `${message.data.type}`,
      'states': `${message.data.state}`
    }
  })
})
