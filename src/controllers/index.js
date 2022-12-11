const authController = require('./auth.controller');
const userController = require('./user.controller');
const CourseController = require('./course.controller');
const StudentsCoursesController = require('./studentsCourses.controller');
const ItemCartController = require('./itemCart.controller');
const CartController = require('./cart.controller');

module.exports = {
  authController,
  userController,
  CourseController,
  StudentsCoursesController,
  ItemCartController,
  CartController,
};
