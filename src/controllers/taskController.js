const { getResponse } = require('../helpers/getResponse');
const taskService = require('../services/taskService');
const { RESPONSE_CODES } = require('../helpers/responseCodes');

async function getAllTasks(request, response, { boardId }) {
  getResponse(response, RESPONSE_CODES.OK, () => taskService.getTasks(boardId));
}

async function getTaskById(request, response, { boardId, taskId }) {
  getResponse(response, RESPONSE_CODES.OK, () =>
    taskService.getTaskById({ boardId, taskId })
  );
}

async function createTask(request, response, { body }) {
  getResponse(response, RESPONSE_CODES.Created, () =>
    taskService.createUser(body)
  );
}

async function updateTaskById(request, response, { id, body }) {
  getResponse(response, RESPONSE_CODES.OK, () =>
    taskService.updateUserById(id, body)
  );
}

async function deleteTaskById(request, response, { id }) {
  getResponse(response, RESPONSE_CODES.Deleted, () =>
    taskService.deleteUserById(id)
  );
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
