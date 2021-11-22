const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    minlength: 2,
    maxlength: 10,
    required: true,
  },
  year: {
    type: String,
    minlength: 4,
    maxlength: 5,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Введён некорректный URL',
    },
    required: true,
  },
  trailer: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Введён некорректный URL',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Введён некорректный URL',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    minlength: 1,
  },
  nameRU: {
    type: String,
    minlength: 2,
    maxlength: 40,
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 2,
    maxlength: 40,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
