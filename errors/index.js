const AuthorizationError = require('./authorization-error');
const ConflictError = require('./conflict-error');
const NotFoundError = require('./not-found-error');
const RightsError = require('./rights-error');
const ValidationError = require('./validation-error');

module.exports = {
  AuthorizationError,
  ConflictError,
  NotFoundError,
  RightsError,
  ValidationError,
};
