// eslint-disable-next-line consistent-return
const redirectUnauthorizedToSignin = (req, res, next) => {
  const token = req.cookies.jwt;

  // Проверяем, есть ли токен авторизации
  if (!token) {
    // Если токен отсутствует, выполняем перенаправление на /signin
    return res.redirect('/signin');
  }

  next();
};

module.exports = redirectUnauthorizedToSignin;
