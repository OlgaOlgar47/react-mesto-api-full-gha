const express = require('express');
const { celebrate, Joi } = require('celebrate');

const {
  getUserMe,
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users/me', getUserMe);
userRouter.get('/users', getUsers);
userRouter.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    }),
  }),
  getUser
);
userRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser
);
userRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?#?$/),
    }),
  }),
  updateAvatar
);

module.exports = userRouter;
