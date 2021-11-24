const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const errorMessages = require('../utils/errorMessages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: errorMessages.UserEmailError,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Александр',
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(errorMessages.LoginError));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(errorMessages.LoginError));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
