module.exports = {
  async getResponse(response, responseBody) {
    try {
      const body = await responseBody();

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(body));
    } catch (error) {
      response.statusCode = error.code || 500;
      response.write(error.message);
    } finally {
      response.end();
    }
  },
};
