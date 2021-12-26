import { ServerResponse } from 'node:http';
import { getResponse } from '../helpers/getResponse';
import * as userService from '../services/userService';
import { RESPONSE_CODES } from '../helpers/responseCodes';
import { UserFields } from '../models/User.model';
import { Request } from '../../typings/Request';

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
export async function getAllUsers(request: Request, response: ServerResponse) {
  await getResponse(request, response, RESPONSE_CODES.OK, () =>
    userService.getUsers()
  );
}

type IGetUserById = IUserId;

/**
 * Get User by id
 * @param _ - request
 * @param response - response
 * @param options - options {@link IGetUserById}
 */
export async function getUserById(
  request: Request,
  response: ServerResponse,
  { id }: IGetUserById
) {
  await getResponse(request, response, RESPONSE_CODES.OK, () =>
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
  request: Request,
  response: ServerResponse,
  { body }: ICreateUser
) {
  await getResponse(request, response, RESPONSE_CODES.Created, () =>
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
  request: Request,
  response: ServerResponse,
  { id, body }: IUpdateUserById
) {
  await getResponse(request, response, RESPONSE_CODES.OK, () =>
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
  request: Request,
  response: ServerResponse,
  { id }: IDeleteTaskById
) {
  await getResponse(request, response, RESPONSE_CODES.Deleted, () =>
    userService.deleteUserById(id)
  );
}
