const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const errorMesage = require('../utils/errorMesage');

router.use('*', (req, res, next) => next(new NotFoundError(errorMesage.NotFoundPage)));

module.exports = router;