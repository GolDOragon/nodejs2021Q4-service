const { getResponse } = require('../helpers/getResponse');
const userService = require('../services/userService');
const { RESPONSE_CODES } = require('../helpers/responseCodes');

async function getAllUsers(request, response) {
  getResponse(response, RESPONSE_CODES.OK, () => userService.getUsers());
}

async function getUserById(request, response, { id }) {
  getResponse(response, RESPONSE_CODES.OK, () => userService.getUserById(id));
}

async function createUser(request, response, { body }) {
  getResponse(response, RESPONSE_CODES.Created, () =>
    userService.createUser(body)
  );
}

async function updateUserById(request, response, { id, body }) {
  getResponse(response, RESPONSE_CODES.OK, () =>
    userService.updateUserById(id, body)
  );
}

async function deleteUserById(request, response, { id }) {
  getResponse(response, RESPONSE_CODES.Deleted, () =>
    userService.deleteUserById(id)
  );
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
