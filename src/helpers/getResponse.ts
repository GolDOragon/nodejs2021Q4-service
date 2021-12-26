import { ServerResponse } from 'http';
import { Request } from '../../typings/Request';
import { AppError } from '../errors/AppError';
import { logger } from '../logger';

/**
 * Prepare and send response to a client
 * @param response - response {@link ServerResponse}
 * @param code - status code
 * @param responseBody - function that calculate body for response
 */
export async function getResponse(
  request: Request,
  response: ServerResponse,
  code: number,
  responseBody: () => Promise<object>
) {
  try {
    const body = await responseBody();

    response.writeHead(code, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    response.write(JSON.stringify(body));
  } catch (error) {
    if (error instanceof AppError) {
      response.statusCode = error.code || 500;
      response.write(error.message);
    } else {
      response.statusCode = 500;
      response.write('Unknown error');
      logger.error('Unknown error', { code: 500 });
    }
  } finally {
    logger.http('Request:', {
      body: request.body,
      url: request.url,
      code,
    });
    response.end();
  }
}
