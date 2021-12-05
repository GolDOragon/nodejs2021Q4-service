const { Entity } = require('./Entity');

class Task extends Entity {
  constructor({ title, order, description, userId, boardId, columnId }) {
    super();

    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = { Task };
