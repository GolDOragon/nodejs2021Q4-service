import { createServer } from 'node:http';
import { calcBody, Context } from './helpers/calcBody';
import { logger } from './logger';
import { getRouter, IRouter } from './routers/getRoute';

export const app = createServer((request, response) => {
  const router = getRouter(request.url ?? '') as IRouter<Context>;

  calcBody(request, response, router);
});

process.on('uncaughtException', (error) => {
  logger.error(error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason: { message: string }) => {
  logger.error(reason.message);
  process.exit(1);
});
