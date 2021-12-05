const calcBody = (request, response, router) => {
  const context = {};
  const data = [];

  // assemble stream of data from request body
  request.on('data', (dataChunk) => {
    data.push(dataChunk);
  });

  request.on('end', () => {
    context.body = Buffer.concat(data).toString();

    if (request.headers['content-type'] === 'application/json') {
      try {
        context.body = JSON.parse(context.body);
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

module.exports = { calcBody };
