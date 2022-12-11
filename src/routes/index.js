const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const courseRoute = require('./course.route');
const enrollRoute = require('./studentsCourses.route');
const cartRoute = require('./cart.route');
const itemCartRoute = require('./itemCart.route');

module.exports = {
  authRoute,
  userRoute,
  courseRoute,
  enrollRoute,
  cartRoute,
  itemCartRoute,
};
