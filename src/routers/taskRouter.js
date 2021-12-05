const UrlPattern = require('url-pattern');
const { unknownRouter } = require('./unknownRouter');
const taskController = require('../controllers/taskController');
const { validateUUID4 } = require('../helpers/validateUUID4');

const taskPattern = new UrlPattern('/boards/:boardId/tasks(/:taskId)');

const taskRouter = (request, response, ctx) => {
  const { boardId, taskId } = taskPattern.match(request.url);

  if (!validateUUID4(boardId)) {
    unknownRouter(request, response);
  }

  switch (request.method) {
    case 'GET':
      if (taskId) {
        taskController.getTaskById(request, response, { boardId, taskId });
      } else {
        taskController.getAllTasks(request, response, { boardId });
      }
      break;

    case 'POST':
      taskController.createTask(request, response, { boardId, body: ctx.body });
      break;

    case 'PUT':
      taskController.updateTaskById(request, response, {
        boardId,
        taskId,
        body: ctx.body,
      });
      break;

    case 'DELETE':
      taskController.deleteTaskById(request, response, {
        boardId,
        taskId,
      });
      break;

    default:
      unknownRouter(request, response);
  }
};

module.exports = { taskRouter, taskPattern };
