const userService = require('../services/userService');
const { getResponse } = require('./getResponse');

const CODES = {
  OK: 200,
  Created: 201,
  Deleted: 204,
};

async function getAllUsers(request, response) {
  getResponse(response, CODES.OK, () => userService.getUsers());
}

async function getUserById(request, response, { id }) {
  getResponse(response, CODES.OK, () => userService.getUserById(id));
}

async function createUser(request, response, { body }) {
  getResponse(response, CODES.Created, () => userService.createUser(body));
}

async function updateUserById(request, response, { id, body }) {
  getResponse(response, CODES.OK, () => userService.updateUserById(id, body));
}

async function deleteUserById(request, response, { id }) {
  getResponse(response, CODES.Deleted, () => userService.deleteUserById(id));
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
