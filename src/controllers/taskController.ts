import { ServerResponse } from 'node:http';
import { getResponse } from '../helpers/getResponse';
import * as taskService from '../services/taskService';
import { RESPONSE_CODES } from '../helpers/responseCodes';
import { TaskFields } from '../models/Task.model';
import { Request } from '../../typings/Request';

interface IBoardId {
  /** board id */
  boardId: string;
}
interface ITaskId {
  /** task id */
  taskId: string;
}
interface ITaskBody {
  /** task fields */
  body: TaskFields;
}

type GetAllTasksOptions = IBoardId;

/**
 * Get all tasks
 * @param _ - request
 * @param response - response
 * @param options - options {@link GetAllTasksOptions}
 */
export async function getAllTasks(
  request: Request,
  response: ServerResponse,
  { boardId }: GetAllTasksOptions
) {
  await getResponse(request, response, RESPONSE_CODES.OK, () =>
    taskService.getTasks(boardId)
  );
}

interface IGetTaskByIdOptions extends IBoardId, ITaskId {}

/**
 * Get Task by id
 * @param _ - request
 * @param response - response
 * @param options - options {@link IGetTaskByIdOptions}
 */
export async function getTaskById(
  request: Request,
  response: ServerResponse,
  { boardId, taskId }: IGetTaskByIdOptions
) {
  await getResponse(request, response, RESPONSE_CODES.OK, () =>
    taskService.getTaskById({ boardId, taskId })
  );
}

interface ICreateTaskOptions extends IBoardId, ITaskBody {}

/**
 * Create new task from object
 * @param _ - request
 * @param response - response
 * @param options - options {@link ICreateTaskOptions}
 */
export async function createTask(
  request: Request,
  response: ServerResponse,
  { boardId, body }: ICreateTaskOptions
) {
  await getResponse(request, response, RESPONSE_CODES.Created, () =>
    taskService.createTask({ boardId, body })
  );
}

interface IUpdateTaskById extends ITaskId, IBoardId, ITaskBody {}

/**
 * Find task by id and update it
 * @param _ - request
 * @param response - response
 * @param options - options {@link IUpdateTaskById}
 */
export async function updateTaskById(
  request: Request,
  response: ServerResponse,
  { boardId, taskId, body }: IUpdateTaskById
) {
  await getResponse(request, response, RESPONSE_CODES.OK, () =>
    taskService.updateTaskById({ boardId, taskId, body })
  );
}

interface IDeleteTaskById extends ITaskId, IBoardId {}

/**
 * Find task by id and delete it
 * @param _ - request
 * @param response - response
 * @param options - options {@link IDeleteTaskById}
 */
export async function deleteTaskById(
  request: Request,
  response: ServerResponse,
  { boardId, taskId }: IDeleteTaskById
) {
  await getResponse(request, response, RESPONSE_CODES.Deleted, () =>
    taskService.deleteTaskById({ boardId, taskId })
  );
}
