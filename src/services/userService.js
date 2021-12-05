const { ServiceError, SERVICE_ERROR_CODES } = require('../errors/ServiceError');
const { validateUUID4 } = require('../helpers/validateUUID4');
const { userRepository } = require('../repositories/user.repository');

async function getUsers() {
  const users = await userRepository.getAll();

  return users;
}

async function getUserById(id) {
  if (!validateUUID4) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  const user = await userRepository.getOne(id);

  return user;
}

async function createUser(body) {
  return userRepository.create(body);
}

async function updateUserById(id, body) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  return userRepository.updateOne(id, body);
}

async function deleteUserById(id) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  return userRepository.deleteOne(id);
}

module.exports = {
  getUserById,
  getUsers,
  createUser,
  updateUserById,
  deleteUserById,
};
