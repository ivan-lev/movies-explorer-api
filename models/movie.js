const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

  country: {
    type: String,
    required: [true, 'Нужно указать страну, где сняли фильм'],
  },

  director: {
    type: String,
    required: [true, 'Нужно написать имя режиссёра'],
  },

  duration: {
    type: Number,
    required: [true, 'Нужно заполнить длительность фильма'],
  },

  year: {
    type: String,
    required: [true, 'Нужно указать год создания фильма'],
  },

  description: {
    type: String,
    required: [true, 'Нужно заполнить описание фильма'],
  },

  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },

  image: {
    type: String,
    ruquired: [true, 'Для фильма нужен постер'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL для постера',
    },
  },

  trailerLink: {
    type: String,
    ruquired: [true, 'Для фильма нужен трейлер'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL для трейлера',
    },
  },

  thumbnail: {
    type: String,
    ruquired: [true, 'Нет картинки для предпросмотра'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL для постера',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },

  // film id in MoviesExplorer response
  movieId: {
    type: Number,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },

  nameRU: {
    type: String,
    required: [true, 'Не заполнено название на русском языке'],
  },

  nameEN: {
    type: String,
    required: [true, 'Не заполнено название на английском языке'],
  },

}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
