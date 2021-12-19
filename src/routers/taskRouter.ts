import UrlPattern from 'url-pattern';
import { unknownRouter } from './unknownRouter';
import taskController from '../controllers/taskController';
import { validateUUID4 } from '../helpers/validateUUID4';
import { IRouter } from './getRoute';
import { Context } from '../helpers/calcBody';

export const taskPattern = new UrlPattern('/boards/:boardId/tasks(/:taskId)');

export const taskRouter: IRouter<Context> = (request, response, ctx) => {
  const { boardId, taskId } = taskPattern.match(request.url ?? '') as {
    boardId?: string;
    taskId?: string;
  };

  if (!boardId || (boardId && !validateUUID4(boardId))) {
    unknownRouter(request, response, ctx);
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
      unknownRouter(request, response, ctx);
  }
};
