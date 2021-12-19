import { createServer } from 'node:http';
import { calcBody, Context } from './helpers/calcBody';
import { getRouter, IRouter } from './routers/getRoute';

export const app = createServer((request, response) => {
  const router = getRouter(request.url ?? '') as IRouter<Context>;

  calcBody(request, response, router);
});
