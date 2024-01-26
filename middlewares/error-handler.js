const { ERROR_MESSAGES } = require('../constants');

module.exports.errorHandler = (err, req, res, next) => {
  // ставим для непредвиденной ошибки статус 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // если статус 500, генерируем сообщение сами
      message: statusCode === 500
        ? ERROR_MESSAGES.DEFAULT_MESSAGE
        : message,
    });
  next();
};
