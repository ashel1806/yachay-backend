const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/database.config');

class User extends Model {}
User.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    modelName: 'User',
    underscored: true,
  }
);

module.exports = User;
