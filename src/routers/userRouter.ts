import UrlPattern from 'url-pattern';
import * as userController from '../controllers/userController';
import { UserFields } from '../models/User.model';
import type { IRouter } from './getRoute';
import { unknownRouter } from './unknownRouter';

export const userPattern = new UrlPattern('/users(/:userId)');

type UserContext = {
  body: UserFields;
};

/**
 * Work with user route
 * @param request Request
 * @param response Response
 * @param ctx context {@link UserContext}
 */
export const userRouter: IRouter<UserContext> = async (
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
        await userController.getUserById(request, response, { id: userId });
      } else {
        await userController.getAllUsers(request, response);
      }
      break;

    case 'POST':
      await userController.createUser(request, response, { body: ctx.body });
      break;

    case 'PUT':
      await userController.updateUserById(request, response, {
        id: userId ?? '',
        body: ctx.body,
      });
      break;

    case 'DELETE':
      await userController.deleteUserById(request, response, {
        id: userId ?? '',
      });
      break;

    default:
      unknownRouter(request, response, ctx);
  }
};
