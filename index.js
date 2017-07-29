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
if (!process.env.BAMBOO_CONNECTIVITY_HOST) {
    process.env.BAMBOO_CONNECTIVITY_HOST = '127.0.0.1'
}

if (!process.env.BAMBOO_CONNECTIVITY_PORT) {
    process.env.BAMBOO_CONNECTIVITY_PORT = 1883
}

/* winston.js */
const winston = require('winston')

/* Configure CLI output on the default logger */
winston.cli()
winston.info(' * 18.20 at Sep 07 2016 7:20 IR721')

/* Bamboo component initiation */
const BambooComponent = require('@ibamboo/component')

new BambooComponent({
    mqttHost: process.env.BAMBOO_CONNECTIVITY_HOST,
    mqttPort: process.env.BAMBOO_CONNECTIVITY_PORT,
    name: 'trap',
    subscribes: ['log']
}).on('ready', () => {
    winston.info(` * MQTT at ${process.env.BAMBOO_CONNECTIVITY_HOST}:${process.env.BAMBOO_CONNECTIVITY_PORT}`)
}).on('log', (message) => {
    winston.data(message)
})
