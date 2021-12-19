import { IncomingMessage, ServerResponse } from 'node:http';
import { getResponse } from '../helpers/getResponse';
import * as taskService from '../services/taskService';
import { RESPONSE_CODES } from '../helpers/responseCodes';
import { Task } from '../models/Task.model';

export async function getAllTasks(
  _: IncomingMessage,
  response: ServerResponse,
  { boardId }: { boardId: string }
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    taskService.getTasks(boardId)
  );
}

export async function getTaskById(
  _: IncomingMessage,
  response: ServerResponse,
  { boardId, taskId }: { boardId: string; taskId: string }
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    taskService.getTaskById({ boardId, taskId })
  );
}

export async function createTask(
  _: IncomingMessage,
  response: ServerResponse,
  { boardId, body }: { boardId: string; body: Omit<Task, 'id'> }
) {
  await getResponse(response, RESPONSE_CODES.Created, () =>
    taskService.createTask({ boardId, body })
  );
}

export async function updateTaskById(
  _: IncomingMessage,
  response: ServerResponse,
  {
    boardId,
    taskId,
    body,
  }: { boardId: string; taskId: string; body: Omit<Task, 'id'> }
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    taskService.updateTaskById({ boardId, taskId, body })
  );
}

export async function deleteTaskById(
  _: IncomingMessage,
  response: ServerResponse,
  { boardId, taskId }: { boardId: string; taskId: string }
) {
  await getResponse(response, RESPONSE_CODES.Deleted, () =>
    taskService.deleteTaskById({ boardId, taskId })
  );
}
