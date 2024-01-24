const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NotFoundError, ValidationError, ConflictError } = require('../errors');

const { JWT_SECRET = 'secret-key', NODE_ENV = 'production' } = process.env;

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
          return next(new ValidationError('При создании пользователя переданы невалидные данные.'));
        }

        if (error.code === 11000) {
          return next(new ConflictError('Такой пользователь уже существует.'));
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
        return next(new ValidationError('При обновлении профиля переданы невалидные данные.'));
      }

      if (error.name === 'CastError') {
        return next(new NotFoundError('Пользователь с таким _id не найден.'));
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
        return next(new ValidationError('Передан некорректный _id пользователя.'));
      }

      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь с таким _id не найден.'));
      }

      return next(error);
    });
};
