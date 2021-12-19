import { IncomingMessage, ServerResponse } from 'http';

export type Context = { body: string | object };

export const calcBody = (
  request: IncomingMessage,
  response: ServerResponse,
  router: (
    request: IncomingMessage,
    response: ServerResponse,
    context: Context
  ) => void
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

    // move on to next step in handling response
    router(request, response, context);
  });
};
