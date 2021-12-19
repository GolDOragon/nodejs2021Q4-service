import { createServer } from 'node:http';
import { calcBody } from './helpers/calcBody';
import { getRouter } from './routers/getRoute';

export const app = createServer((request, response) => {
  const router = getRouter(request.url);

  calcBody(request, response, router);
});
