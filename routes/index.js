const routes = require('express').Router();

const { validateJoiSignup, validateJoiSignin } = require('../middlewares/joi-users-validation');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { NotFoundError } = require('../errors');

routes.post('/signup', validateJoiSignup, createUser);
routes.post('/signin', validateJoiSignin, login);

routes.use(auth);
routes.use('/users', userRouter);
routes.use('/movies', moviesRouter);

routes.all('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = { routes };
