const { ServiceError, SERVICE_ERROR_CODES } = require('../errors/ServiceError');
const { validateUUID4 } = require('../helpers/validateUUID4');
const { boardRepository } = require('../repositories/board.repository');
const { taskRepository } = require('../repositories/task.repository');

async function getTasks(boardId) {
  const tasks = await taskRepository.getAll((task) => task.boardId === boardId);

  return tasks;
}

async function getTaskById({ boardId, taskId }) {
  if (!validateUUID4(boardId)) {
    throw new ServiceError('Invalid board id', SERVICE_ERROR_CODES.INVALID_ID);
  }
  if (!validateUUID4(taskId)) {
    throw new ServiceError('Invalid task id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  const board = await boardRepository.getOne(boardId);

  if (!board) {
    throw new ServiceError('Unknown board', SERVICE_ERROR_CODES.BAD_REQUEST);
  }

  const task = await taskRepository.getOne(taskId);

  if (task.boardId !== boardId) {
    throw new ServiceError('Unknown board', SERVICE_ERROR_CODES.BAD_REQUEST);
  }

  return task;
}

async function createTask(body) {
  return taskRepository.create(body);
}

async function updateUserById(id, body) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  return taskRepository.updateOne(id, body);
}

async function deleteUserById(id) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  return taskRepository.deleteOne(id);
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateUserById,
  deleteUserById,
};
