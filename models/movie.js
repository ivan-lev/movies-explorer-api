const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({

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

  image: {
    type: String,
    required: [true, 'Для фильма нужен постер'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Некорректный URL для постера',
    },
  },

  trailerLink: {
    type: String,
    required: [true, 'Для фильма нужен трейлер'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Некорректный URL для трейлера',
    },
  },

  thumbnail: {
    type: String,
    required: [true, 'Нет картинки для предпросмотра'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Некорректный URL для постера',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
    select: false,
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

module.exports = mongoose.model('movie', movieSchema);
