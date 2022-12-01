const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/database.config');

class Course extends Model {}
Course.init(
  {
    idCourse: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idTeacher: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'curso',
    timestamps: false,
    modelName: 'Course',
    underscored: true,
  }
);

module.exports = Course;
