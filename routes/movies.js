const router = require('express').Router();

const {
  validateJoiCreateMovie,
  validateJoiMovieId,
} = require('../middlewares/joi-movies-validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateJoiCreateMovie, createMovie);
router.delete('/:movieId', validateJoiMovieId, deleteMovie);

module.exports = router;
