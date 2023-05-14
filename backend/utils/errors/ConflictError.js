const { STATUS_CONFLICT } = require('../../config');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CONFLICT;
  }
}

module.exports = ConflictError;
