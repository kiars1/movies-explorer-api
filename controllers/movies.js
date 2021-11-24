const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const errorMessages = require('../utils/errorMessages');

module.exports.getMovies = (req, res) => {
  Movie.find({})
    .then((movie) => res.send({ movie }))
    .catch(() => new BadRequestError(errorMessages.MoviesError));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
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
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .catch(() => {
      throw new BadRequestError(errorMessages.MoviesCreateError);
    })
    .then((movie) => res.status(201).send({ movie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .catch(() => {
      throw new NotFoundError(errorMessages.MoviesIdError);
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return movie.remove()
          .then(res.send({ message: movie }));
      }
      throw new ForbiddenError(errorMessages.RightsError);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(errorMessages.MoviesIdError));
      } else {
        next(err);
      }
    });
};
