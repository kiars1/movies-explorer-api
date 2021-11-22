const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const errorMessages = require('../utils/errorMessages');

router.use('*', (req, res, next) => next(new NotFoundError(errorMessages.NotFoundPage)));

module.exports = router;
