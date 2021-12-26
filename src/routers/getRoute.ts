import { ServerResponse } from 'node:http';
import { unknownRouter } from './unknownRouter';
import { userPattern, userRouter } from './userRouter';
import { boardPattern, boardRouter } from './boardRouter';
import { Context } from '../helpers/calcBody';
import { taskPattern, taskRouter } from './taskRouter';
import { Request } from '../../typings/Request';

export interface IRouter<TContext extends Context> {
  (request: Request, response: ServerResponse, ctx: TContext): void;
}

/**
 * Find which route is in use and return required router {@link IRouter}
 * @param url - endpoint
 * @returns router, if route doesn't exist returns {@link unknownRouter}
 */
export const getRouter = (url: string) => {
  if (!!userPattern.match(url)) {
    return userRouter;
  }

  if (!!boardPattern.match(url)) {
    return boardRouter;
  }

  if (!!taskPattern.match(url)) {
    return taskRouter;
  }

  return unknownRouter;
};
