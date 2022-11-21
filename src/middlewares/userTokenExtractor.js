const jwt = require('jsonwebtoken');
const { User } = require('../models');

// eslint-disable-next-line consistent-return
const userTokenExtractor = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next({
      message: 'Necesitas estar logueado para acceder a este recurso',
      statusCode: 401,
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  console.log('token: ', token);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decodeToken', decodedToken);

    const user = await User.findByPk(decodedToken.user.id);

    if (!user) {
      return next({
        message: 'El usuario no existe',
        statusCode: 400,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return next({
      message: 'Token inválido',
      statusCode: 401,
    });
  }
};

module.exports = userTokenExtractor;
