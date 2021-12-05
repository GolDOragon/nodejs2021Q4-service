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

async function createTask(request, response, { boardId, body }) {
  getResponse(response, RESPONSE_CODES.Created, () =>
    taskService.createTask({ boardId, body })
  );
}

async function updateTaskById(request, response, { boardId, taskId, body }) {
  getResponse(response, RESPONSE_CODES.OK, () =>
    taskService.updateTaskById({ boardId, taskId, body })
  );
}

async function deleteTaskById(request, response, { boardId, taskId }) {
  getResponse(response, RESPONSE_CODES.Deleted, () =>
    taskService.deleteTaskById({ boardId, taskId })
  );
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};
