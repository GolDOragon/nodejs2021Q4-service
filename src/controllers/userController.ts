import { IncomingMessage, ServerResponse } from 'node:http';
import { getResponse } from '../helpers/getResponse';
import userService from '../services/userService';
import { RESPONSE_CODES } from '../helpers/responseCodes';
import { User } from '../models/User.model';

export async function getAllUsers(
  _: IncomingMessage,
  response: ServerResponse
) {
  await getResponse(response, RESPONSE_CODES.OK, () => userService.getUsers());
}

export async function getUserById(
  _: IncomingMessage,
  response: ServerResponse,
  { id }: { id: string }
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    userService.getUserById(id)
  );
}

export async function createUser(
  _: IncomingMessage,
  response: ServerResponse,
  { body }: { body: Partial<User> }
) {
  await getResponse(response, RESPONSE_CODES.Created, () =>
    userService.createUser(body)
  );
}

export async function updateUserById(
  _: IncomingMessage,
  response: ServerResponse,
  { id, body }: { id: string; body: Partial<User> }
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    userService.updateUserById(id, body)
  );
}

export async function deleteUserById(
  _: IncomingMessage,
  response: ServerResponse,
  { id }: { id: string }
) {
  await getResponse(response, RESPONSE_CODES.Deleted, () =>
    userService.deleteUserById(id)
  );
}
