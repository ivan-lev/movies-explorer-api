const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const AuthorizationError = require('../errors/authorization-error');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: [true, 'Поле email должно быть заполнено'],
    unique: [true, 'Этот адрес почты уже используется'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный email',
    },
  },

  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'],
    select: false,
  },

  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
