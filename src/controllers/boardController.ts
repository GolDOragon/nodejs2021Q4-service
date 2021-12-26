import { ServerResponse } from 'node:http';
import { getResponse } from '../helpers/getResponse';
import * as boardService from '../services/boardService';
import { RESPONSE_CODES } from '../helpers/responseCodes';
import { BoardFields } from '../models/Board.model';
import { Request } from '../../typings/Request';

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
export async function getAllBoards(request: Request, response: ServerResponse) {
  await getResponse(request, response, RESPONSE_CODES.OK, () =>
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
  request: Request,
  response: ServerResponse,
  { id }: IGetBoardByIdOptions
) {
  await getResponse(request, response, RESPONSE_CODES.OK, () =>
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
  request: Request,
  response: ServerResponse,
  { body }: ICreateBoardOptions
) {
  await getResponse(request, response, RESPONSE_CODES.Created, () =>
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
  request: Request,
  response: ServerResponse,
  { id, body }: IUpdateBoardById
) {
  await getResponse(request, response, RESPONSE_CODES.OK, () =>
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
  request: Request,
  response: ServerResponse,
  { id }: IDeleteBoardById
) {
  await getResponse(request, response, RESPONSE_CODES.Deleted, () =>
    boardService.deleteBoardById(id)
  );
}
