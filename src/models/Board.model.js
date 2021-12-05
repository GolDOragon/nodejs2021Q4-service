const { Entity } = require('./Entity');

class Board extends Entity {
  constructor({ title, columns }) {
    super();

    this.title = title;
    this.columns = columns;
  }

  static isValidArgs({ title, columns }) {
    return typeof title === 'string' && Array.isArray(columns);
  }

  static toResponse({ id, title, columns }) {
    return { id, title, columns };
  }
}

module.exports = { Board };
