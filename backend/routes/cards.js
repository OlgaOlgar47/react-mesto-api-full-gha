const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardRouter = express.Router();

cardRouter.get('/cards', getCards);
cardRouter.post(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?#?$/),
    }),
  }),
  createCard
);
cardRouter.delete(
  '/cards/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    }),
  }),
  deleteCard
);
cardRouter.put(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    }),
  }),
  likeCard
);
cardRouter.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    }),
  }),
  dislikeCard
);

module.exports = cardRouter;
