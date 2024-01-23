const Movie = require('../models/movie');

const {
  NotFoundError,
  ValidationError,
  RightsError,
} = require('../errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((error) => next(error));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink = req.body.trailer,
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
        return next(new ValidationError('При создании карточки переданы невалидные данные.'));
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
        return next(new RightsError('Отсутствуют права для удаления карточки.'));
      }
      // если совпадают, то удаляем карточку
      return Movie.deleteOne(movie)
        .then(() => res.send('Карточка удалена: ', movie))
        .catch((error) => next(error));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new ValidationError('Передан некорректный _id карточки для удаления.'));
      }

      if (error.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Карточка с таким _id не найдена.'));
      }

      return next(error);
    });
};
