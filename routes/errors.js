const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый Ресурс не найден.')));

module.exports = router;