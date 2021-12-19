import { IncomingMessage, ServerResponse } from 'node:http';
import { unknownRouter } from './unknownRouter';
import { userPattern, userRouter } from './userRouter';
import { boardPattern, boardRouter } from './boardRouter';
import { Context } from '../helpers/calcBody';
import { taskPattern, taskRouter } from './taskRouter';

export interface IRouter<TContext extends Context> {
  (request: IncomingMessage, response: ServerResponse, ctx: TContext): void;
}

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
