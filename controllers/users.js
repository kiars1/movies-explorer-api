const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const errorMessages = require('../utils/errorMessages');

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

module.exports.patchUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ user }))
    .catch(() => new BadRequestError(errorMessages.UserUpdateError));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.send({
        name,
        email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(errorMessages.UserCreateError));
      } else if (err.name === 'MongoServerError') {
        next(new ConflictError(errorMessages.EmailError));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};
