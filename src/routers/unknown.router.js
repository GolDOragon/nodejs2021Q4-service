const NOT_FOUND = 404;

const unknownRouter = (request, response) => {
  response.statusCode = NOT_FOUND;
  response.write(
    `Unknown route "${request.url}" or method on this route "${request.method}"`
  );
  response.end();
};

module.exports = { unknownRouter };
