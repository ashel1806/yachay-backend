const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/database.config');
const User = require('./User');
const Course = require('./Course');

class StudentsCourses extends Model {}
StudentsCourses.init(
  {
    idStudentCourse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idStudent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id_user',
      },
    },
    idCourse: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Course,
        key: 'id_course',
      },
    },
  },
  {
    sequelize,
    tableName: 'estudiantes_cursos',
    timestamps: false,
    modelName: 'StudentsCourses',
    underscored: true,
  }
);

module.exports = StudentsCourses;
