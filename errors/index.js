const AuthorizationError = require('./authorization-error');
const ConflictError = require('./conflict-error');
const NotFoundError = require('./not-found-error');
const RigthsError = require('./rights-error');
const ValidationError = require('./validation-error');

module.exports = {
  AuthorizationError,
  ConflictError,
  NotFoundError,
  RigthsError,
  ValidationError,
};
