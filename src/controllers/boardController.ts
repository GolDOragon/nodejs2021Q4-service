import { IncomingMessage, ServerResponse } from 'node:http';
import { getResponse } from '../helpers/getResponse';
import * as boardService from '../services/boardService';
import { RESPONSE_CODES } from '../helpers/responseCodes';
import { BoardFields } from '../models/Board.model';

interface IBoardId {
  /** board id */
  id: string;
}

interface IBoardBody {
  /** board fields */
  body: BoardFields;
}

/**
 * Get all boards
 * @param _ - request
 * @param response - response
 */
export async function getAllBoards(
  _: IncomingMessage,
  response: ServerResponse
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    boardService.getBoards()
  );
}

type IGetBoardByIdOptions = IBoardId;

/**
 * Get Board by id
 * @param _ - request
 * @param response - response
 * @param options - options {@link IGetBoardByIdOptions}
 */
export async function getBoardById(
  _: IncomingMessage,
  response: ServerResponse,
  { id }: IGetBoardByIdOptions
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    boardService.getBoardById(id)
  );
}

type ICreateBoardOptions = IBoardBody;

/**
 * Create new board from object
 * @param _ - request
 * @param response - response
 * @param options - options {@link ICreateBoardOptions}
 */
export async function createBoard(
  _: IncomingMessage,
  response: ServerResponse,
  { body }: ICreateBoardOptions
) {
  await getResponse(response, RESPONSE_CODES.Created, () =>
    boardService.createBoard(body)
  );
}

interface IUpdateBoardById extends IBoardId, IBoardBody {}

/**
 * Find Board by id and update it
 * @param _ - request
 * @param response - response
 * @param options - options {@link IUpdateBoardById}
 */
export async function updateBoardById(
  _: IncomingMessage,
  response: ServerResponse,
  { id, body }: IUpdateBoardById
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    boardService.updateBoardById(id, body)
  );
}

type IDeleteBoardById = IBoardId;

/**
 * Find board by id and delete it
 * @param _ - request
 * @param response -response
 * @param options - options {@link IDeleteBoardById}
 */
export async function deleteBoardById(
  _: IncomingMessage,
  response: ServerResponse,
  { id }: IDeleteBoardById
) {
  await getResponse(response, RESPONSE_CODES.Deleted, () =>
    boardService.deleteBoardById(id)
  );
}
