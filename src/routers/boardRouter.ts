import UrlPattern from 'url-pattern';
import * as boardController from '../controllers/boardController';
import { Board } from '../models/Board.model';
import { IRouter } from './getRoute';
import { unknownRouter } from './unknownRouter';

export const boardPattern = new UrlPattern('/boards(/:boardId)');

export const boardRouter: IRouter<{ body: Omit<Board, 'id'> }> = async (
  request,
  response,
  ctx
) => {
  const { boardId } = boardPattern.match(request.url ?? '') as {
    boardId?: string;
  };

  switch (request.method) {
    case 'GET':
      if (boardId) {
        await boardController.getBoardById(request, response, { id: boardId });
      } else {
        await boardController.getAllBoards(request, response);
      }
      break;

    case 'POST':
      await boardController.createBoard(request, response, { body: ctx.body });
      break;

    case 'PUT':
      await boardController.updateBoardById(request, response, {
        id: boardId ?? '',
        body: ctx.body,
      });
      break;

    case 'DELETE':
      await boardController.deleteBoardById(request, response, {
        id: boardId ?? '',
      });
      break;

    default:
      unknownRouter(request, response, ctx);
  }
};
