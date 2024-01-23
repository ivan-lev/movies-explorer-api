const router = require('express').Router();

const {
  getMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateJoiCreateMovie,
  validateJoiMovieId,
} = require('../middlewares/joi-movies-validation');

router.get('/', getMovies);
router.post('/', validateJoiCreateMovie, saveMovie);
router.delete('/:movieId', validateJoiMovieId, deleteMovie);

module.exports = router;
