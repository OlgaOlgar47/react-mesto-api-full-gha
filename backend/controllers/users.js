/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const bcrypt = require('bcryptjs');
// const MongoServerError = require('mongoose').Error;
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;
const BadRequestError = require('../utils/errors/BadRequestError');
// const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        }
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: true,
      }); // httpOnly кука с токеном
      res.status(200).json({ token });
    })
    .catch(next);
};

const getUserMe = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).json(user);
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        // Если произошла ошибка приведения типов, выбрасываем BadRequestError
        next(new BadRequestError(err.message));
      } else {
        // В противном случае передаем ошибку дальше
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { email, password, name, about, avatar } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
    )
    .then((user) => {
      res.status(201).json({ user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequestError(e.message));
      } else if (e.code === 11000) {
        return next(new ConflictError('Такой email уже зарегистрирован'));
      } else {
        return next(e);
      }
    });
};

const updateUser = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      throw new NotFoundError('User not found');
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequestError(e.message));
      }
      next(e);
    });
};

const updateAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      throw new NotFoundError('User not found');
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequestError(e.message));
      }
      next(e);
    });
};

module.exports = {
  login,
  getUser,
  getUsers,
  getUserMe,
  createUser,
  updateUser,
  updateAvatar,
};
