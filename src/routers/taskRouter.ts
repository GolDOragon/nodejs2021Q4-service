import UrlPattern from 'url-pattern';
import { unknownRouter } from './unknownRouter';
import * as taskController from '../controllers/taskController';
import { validateUUID4 } from '../helpers/validateUUID4';
import { IRouter } from './getRoute';
import { TaskFields } from '../models/Task.model';

export const taskPattern = new UrlPattern('/boards/:boardId/tasks(/:taskId)');

type TaskContext = {
  body: TaskFields;
};

/**
 * Work with task route
 * @param request - Request
 * @param response - Response
 * @param ctx - context {@link TaskContext}
 */
export const taskRouter: IRouter<TaskContext> = async (
  request,
  response,
  ctx
) => {
  const { boardId, taskId } = taskPattern.match(request.url ?? '') as {
    boardId?: string;
    taskId?: string;
  };

  if (!boardId || !validateUUID4(boardId)) {
    unknownRouter(request, response, ctx);
  }

  switch (request.method) {
    case 'GET':
      if (taskId) {
        await taskController.getTaskById(request, response, {
          boardId: boardId ?? '',
          taskId,
        });
      } else {
        await taskController.getAllTasks(request, response, {
          boardId: boardId ?? '',
        });
      }
      break;

    case 'POST':
      await taskController.createTask(request, response, {
        boardId: boardId ?? '',
        body: ctx.body,
      });
      break;

    case 'PUT':
      await taskController.updateTaskById(request, response, {
        boardId: boardId ?? '',
        taskId: taskId ?? '',
        body: ctx.body,
      });
      break;

    case 'DELETE':
      await taskController.deleteTaskById(request, response, {
        boardId: boardId ?? '',
        taskId: taskId ?? '',
      });
      break;

    default:
      unknownRouter(request, response, ctx);
  }
};
