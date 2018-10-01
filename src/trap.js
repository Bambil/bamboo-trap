/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 29-07-2017
 * |
 * | File Name:     trap.js
 * +===============================================
 */

class I1820Trap {
  // create new socket.io server that listens on given port
  constructor (port) {
    const app = require('http').createServer()
    this.io = require('socket.io')(app)

    app.listen(port)
  }

  // messages publishes data on given topic
  message (topic, data) {
    this.io.of('/I1820').emit(topic, data)
  }
}

module.exports = I1820Trap
