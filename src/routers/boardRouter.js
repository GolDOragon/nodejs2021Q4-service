const UrlPattern = require('url-pattern');
const boardController = require('../controllers/boardController');
const { unknownRouter } = require('./unknownRouter');

const boardPattern = new UrlPattern('/boards(/:boardId)');

const boardRouter = (request, response, ctx) => {
  const { boardId } = boardPattern.match(request.url);

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
      unknownRouter(request, response);
  }
};

module.exports = { boardRouter, boardPattern };
