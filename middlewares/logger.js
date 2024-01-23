const { transports, format } = require('winston');
const expressWinston = require('express-winston');

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new transports.File({ filename: './logs/request.log' }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new transports.File({ filename: './logs/error.log' }),
  ],
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
});
