const { User, UserDetails, UserType } = require('../models');
const { asyncHandler } = require('../middlewares');

const getUserDetails = async (req, res) => {
  const userDetails = await UserDetails.findAll();

  return res.status(200).json({
    status: 'ok',
    data: userDetails,
  });
};

const getUserRoles = async (req, res) => {
  const userRoles = await UserType.findAll();

  return res.status(200).json({
    status: 'ok',
    data: userRoles,
  });
};

const postUserDetails = asyncHandler(async (req, res, next) => {
  const idUser = req.params.idUser;
  const data = req.body;

  await UserDetails.update(data, {
    where: {
      id_user: idUser,
    },
  });

  return res.status(200).json({
    status: 'ok',
    data: 'Usuario actualizado correctamente',
  });
});

const me = async (req, res) => {
  const user = await User.findByPk(req.user.idUser, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: UserDetails,
        as: 'details',
        attributes: { exclude: ['id', 'id_user'] },
      },
      {
        model: UserType,
        as: 'role',
        attributes: { exclude: ['id_user', 'idUserType'] },
      },
    ],
  });

  return res.status(200).json({
    status: 'ok',
    data: user,
  });
};

module.exports = {
  getUserDetails,
  getUserRoles,
  postUserDetails,
  me,
};
