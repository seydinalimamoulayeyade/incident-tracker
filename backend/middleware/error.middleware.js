const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Mongoose: ID invalide
  if (err.name === 'CastError') {
    error = new ApiError(400, 'Resource not found');
  }

  // Mongoose: champ unique dupliqué
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(400, `Duplicate value for field: ${field}`);
  }

  // Mongoose: validation échouée
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, messages.join('. '));
  }

  const statusCode = error.statusCode || 500;
  const message = error.isOperational ? error.message : 'Internal Server Error';

  if (process.env.NODE_ENV === 'development') {
    console.error(`[${statusCode}] ${message}`, err.stack);
  }

  res.status(statusCode).json({
    status: error.status || 'error',
    message,
  });
};

module.exports = errorHandler;