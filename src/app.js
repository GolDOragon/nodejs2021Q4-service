const { createServer } = require('node:http');
const { calcBody } = require('./helpers/calcBody');
const { getRouter } = require('./routers/getRoute');

const app = createServer((request, response) => {
  const router = getRouter(request.url);

  calcBody(request, response, router);
});

module.exports = { app };
