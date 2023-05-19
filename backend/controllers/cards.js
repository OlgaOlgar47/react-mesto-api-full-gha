/* eslint-disable consistent-return */
const Card = require('../models/cards');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({}, { __v: 0 })
    .then((cards) => {
      res.json(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).json(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Cannot delete card of other user');
      }
      return Card.findByIdAndRemove(cardId);
    })
    .then((card) => {
      res.json(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('Card not found');
    })
    .then((card) => {
      res.json(card);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('Card not found');
    })
    .then((card) => {
      res.json(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
