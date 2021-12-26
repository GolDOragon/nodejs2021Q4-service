import { IncomingMessage, ServerResponse } from 'http';
import { Request } from '../../typings/Request';
import { IRouter } from '../routers/getRoute';

export type Context = { body: string | object };

/**
 * Calculate body from request and add it into context
 * @param request - request
 * @param response - response
 * @param router - one of API routers {@link IRouter}
 */
export const calcBody = (
  request: IncomingMessage,
  response: ServerResponse,
  router: IRouter<Context>
) => {
  const context: Context = { body: '' };
  const data: Uint8Array[] = [];

  // assemble stream of data from request body
  request.on('data', (dataChunk: Uint8Array) => {
    data.push(dataChunk);
  });

  request.on('end', () => {
    context.body = Buffer.concat(data).toString();

    if (request.headers['content-type'] === 'application/json') {
      try {
        context.body = JSON.parse(context.body) as object;
      } catch {
        response.statusCode = 500;
        response.write("Can't parse JSON");
        response.end();
      }
    }

    (request as Request).body = context.body as object;

    // move on to next step in handling response
    router(request as Request, response, context);
  });
};
