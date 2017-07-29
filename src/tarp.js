/*
 * +===============================================
 * | Author:        Parham Alvani (parham.alvani@gmail.com)
 * |
 * | Creation Date: 29-07-2017
 * |
 * | File Name:     tarp.js
 * +===============================================
 */


class BambooTrap {
  constructor (port) {
    this.io = require('socket.io')(port)
  }

  message (name, data) {
    this.io.of('/Bamboo').emit(name, data)
  }
}

module.exports = BambooTrap
