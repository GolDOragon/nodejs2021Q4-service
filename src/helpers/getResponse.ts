import { ServerResponse } from 'http';
import { AppError } from '../errors/AppError';

/**
 * Prepare and send response to a client
 * @param response - response {@link ServerResponse}
 * @param code - status code
 * @param responseBody - function that calculate body for response
 */
export async function getResponse(
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
    }
  } finally {
    response.end();
  }
}
