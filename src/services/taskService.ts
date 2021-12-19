import { ServiceError, SERVICE_ERROR_CODES } from '../errors/ServiceError';
import { validateUUID4 } from '../helpers/validateUUID4';
import { Task } from '../models/Task.model';
import { boardRepository } from '../repositories/board.repository';
import { taskRepository } from '../repositories/task.repository';

export async function checkTaskInBoard(boardId: string, taskId: string) {
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

export async function getTasks(boardId: string) {
  const tasks = await taskRepository.getAll((task) => task.boardId === boardId);

  return tasks;
}

export async function getTaskById({
  boardId,
  taskId,
}: {
  boardId: string;
  taskId: string;
}) {
  await checkTaskInBoard(boardId, taskId);

  return taskRepository.getOne(taskId);
}

export async function createTask({
  boardId,
  body,
}: {
  boardId: string;
  body: Omit<Task, 'id'>;
}) {
  return taskRepository.create({ ...body, boardId });
}

export async function updateTaskById({
  boardId,
  taskId,
  body,
}: {
  boardId: string;
  taskId: string;
  body: Omit<Task, 'id'>;
}) {
  await checkTaskInBoard(boardId, taskId);

  return taskRepository.updateOne(taskId, body);
}

export async function deleteTaskById({
  boardId,
  taskId,
}: {
  boardId: string;
  taskId: string;
}) {
  await checkTaskInBoard(boardId, taskId);

  return taskRepository.deleteOne(taskId);
}
