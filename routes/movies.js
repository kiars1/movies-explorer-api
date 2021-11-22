const router = require('express').Router();
const { validateMovie } = require('../middlewares/validation');

const {
    getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('api/', getMovies);

router.post('api/', validateMovie, createMovie);

  router.delete('api/:movieId', deleteMovie);

  module.exports = router;