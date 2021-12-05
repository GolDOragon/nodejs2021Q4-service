const { Entity } = require('./Entity');

class Board extends Entity {
  constructor(title, columns) {
    super();

    this.title = title;
    this.columns = columns;
  }
}

module.exports = { Board };
