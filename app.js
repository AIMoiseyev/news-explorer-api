require('dotenv')
  .config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const articlesRouter = require('./routes/articles');
const usersRouter = require('./routes/users');
const NotFoundError = require('./errors/not-found-err');
const errorMessages = require('./errors/err-messages/err-messages');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());

mongoose.connect('mongodb://localhost:27017/news-explorer-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/', articlesRouter);
app.use('/', usersRouter);

app.use(errorLogger);
app.use((req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundPage));
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorMessages.internalServerError
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


