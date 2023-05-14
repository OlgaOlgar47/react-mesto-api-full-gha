const { STATUS_FORBITTEN } = require('../../config');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_FORBITTEN;
  }
}

module.exports = ForbiddenError;
