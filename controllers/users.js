const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NotFoundError, ValidationError, ConflictError } = require('../errors');
const { ERROR_MESSAGES } = require('../constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    })
      .then((user) => {
        const userId = user._id.toString();
        res.status(201).send({
          email,
          name,
          _id: userId,
        });
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          return next(new ValidationError(ERROR_MESSAGES.USER_WRONG_DATA));
        }

        if (error.code === 11000) {
          return next(new ConflictError(ERROR_MESSAGES.USER_EXISTS));
        }

        return next(error);
      }))
    .catch((error) => next(error));
};

module.exports.updateUserInfo = (req, res, next) => {
  const owner = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    owner,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ValidationError(ERROR_MESSAGES.USER_UPDATE_ERROR));
      }

      if (error.name === 'CastError') {
        return next(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND));
      }

      if (error.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGES.USER_EXISTS));
      }

      return next(error);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((error) => next(error));
};

module.exports.getUserInfo = (req, res, next) => {
  const currentUserId = req.user._id;

  User.findById(currentUserId, {
    _id: 1,
    email: 1,
    name: 1,
  })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ValidationError(ERROR_MESSAGES.USER_WRONG_ID));
      }

      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND));
      }

      return next(error);
    });
};
