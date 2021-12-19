import { Context } from '../helpers/calcBody';
import type { IRouter } from './getRoute';

const NOT_FOUND = 404;

/**
 * Used if Client request un-exist endpoint
 * @param request Request
 * @param response Response
 * @param ctx optional Context
 */
export const unknownRouter: IRouter<Context> = (request, response) => {
  response.statusCode = NOT_FOUND;
  response.write(
    `Unknown route "${request.url ?? ''}" or method on this route "${
      request.method ?? ''
    }"`
  );
  response.end();
};
