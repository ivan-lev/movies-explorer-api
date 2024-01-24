const jwt = require('jsonwebtoken');

const { AuthorizationError } = require('../errors');
const { ERROR_MESSAGES } = require('../constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
    );
  } catch (err) {
    return next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  req.user = payload;
  return next();
};
