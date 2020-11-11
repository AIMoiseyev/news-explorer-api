const Article = require('../models/article');
const errorMessages = require('../errors/err-messages/err-messages');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({owner: req.user._id})
    .then((articles) => res.status(200)
      .send({data: articles}))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(200).send({data: []});
      }
      next(err)
    });
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, image, link } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    image,
    link,
    owner: req.user._id,
  })
    .then((article) => res.status(200)
      .send({
        data: {
          keyword,
          title,
          text,
          date,
          source,
          image,
          link,
          id: article._id,
        },
      } ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessages.fieldValidation));
      }
      return next(err);
    });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(errorMessages.articleId);
      }
      if (req.user._id.toString() !== article.owner.toString()) {
        throw new ForbiddenError(errorMessages.notEnoughRights);
      }
      return Article.findByIdAndRemove(req.params.articleId)
        .then((match) => res.send({ data: match }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(errorMessages.articleId));
      }
      return next(err);
    });
};
