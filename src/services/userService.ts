import { ServiceError, SERVICE_ERROR_CODES } from '../errors/ServiceError';
import { validateUUID4 } from '../helpers/validateUUID4';
import { User } from '../models/User.model';
import { taskRepository } from '../repositories/task.repository';
import { userRepository } from '../repositories/user.repository';

export async function getUsers() {
  const users = await userRepository.getAll();

  return users;
}

export async function getUserById(id: string) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  const user = await userRepository.getOne(id);

  return user;
}

export async function createUser(body: Omit<User, 'id'>) {
  return userRepository.create(body);
}

export async function updateUserById(id: string, body: Omit<User, 'id'>) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  return userRepository.updateOne(id, body);
}

export async function deleteUserById(id: string) {
  if (!validateUUID4(id)) {
    throw new ServiceError('Invalid id', SERVICE_ERROR_CODES.INVALID_ID);
  }

  const deletedUser = await userRepository.deleteOne(id);

  const userTasks = await taskRepository.getAll(
    ({ userId }) => userId === deletedUser.id
  );

  await Promise.all(
    userTasks.map((task) =>
      taskRepository.updateOne(task.id ?? '', { ...task, userId: null })
    )
  );

  return deletedUser;
}
