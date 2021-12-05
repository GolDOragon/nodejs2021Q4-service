const { getResponse } = require('./getResponse');
const boardService = require('../services/board.service');
const { RESPONSE_CODES } = require('../helpers/responseCodes');

async function getAllBoards(request, response) {
  getResponse(response, RESPONSE_CODES.OK, () => boardService.getBoards());
}
async function getBoardById(request, response, { id }) {
  getResponse(response, RESPONSE_CODES.OK, () => boardService.getBoardById(id));
}

async function createBoard(request, response, { body }) {
  getResponse(response, RESPONSE_CODES.Created, () =>
    boardService.createBoard(body)
  );
}

async function updateBoardById(request, response, { id, body }) {
  getResponse(response, RESPONSE_CODES.OK, () =>
    boardService.updateBoardById(id, body)
  );
}

async function deleteBoardById(request, response, { id }) {
  getResponse(response, RESPONSE_CODES.Deleted, () =>
    boardService.deleteBoardById(id)
  );
}

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoardById,
  deleteBoardById,
};
