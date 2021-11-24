const errorMessages = require('../utils/errorMessages');

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const { message } = err;
  res.status(status).json( message  || errorMessages.ServerError);
  return next();
};

module.exports = errorHandler;
