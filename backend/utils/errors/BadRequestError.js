const { STATUS_BAD_REQUEST } = require('../../config');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequestError;
