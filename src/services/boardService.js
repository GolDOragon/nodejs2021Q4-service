const { ServiceError, SERVICE_ERROR_CODES } = require('../errors/ServiceError');
const { validateUUID4 } = require('../helpers/validateUUID4');
const { boardRepository } = require('../repositories/board.repository');
const { taskRepository } = require('../repositories/task.repository');

async function getBoards() {
  const boards = await boardRepository.getAll();

  return boards;
}

async function getBoardById(id) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  const board = await boardRepository.getOne(id);

  return board;
}

async function createBoard(body) {
  return boardRepository.create(body);
}

async function updateBoardById(id, body) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  return boardRepository.updateOne(id, body);
}

async function deleteBoardById(id) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  const deletedBoard = await boardRepository.deleteOne(id);

  await taskRepository.deleteBy((task) => task.boardId === deletedBoard.id);

  return deletedBoard;
}

module.exports = {
  getBoardById,
  getBoards,
  createBoard,
  updateBoardById,
  deleteBoardById,
};
