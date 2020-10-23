const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errorMessages = require('../errors/err-messages/err-messages');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById({_id: req.user._id})
    .then((user) => {
        return res.status(200)
          .send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(200)
      .send({
        data: {
          _id: user._id,
          name,
          email,
        },
      }))
    .catch((err) => {
      if (err.name === 'Error') {
        return next(new BadRequestError(errorMessages.requiredFields));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError(errorMessages.sameEmail));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessages.fieldValidation));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'news-secret-key',
        { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      })
        .end();
    })
    .catch(next);
};
