const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { asyncHandler } = require('../middlewares');
const { User, UserDetails, UserType } = require('../models');

// eslint-disable-next-line no-unused-vars
const signup = asyncHandler(async (req, res, next) => {
  const { info, details, role } = req.body;

  const user = await User.create(info);
  const userDetails = await UserDetails.create({ id_user: user.idUser, lastName: details.lastName });
  const userType = await UserType.create({ id_user: user.idUser, roleName: role });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  await userDetails.save();
  await userType.save();

  const payload = {
    user: {
      id: user.idUser,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.status(201).json({
    status: 'ok',
    data: token,
  });
});

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next({
      message: 'El usuario no existe',
      statusCode: 400,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return next({
      message: 'Contraseña incorrecta',
      statusCode: 400,
    });
  }

  const payload = {
    user: {
      id: user.idUser,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.status(200).json({
    status: 'ok',
    data: token,
  });
};

module.exports = { signup, login };
