const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const errorMessages = require('../errors/err-messages/err-messages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(errorMessages.authorizationRequired));
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'news-secret-key');
  } catch (err) {
    return next(new UnauthorizedError(errorMessages.authorizationRequired));
  }

  req.user = payload;

  return next();
};
