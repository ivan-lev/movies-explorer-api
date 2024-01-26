const ERROR_MESSAGES = {
  DEFAULT_MESSAGE: 'На сервере произошла ошибка',
  UNAUTHORIZED: 'Необходима авторизация',
  PAGE_NOT_FOUND: 'Страница не найдена',

  USER_WRONG_DATA: 'При создании пользователя переданы невалидные данные',
  USER_EXISTS: 'Пользователь с таким email уже существует',
  USER_UPDATE_ERROR: 'При обновлении профиля переданы невалидные данные',
  USER_NOT_FOUND: 'Пользователь с таким _id не найден',
  USER_WRONG_ID: 'Передан некорректный _id пользователя',
  USER_WRONG_CREDENTIALS: 'Неправильные почта или пароль',

  MOVIE_WRONG_DATA: 'При сохранении фильма переданы невалидные данные',
  MOVIE_UNAUTH_DELETION: 'Отсутствуют права для удаления фильма',
  MOVIE_WRONG_ID: 'Передан некорректный _id фильма для удаления',
  MOVIE_NOT_FOUND: 'Фильм с таким _id не найден',
};

const URL_REGEXP = /(https?:\/\/)(www\.)?[\w-]+\.[a-z]{2,6}[\w\-._~:/?#[\]@!$&'()*+,;=]*/;

module.exports = { ERROR_MESSAGES, URL_REGEXP };
