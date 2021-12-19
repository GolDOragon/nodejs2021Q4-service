import UrlPattern from 'url-pattern';
import boardController from '../controllers/boardController';
import { Context } from '../helpers/calcBody';
import { IRouter } from './getRoute';
import { unknownRouter } from './unknownRouter';

export const boardPattern = new UrlPattern('/boards(/:boardId)');

export const boardRouter: IRouter<Context> = (request, response, ctx) => {
  const { boardId } = boardPattern.match(request.url ?? '') as {
    boardId?: string;
  };

  switch (request.method) {
    case 'GET':
      if (boardId) {
        boardController.getBoardById(request, response, { id: boardId });
      } else {
        boardController.getAllBoards(request, response);
      }
      break;

    case 'POST':
      boardController.createBoard(request, response, { body: ctx.body });
      break;

    case 'PUT':
      boardController.updateBoardById(request, response, {
        id: boardId,
        body: ctx.body,
      });
      break;

    case 'DELETE':
      boardController.deleteBoardById(request, response, {
        id: boardId,
      });
      break;

    default:
      unknownRouter(request, response, ctx);
  }
};
