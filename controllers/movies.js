const Movie = require('../models/movie');

const {
  NotFoundError,
  ValidationError,
  RightsError,
} = require('../errors');

const { ERROR_MESSAGES } = require('../constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((error) => next(error));
};

module.exports.saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner = req.user._id,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ValidationError(ERROR_MESSAGES.MOVIE_WRONG_DATA));
      }

      return next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const currentUserId = req.user._id;

  // ищем кино, возвращаем _id владельца и сравниваем с id пользователя
  Movie.findById({ _id: req.params.movieId }, { owner: 1 })
    .orFail()
    .then((movie) => {
      // если _id не совпадают, то отправляем ошибку
      if (currentUserId.toString() !== movie.owner.toString()) {
        return next(new RightsError(ERROR_MESSAGES.MOVIE_UNAUTH_DELETION));
      }
      // если совпадают, то удаляем карточку
      return Movie.deleteOne(movie)
        .then(() => res.send(movie))
        .catch((error) => next(error));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ValidationError(ERROR_MESSAGES.MOVIE_WRONG_ID));
      }

      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(ERROR_MESSAGES.MOVIE_NOT_FOUND));
      }

      return next(error);
    });
};
