const { ServiceError, SERVICE_ERROR_CODES } = require('../errors/ServiceError');
const { validateUUID4 } = require('../helpers/validateUUID4');
const { boardRepository } = require('../repositories/board.repository');
const { taskRepository } = require('../repositories/task.repository');

async function checkTaskInBoard(boardId, taskId) {
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

  if (task.boardId !== board.id) {
    throw new ServiceError(
      "Task doesn't exist",
      SERVICE_ERROR_CODES.BAD_REQUEST
    );
  }

  return true;
}

async function getTasks(boardId) {
  const tasks = await taskRepository.getAll((task) => task.boardId === boardId);

  return tasks;
}

async function getTaskById({ boardId, taskId }) {
  await checkTaskInBoard(boardId, taskId);

  return taskRepository.getOne(taskId);
}

async function createTask({ boardId, body }) {
  return taskRepository.create({ ...body, boardId });
}

async function updateTaskById({ boardId, taskId, body }) {
  await checkTaskInBoard(boardId, taskId);

  return taskRepository.updateOne(taskId, body);
}

async function deleteTaskById({ boardId, taskId }) {
  await checkTaskInBoard(boardId, taskId);

  return taskRepository.deleteOne(taskId);
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
