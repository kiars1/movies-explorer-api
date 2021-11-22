const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const errorMessages = require('../utils/errorMessages');

module.exports.getMovies = (req, res) => {
    Movie.find({})
        .then((movie) => res.send({ movie }))
        .catch((err) => BadRequestError(errorMessages.MoviesError));
};

module.exports.createMovie = (req, res, next) => {
    const { country, director, duration, year, description, image, trailer, thumbnail, movieId, nameRU,
        nameEN } = req.body;
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
        owner: req.user._id
    })
        .catch((err) => {
            throw new BadRequestError(errorMessages.MoviesCreateError);
        })
        .then((movie) => res.status(201).send({ movie }))
        .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
    console.log(req.params);
    Movie.findById(req.params.movieId)
        .orFail()
        .catch(() => {
            throw new NotFoundError(errorMessages.MoviesIdError);
        })
        .then((movie) => {
            if (movie.owner.toString() !== req.user._id) {
                throw new ForbiddenError(errorMessages.RightsError);
            }
            Movie.findByIdAndDelete(req.params.movieId)
                .then((movieData) => {
                    res.send({ movieData });
                })
                .catch(next);
        })
        .catch(next);
};
