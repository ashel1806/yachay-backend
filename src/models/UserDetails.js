const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../configs/database.config');

class UserDetails extends Model {}
UserDetails.init(
  {
    idUserDetails: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailRecovery: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    school: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'detalles_usuario',
    timestamps: false,
    modelName: 'UserDetails',
    underscored: true,
  }
);

module.exports = UserDetails;
