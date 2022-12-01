const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/database.config');

class CourseDetails extends Model {}
CourseDetails.init(
  {
    idCourseDetails: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    idCourse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    benefits: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetPublic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'detalles_curso',
    timestamps: false,
    modelName: 'CourseDetails',
    underscored: true,
  }
);

module.exports = CourseDetails;
