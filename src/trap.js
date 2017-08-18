/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 29-07-2017
 * |
 * | File Name:     trap.js
 * +===============================================
 */

class BambooTrap {
  constructor (port) {
    const app = require('http').createServer()
    this.io = require('socket.io')(app)

    app.listen(port)
  }

  message (name, data) {
    this.io.of('/Bamboo').emit(name, data)
  }
}

module.exports = BambooTrap
