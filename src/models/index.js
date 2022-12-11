const { sequelize } = require('../configs/database.config');

const User = require('./User');
const UserDetails = require('./UserDetails');
const UserType = require('./UserType');
const Course = require('./Course');
const CourseDetails = require('./CourseDetails');
const StudentsCourses = require('./StudentsCourses');
const Cart = require('./Cart');
const ItemCart = require('./ItemCart');

// Define the dropAllTables function
sequelize.sync({ force: true }).then(() => {
  console.log('Databases dropped & tables created!');
});

// Define the relationships between the models
User.hasOne(UserDetails, { foreignKey: 'id_user', as: 'details' });
User.hasOne(UserType, { foreignKey: 'id_user', as: 'role' });
UserDetails.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
UserType.belongsTo(User, { foreignKey: 'id_user', as: 'user' });
Course.hasOne(CourseDetails, { foreignKey: 'id_course', as: 'details' });
CourseDetails.belongsTo(Course, { foreignKey: 'id_course', as: 'course' });

// Define the one-to-many relationship between the User and Cart models
User.hasMany(Cart, { foreignKey: 'id_user', as: 'carts' });
Cart.belongsTo(User, { foreignKey: 'id_user', as: 'user' });

// Define the one-to-many relationship between the Cart and ItemCart models
Cart.hasMany(ItemCart, { foreignKey: 'id_cart', as: 'items' });
ItemCart.belongsTo(Cart, { foreignKey: 'id_cart', as: 'cart' });

// Define the many-to-many relationship between the User and Course models
User.belongsToMany(Course, {
  through: StudentsCourses,
  foreignKey: 'id_user',
  otherKey: 'id_course',
  as: 'courses',
});

Course.belongsToMany(User, {
  through: StudentsCourses,
  foreignKey: 'id_course',
  otherKey: 'id_user',
  as: 'students',
});

module.exports = {
  User,
  UserDetails,
  UserType,
  Course,
  CourseDetails,
  StudentsCourses,
  Cart,
  ItemCart,
};
