import UrlPattern from 'url-pattern';
import userController from '../controllers/userController';
import { User } from '../models/User.model';
import type { IRouter } from './getRoute';
import { unknownRouter } from './unknownRouter';

export const userPattern = new UrlPattern('/users(/:userId)');

export const userRouter: IRouter<{ body: Partial<User> }> = (
  request,
  response,
  ctx
) => {
  const { userId } = userPattern.match(request.url ?? '') as {
    userId?: string;
  };

  switch (request.method) {
    case 'GET':
      if (userId) {
        userController.getUserById(request, response, { id: userId });
      } else {
        userController.getAllUsers(request, response);
      }
      break;

    case 'POST':
      userController.createUser(request, response, { body: ctx.body });
      break;

    case 'PUT':
      userController.updateUserById(request, response, {
        id: userId,
        body: ctx.body,
      });
      break;

    case 'DELETE':
      userController.deleteUserById(request, response, {
        id: userId,
      });
      break;

    default:
      unknownRouter(request, response, ctx);
  }
};
