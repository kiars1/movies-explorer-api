const router = require('express').Router();
const { validateMovie, validateMovieDel } = require('../middlewares/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validateMovie, createMovie);

router.delete('/:movieId', validateMovieDel, deleteMovie);

module.exports = router;
