const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const token = req.cookies.jwt; // Получаем токен из куки

  // Проверяем, является ли текущий маршрут `/signin` или `/signup`
  if (req.path === '/signin' || req.path === '/signup') {
    // Если текущий маршрут `/signin` или `/signup`, пропускаем
    // middleware и переходим к следующему middleware
    return next();
  }

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};

module.exports = auth;
