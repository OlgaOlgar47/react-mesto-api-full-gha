const jwt = require('jsonwebtoken');

// eslint-disable-next-line operator-linebreak
const YOUR_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY2ODUxZWI4YjIwZWVlZjliYTM1MmEiLCJpYXQiOjE2ODQ0NDQxNzYsImV4cCI6MTY4NTA0ODk3Nn0.fNZZ6zYh85pCYZ79MmcVfAq3ZpD2lygmNXGDV41inGE'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = '0b1dfd83f14ba1abdbd6fb38fdb53bf5'; // вставьте сюда секретный ключ для разработки из кода
try {
  // eslint-disable-next-line no-unused-vars
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log(
    '\x1b[31m%s\x1b[0m',
    `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`
  );
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются'
    );
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Что-то не так', err);
  }
}
