import { ServerResponse } from 'http';
import { AppError } from '../errors/AppError';

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
