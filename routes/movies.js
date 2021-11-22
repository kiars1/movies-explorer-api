const router = require('express').Router();
const { validateMovie } = require('../middlewares/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validateMovie, createMovie);

router.delete('/:movieId', deleteMovie);

module.exports = router;
