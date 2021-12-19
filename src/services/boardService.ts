import { ServiceError, SERVICE_ERROR_CODES } from '../errors/ServiceError';
import { validateUUID4 } from '../helpers/validateUUID4';
import { Board } from '../models/Board.model';
import { boardRepository } from '../repositories/board.repository';
import { taskRepository } from '../repositories/task.repository';

export async function getBoards() {
  const boards = await boardRepository.getAll();

  return boards;
}

export async function getBoardById(id: string) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  const board = await boardRepository.getOne(id);

  return board;
}

export async function createBoard(body: Omit<Board, 'id'>) {
  return boardRepository.create(body);
}

export async function updateBoardById(id: string, body: Omit<Board, 'id'>) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  return boardRepository.updateOne(id, body);
}

export async function deleteBoardById(id: string) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  const deletedBoard = await boardRepository.deleteOne(id);

  await taskRepository.deleteBy((task) => task.boardId === deletedBoard.id);

  return deletedBoard;
}
