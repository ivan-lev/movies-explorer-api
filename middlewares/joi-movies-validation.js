const { celebrate, Joi } = require('celebrate');

const linkRegEx = /(https?:\/\/)(www\.)?[\w-]+\.[a-z]{2,6}[\w\-._~:/?#[\]@!$&'()*+,;=]*/;

module.exports.validateJoiCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().min(0).required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().uri().required().pattern(linkRegEx),
    trailer: Joi.string().uri().required().pattern(linkRegEx),
    thumbnail: Joi.string().uri().required().pattern(linkRegEx),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateJoiMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
