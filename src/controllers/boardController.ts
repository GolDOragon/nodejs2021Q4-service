import { IncomingMessage, ServerResponse } from 'node:http';
import { getResponse } from '../helpers/getResponse';
import * as boardService from '../services/boardService';
import { RESPONSE_CODES } from '../helpers/responseCodes';
import { BoardFields } from '../models/Board.model';

export async function getAllBoards(
  _: IncomingMessage,
  response: ServerResponse
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    boardService.getBoards()
  );
}

export async function getBoardById(
  _: IncomingMessage,
  response: ServerResponse,
  { id }: { id: string }
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    boardService.getBoardById(id)
  );
}

export async function createBoard(
  _: IncomingMessage,
  response: ServerResponse,
  { body }: { body: BoardFields }
) {
  await getResponse(response, RESPONSE_CODES.Created, () =>
    boardService.createBoard(body)
  );
}

export async function updateBoardById(
  _: IncomingMessage,
  response: ServerResponse,
  { id, body }: { id: string; body: BoardFields }
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    boardService.updateBoardById(id, body)
  );
}

export async function deleteBoardById(
  _: IncomingMessage,
  response: ServerResponse,
  { id }: { id: string }
) {
  await getResponse(response, RESPONSE_CODES.Deleted, () =>
    boardService.deleteBoardById(id)
  );
}
