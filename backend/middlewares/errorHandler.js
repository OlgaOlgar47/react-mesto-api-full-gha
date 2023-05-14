const {
  STATUS_INTERNAL_SERVER_ERROR,
  DEFAULT_ERROR_MESSAGE,
} = require('../config');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).json({
    // проверяем статус и выставляем сообщение в зависимости от него
    message:
      statusCode === STATUS_INTERNAL_SERVER_ERROR
        ? DEFAULT_ERROR_MESSAGE
        : message,
  });
};

module.exports = errorHandler;
