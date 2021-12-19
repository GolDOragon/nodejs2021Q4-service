import { IncomingMessage, ServerResponse } from 'node:http';
import { getResponse } from '../helpers/getResponse';
import * as userService from '../services/userService';
import { RESPONSE_CODES } from '../helpers/responseCodes';
import { UserFields } from '../models/User.model';

interface IUserId {
  /** user id */
  id: string;
}
interface IUserBody {
  /** user fields */
  body: UserFields;
}

/**
 * Get all users
 * @param _ - request
 * @param response - response
 */
export async function getAllUsers(
  _: IncomingMessage,
  response: ServerResponse
) {
  await getResponse(response, RESPONSE_CODES.OK, () => userService.getUsers());
}

type IGetUserById = IUserId;

/**
 * Get User by id
 * @param _ - request
 * @param response - response
 * @param options - options {@link IGetUserById}
 */
export async function getUserById(
  _: IncomingMessage,
  response: ServerResponse,
  { id }: IGetUserById
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    userService.getUserById(id)
  );
}

type ICreateUser = IUserBody;

/**
 * Create new user from object
 * @param _ - request
 * @param response - response
 * @param options - options {@link ICreateUser}
 */
export async function createUser(
  _: IncomingMessage,
  response: ServerResponse,
  { body }: ICreateUser
) {
  await getResponse(response, RESPONSE_CODES.Created, () =>
    userService.createUser(body)
  );
}

interface IUpdateUserById extends IUserId, IUserBody {}

/**
 * Find user by id and update it
 * @param _ - request
 * @param response - response
 * @param options - options {@link IUpdateUserById}
 */
export async function updateUserById(
  _: IncomingMessage,
  response: ServerResponse,
  { id, body }: IUpdateUserById
) {
  await getResponse(response, RESPONSE_CODES.OK, () =>
    userService.updateUserById(id, body)
  );
}

type IDeleteTaskById = IUserId;

/**
 * Find user by id and delete it
 * @param _ - request
 * @param response - response
 * @param options - options {@link IDeleteTaskById}
 */
export async function deleteUserById(
  _: IncomingMessage,
  response: ServerResponse,
  { id }: IDeleteTaskById
) {
  await getResponse(response, RESPONSE_CODES.Deleted, () =>
    userService.deleteUserById(id)
  );
}
