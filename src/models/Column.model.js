const { Entity } = require('./Entity');

class Column extends Entity {
  constructor(title, order) {
    super();

    this.title = title;
    this.order = order;
  }
}

module.exports = { Column };
