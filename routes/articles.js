const articlesRouter = require('express')
  .Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  createArticle,
  getArticles,
  deleteArticle,
} = require('../controllers/articles');
const auth = require('../middlewares/auth');

const method = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

articlesRouter.get('/articles', auth, getArticles);

articlesRouter.post('/articles', auth, celebrate({
  body: Joi.object()
    .keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string()
        .required()
        .custom(method, 'custom validation'),
      image: Joi.string()
        .required()
        .custom(method, 'custom validation'),
    }),
}), createArticle);

articlesRouter.delete('/articles/:articleId', auth, celebrate({
  params: Joi.object()
    .keys({
      articleId: Joi.string()
        .required()
        .hex()
        .length(24),
    }),
}), deleteArticle);

module.exports = articlesRouter;
