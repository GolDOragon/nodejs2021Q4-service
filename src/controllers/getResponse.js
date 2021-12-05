module.exports = {
  async getResponse(response, code, responseBody) {
    try {
      const body = await responseBody();

      response.writeHead(code, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });
      response.write(JSON.stringify(body));
    } catch (error) {
      response.statusCode = error.code || 500;
      response.write(error.message);
    } finally {
      response.end();
    }
  },
};
