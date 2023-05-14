const { STATUS_UNAUTHORIZED } = require('../../config');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
