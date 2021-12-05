const { validateUUID4 } = require('../helpers/validateUUID4');
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

  static isValidArgs({ title, order, description, userId, boardId }) {
    return (
      typeof title === 'string' &&
      typeof order === 'number' &&
      typeof description === 'string' &&
      (validateUUID4(userId) || userId === null) &&
      validateUUID4(boardId)
    );
  }

  static toResponse({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }) {
    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
  }
}

module.exports = { Task };
