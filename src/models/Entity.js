const crypto = require('crypto');

class Entity {
  constructor() {
    this.id = crypto.randomUUID();
  }
}

module.exports = { Entity };
