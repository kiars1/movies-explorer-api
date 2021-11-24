const { celebrate, Joi, CelebrateError } = require("celebrate");
const isURL = require("validator/lib/isURL");
const errorMessages = require("../utils/errorMessages");

const urlValidator = (value) => {
  const result = isURL(value);
  if (result) {
    return value;
  }
  throw new CelebrateError(errorMessages.NotFoundPage);
};

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30),
    director: Joi.string().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().min(4).max(5),
    description: Joi.string().min(2).max(200),
    image: Joi.string().required().custom(urlValidator),
    trailer: Joi.string().required().custom(urlValidator),
    nameRU: Joi.string().min(2).max(40),
    nameEN: Joi.string().min(2).max(40),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.number().required(),
  }),
});

module.exports.validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

module.exports.validateMovieDel = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});
