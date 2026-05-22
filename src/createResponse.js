const { buildResponse } = require("./response");

function createResponse(socket) {
  let statusCode = 200;
  let statusText = 'OK';
  const headers = {};

  return {
    status(code) {
      statusCode = code;

      const statusTexts = {
        200: 'OK',
        201: 'Created',
        400: 'Bad Request',
        404: 'Not Found',
        500: 'Internal Server Error'
      };

      statusText = statusTexts[code] || 'Unknown';

      return this;
    },
    set(key, value) {
      headers[key] = value;
      return this;
    },

    json(data) {
      const body = JSON.stringify(data);

      headers['Content-Type'] = 'application/json';

      const response = buildResponse(
        statusCode,
        statusText,
        headers,
        body
      );

      socket.end(response);
    },

    send(text) {
      headers['Content-Type'] = 'text/html';

      const response = buildResponse(
        statusCode,
        statusText,
        headers,
        text
      );

      socket.end(response);
    }
  };
}

module.exports = {
  createResponse
};
